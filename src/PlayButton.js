function PlayButton(props) {
    return (
        <button className="play" onClick={props.data} ><i className="fa fa-play" ></i></button>
    );
}

export default PlayButton;