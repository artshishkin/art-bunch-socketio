function Info(props) {
    return (
        <div className="Info">
            <h3>Info</h3>
            <p>{JSON.stringify(props.data)}</p>
        </div>
    );
}

export default Info;