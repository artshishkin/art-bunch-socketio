import './App.css';
import {useEffect, useState} from "react";
import socket from "./utilities/socketConnection";
import Widget from "./components/Widget";

function App() {

    const [perfData, setPerfData] = useState({});

    useEffect(() => {
        socket.on('data', (data) => {
            setPerfData(data);
            console.log(data)
        })
    }, []);

    return (
        <div className="App">
            <h1>Sanity check!</h1>
            <Widget data={perfData}/>
        </div>
    );
}

export default App;
