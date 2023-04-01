function Mem(props) {
    return (
        <div className="Mem">
            <h3>Mem</h3>
            <p>{JSON.stringify(props.memData)}</p>
        </div>
    );
}

export default Mem;