const mongoose = require('mongoose');
const Machine = require('./models/Machine');

const mongoUsername = 'perfUser'
const mongoPassword = 'perfPassword'

mongoose
    .connect(`mongodb://${mongoUsername}:${mongoPassword}@127.0.0.1:27017/perfMon`, {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

function socketMain(io, socket) {

    let macA;

    console.log(`Socket connected ${socket.id}`)
    // console.log("Someone called me! I'm socketMain")

    socket.on('clientAuth', (key) => {
        if (key === 'jdkf8j8n3kme9sdk_nodeClientApiKey') {
            //valid Node Client
            socket.join('clients');
        } else if (key === 'nke8kwje3230mkmsk_uiClientApiKey') {
            //valid UI client
            socket.join('ui');
            console.log('A React client has joined')
        } else {
            //an invalid client has joined. Goodbye
            console.log('an invalid client has joined. Goodbye');
            socket.disconnect(true);
        }
    })

    //a machine has connected. check to see if it's new.
    //if it is, add it!
    socket.on('initPerfData', async (data) => {
        // console.log(data);
        macA = data.macA;
        const mongooseResponse = await checkAndAdd(data);
        console.log(mongooseResponse);
    })

    socket.on('perfData', (data) => {
        console.log(data);
    })
}

async function checkAndAdd(data) {
    //because we are doing db stuff, js won't wait for the db
    //so we need to make this a promise (or async function as I did)
    const doc = await Machine.findOne({macA: data.macA});

    if (doc === null) {
        //the record is not in the db, so add it
        let newMachine = new Machine(data);
        newMachine.save();
        return 'added';
    } else {
        //it is in the db, just resolve
        return 'found';
    }
}

module.exports = socketMain;