import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import Setting from './Setting';
import Minus from './Minus';
import Plus from './Plus';


function Timer() {
    return (
        <div id='main'>
            <div className='progressBar'>
                <CircularProgressbar value={60} text={`60%`} styles={buildStyles({
                    textColor: 'white',
                    trailColor: 'lightcoral',
                    pathColor: 'green',
                })} />
            </div>
            <div className='buttons' >
                <div className='timerButtons'>
                    <Minus />
                    <PlayButton />
                    <PauseButton />
                    <Plus />
                </div>                
            </div>
            
            <Setting />
        </div>
    );
}

export default Timer;