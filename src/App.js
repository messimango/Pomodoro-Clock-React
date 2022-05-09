import './App.css';
import Timer from './Timer';
import Title from './Title';
import Footer from './Footer';
import Setting from './Setting';
import {useState} from 'react';
import TimeContext from './TimeSetting';

function App() {

    const [showSetting, setShowSetting] = useState(false);

  return (
    <div>
      <Title />

      <TimeContext.Provider value={{
        totalTimeWorking: 30,
        totalBreakTime: 10,
      }}>

      {showSetting ? <Setting /> : <Timer />}
      
      </TimeContext.Provider>
      <Footer />

    </div>
  );
}

export default App;
