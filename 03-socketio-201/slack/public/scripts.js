const socket = io('http://localhost:8000'); //the / namespace/endpoint

socket.on('nsList', (nsData) => {

    const namespacesDiv = $('.namespaces');
    namespacesDiv.innerHTML = '';
    nsData.forEach(ns => namespacesDiv.append(`
        <div className="namespace" ns="${ns.endpoint}">
            <img src="${ns.img}">
        </div>`
    ));

});

socket.on('joined', (msg) => {
    console.log(msg);
});

$('#message-form').on('submit', (event) => {
    event.preventDefault();
    const newMessage = $('#user-message').val();
    // console.log(newMessage)
    socket.emit('messageToServer', {text: newMessage});
})
