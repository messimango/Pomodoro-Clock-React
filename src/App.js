import './App.css';
import Timer from './Timer';
import Title from './Title';
import Footer from './Footer';
import TimeContext from './TimeContext';
import { useState } from 'react';

function App() {

  const [totalTimeWorking, setTotalTimeWorking] = useState(45)
  const [totalBreakTime, setTotalBreakTime] = useState(15)

  return (
    <div>
      <Title />
      <TimeContext.Provider value={{
        totalTimeWorking,
        totalBreakTime,
        setTotalTimeWorking,
        setTotalBreakTime,
      }}>
        <Timer />
      </TimeContext.Provider>
      <Footer />

    </div>
  );
}

export default App;
