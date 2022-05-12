import TimeContext from "./TimeContext";
import { useContext } from "react";
import ReactSlider from "react-slider";
import "./slider.css";

function Setting() {

    const timeInfo = useContext(TimeContext);

    return (
        <div>
            <h2>Settings</h2>
        
            <div className="setTime">
                <label>Total Time Working : {timeInfo.totalTimeWorking}</label>
                <ReactSlider className="work-slider" thumbClassName="thumb" trackClassName="track" value={timeInfo.totalTimeWorking} onChange={newValue => timeInfo.setTotalTimeWorking(newValue)} min={1} max={120} />
                <br></br>
                <label>Total Break Time : {timeInfo.totalBreakTime}</label>
                <ReactSlider className="break-slider" thumbClassName="thumb" trackClassName="track" value={timeInfo.totalBreakTime} onChange={newValue => timeInfo.setTotalBreakTime(newValue)} min={1} max={120} />
            </div>
        
        </div>
    );
}

export default Setting;