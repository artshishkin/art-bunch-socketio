// The node program that captures local performance data
// and sends it up to the socket.io server
// Req:
// - farmhash
// - socket.io-client

const BASE_URL = 'http://127.0.0.1:8181';

const os = require('os');
const io = require('socket.io-client');
let socket = io(BASE_URL);

socket.on('connect', () => {
    console.log(`I'm connected to the socketio server with id ${socket.id}`)
    const macA = getMacAddress();

    let perfDataInterval = setInterval(async () => {
        const pData = await getAllData();
        socket.emit('perfData',{
            macA,
            pData
        })
    }, 1000)
})

async function getAllData() {
    const machineData = getMachineData()
    const cpuLoad = await calcCpuLoad();
    return {
        ...machineData,
        cpuLoad
    };
}

function getMachineData() {

// - CPU load (current)
// - Memory Usage
//   - free
//   - total
// - Operating System (OS Type)
// - Time Online (uptime)
// - Processor Information (CPU info)
//   - Type
//   - Number of Cores
//   - Clock Speed

    const osType = os.type() === 'Darwin' ? 'Mac' : os.type();

    return {
        osType,
        freeMem: os.freemem(),
        totalMem: os.totalmem(),
        memUsage: Math.floor(100 * (1 - os.freemem() / os.totalmem())) / 100,
        uptime: os.uptime(),
        cpuModel: os.cpus()[0].model,
        cpuSpeed: os.cpus()[0].speed,
        numCores: os.cpus().length
    };
}

// cpu is all cores. we need the average of all the cores which will give us the cpu average
function cpuAverage() {
    // get ms in each mode, BUT this number is since reboot
    // so get it now, and get it in 100ms and compare
    let idleMs = 0;
    let totalMs = 0;
    // loop through all the cores
    os.cpus()
        .forEach((aCore) => {
            for (type in aCore.times) {
                totalMs += aCore.times[type];
            }
            idleMs += aCore.times.idle;
        });
    const cores = os.cpus().length;
    const idleAvgMs = idleMs / cores;
    const totalAvgMs = totalMs / cores;
    return {
        idleMs: idleAvgMs,
        totalMs: totalAvgMs
    };
}

function calcCpuLoad() {
    return new Promise(((resolve, reject) => {
        const start = cpuAverage();
        setTimeout(() => {
            const end = cpuAverage();
            const deltaLoad = {
                idleDelta: end.idleMs - start.idleMs,
                totalDelta: end.totalMs - start.totalMs
            }
            const cpuLoadParam = 100 - Math.floor(100 * deltaLoad.idleDelta / deltaLoad.totalDelta);
            resolve(cpuLoadParam);
        }, 100);
    }));
}

function getMacAddress() {
    const interfaces = os.networkInterfaces();
    for (const interfacesKey in interfaces) {
        if (interfacesKey.toString().includes("WSL")) continue;
        const networks = interfaces[interfacesKey];
        for (const network of networks) {
            if (!network.internal) {
                return network.mac;
            }
        }
    }
}
