function Cpu(props) {

    return (
        <div className="Cpu">
            <h3>Cpu</h3>
            <p>{JSON.stringify(props.cpuData)}</p>
        </div>
    );
}

export default Cpu;