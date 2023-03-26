import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";

function Widget(props) {

    return (
        <div className="Widget">
            <h2>Widget</h2>
            <Cpu data={props.data}/>
            <Mem data={props.data}/>
            <Info data={props.data}/>
        </div>
    );
}

export default Widget;