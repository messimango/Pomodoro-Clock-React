function Plus(props) {
    return (
        <button className="plus" onClick={props.data}>
            <i className="fa fa-plus-circle" >
                <h2>60s</h2>
            </i>        
        </button>
    );
}

export default Plus;