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
                console.log('Hello World');
                return
            }

            if (timeRemainingRef.current < 1 ) {
                return changeMode();                
            }

            countdown();
        }, 1000);

        return () => clearInterval(clock);
    }, [timeInfo]);


    const totalTime = mode === 'work' ? timeInfo.totalTimeWorking * 60 : timeInfo.totalBreakTime * 60;
    const percent = Math.round(timeRemaining/totalTime * 100);
    const timeMinutes = Math.floor(timeRemaining / 60);
    let timeSeconds = timeRemaining % 60;
    if(timeSeconds < 10) timeSeconds = '0' + timeSeconds; 


    // button clicks

    function handlePlusClick() {
        if(timeRemainingRef.current < (totalTime - 60) ){
        timeRemainingRef.current = timeRemainingRef.current + 60;
        } 
    }

    const handleMinusClick = () => {
        timeRemainingRef.current = timeRemainingRef.current - 60;
    }

    const handlePauseClick = () => {
        setPause(true);
        pauseRef.current = true;
    }

    const handlePlayClick = () => {
        setPause(false);
        pauseRef.current = false;
    }

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
                    <Minus data={handleMinusClick}/>
                    <div>
                        {pause ? <PlayButton data={handlePlayClick}/> 
                        : <PauseButton data={handlePauseClick} />}
                    </div>
                    <Plus data={handlePlusClick} />
                </div>                
            </div>
            
        </div>
    );
}

export default Timer;