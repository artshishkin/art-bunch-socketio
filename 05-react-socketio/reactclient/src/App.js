import './App.css';
import {useEffect, useState} from "react";
import socket from "./utilities/socketConnection";
import Widget from "./components/Widget";

function App() {

    const [perfData, setPerfData] = useState({});

    useEffect(() => {
        socket.on('data', (data) => {
            setPerfData((prevPerfData) => {
                const newPerfData = {...prevPerfData};
                newPerfData[data.macA] = data.pData;
                return newPerfData;
            });
        })
    }, []);

    // let widgets = [];
    // for (const macA in perfData) {
    //     widgets.push(
    //         <Widget data={perfData[macA]} key={macA}/>
    //     );
    // }
    let widgets = Object.entries(perfData)
        .map(([macA, value]) =>
            <Widget data={{...value,macA}} key={macA}/>
        );
    return (
        <div className="App">
            <h1>Working machines</h1>
            {widgets}
        </div>
    );
}

export default App;
