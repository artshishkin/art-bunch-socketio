import {useRef} from "react";
import drawCircle from "../utilities/canvasLoadAnimation";

function Mem(props) {

    const canvasRef = useRef(null);

    const {freeMem, totalMem, memUsage} = props.memData;
    drawCircle(canvasRef.current, 100 * memUsage);

    const totalMemInGB = Math.floor(100 * totalMem / 1024 / 1024 / 1024) / 100;
    const freeMemInGB = Math.floor(100 * freeMem / 1024 / 1024 / 1024) / 100;

    return (
        <div className="col-sm-3 mem">
            <h3>Memory Usage</h3>
            <div className="canvas-wrapper">
                <canvas ref={canvasRef} width="200" height="200"/>
                <div className="mem-text">{100 * memUsage}%</div>
            </div>
            <div>Total Memory: {totalMemInGB} GB</div>
            <div>Free Memory: {freeMemInGB} GB</div>
        </div>
    );
}

export default Mem;