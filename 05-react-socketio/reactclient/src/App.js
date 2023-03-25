import './App.css';
import {useEffect, useState} from "react";
import socket from "./utilities/socketConnection";

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
            <p>{JSON.stringify(perfData)}</p>
        </div>
    );
}

export default App;
