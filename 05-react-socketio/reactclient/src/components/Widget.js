import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";
import './widget.css'

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
        <div className="Widget row">
            <Cpu cpuData={
                {cpuLoad}
            }/>
            <Mem memData={mem}/>
            <Info infoData={info}/>
        </div>
    );
}

export default Widget;