import {useRef} from "react";
import drawCircle from "../utilities/canvasLoadAnimation";

function Cpu(props) {

    const canvasRef = useRef(null);

    drawCircle(canvasRef.current, props.cpuData.cpuLoad);

    return (
        <div className="col-sm-3 cpu">
            <h3>Cpu Load</h3>
            <div className="canvas-wrapper">
                <canvas ref={canvasRef} width="200" height="200"/>
                <div className="cpu-text">{props.cpuData.cpuLoad}%</div>
            </div>
        </div>
    );
}

export default Cpu;