import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";

function Widget(props) {

    //object destructuring
    const {macA, osType, freeMem, totalMem, memUsage, uptime, cpuModel, cpuSpeed, cpuLoad, numCores} = props.data;

    const mem = {
        freeMem,
        totalMem,
        memUsage
    }

    const info = {macA, osType, uptime, cpuModel, cpuSpeed, numCores}

    return (
        <div className="Widget">
            <Cpu cpuData={
                {cpuLoad}
            }/>
            <Mem memData={mem}/>
            <Info infoData={info}/>
        </div>
    );
}

export default Widget;