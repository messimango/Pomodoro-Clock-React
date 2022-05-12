import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import Minus from './Minus';
import Plus from './Plus';
import { useState, useRef, useEffect, useContext } from 'react';
import TimeContext from './TimeContext';


function Timer() {
    const timeInfo = useContext(TimeContext)

    const [pause, setPause] = useState(false);
    const [mode, setMode] = useState('work');
    const [timeRemaining, setTimeRemaining] = useState(0);

    // Ref for above const

    const timeRemainingRef = useRef(timeRemaining);
    const pauseRef = useRef(pause);
    const modeRef = useRef(mode);

    function countdown() {
        timeRemainingRef.current--;
        setTimeRemaining(timeRemainingRef.current);
    }

    

    useEffect(() => {
        
        function changeMode() {
            const nextMode = modeRef.current === 'work' ? 'break' : 'work';
            const nextTime = (nextMode === 'work' ? timeInfo.totalTimeWorking : timeInfo.totalBreakTime) * 60;        
            setMode(nextMode);
            modeRef.current = nextMode;
            setTimeRemaining(nextTime);
            timeRemainingRef.current = nextTime;
        }

        timeRemainingRef.current = timeInfo.totalTimeWorking * 60;
        setTimeRemaining(timeRemainingRef.current);
    

        const clock = setInterval(() => {
            if (pauseRef.current) {
                return
            }

            if (timeRemainingRef.current === 0) {
                return changeMode();                
            }

            countdown();
        }, 10);

        return () => clearInterval(clock);
    }, [timeInfo]);


    const totalTime = mode === 'work' ? timeInfo.totalTimeWorking * 60 : timeInfo.totalBreakTime * 60;
    const percent = Math.round(timeRemaining/totalTime * 100);
    const timeMinutes = Math.floor(timeRemaining / 60);
    let timeSeconds = timeRemaining % 60;
    if(timeSeconds < 10) timeSeconds = '0' + timeSeconds; 




    return (
        <div id='main'>
            <div className='progressBar'>
                <CircularProgressbar value={percent} text={timeMinutes + ':' + timeSeconds} styles={buildStyles({
                    textColor: 'white',
                    trailColor: 'lightblue',
                    pathColor: mode === 'work' ? 'red' : 'green',
                })} />
            </div>
            <div className='buttons' >
                <div className='timerButtons'>
                    <Minus />
                    <div>
                        {pause ? <PlayButton onClick={() => { setPause(false); pauseRef.current= false; }} /> 
                        : <PauseButton onClick={() => { setPause(true); pauseRef.current= true; }} />}
                    </div>
                    <Plus />
                </div>                
            </div>
            
        </div>
    );
}

export default Timer;