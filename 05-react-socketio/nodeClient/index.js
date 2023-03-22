// The node program that captures local performance data
// and sends it up to the socket.io server
// Req:
// - farmhash
// - socket.io-client

const os = require('os');

const pData = getMachineData()

console.log(pData)

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
