function PauseButton(props) {
    return (
        <button className="pause" onClick={props.data}><i className="fa fa-pause" ></i></button>
    );
}

export default PauseButton;