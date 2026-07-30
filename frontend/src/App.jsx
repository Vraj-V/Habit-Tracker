import React,{useEffect, useState} from 'react'
import Sidebar from './Component/common/Sidebar'
import './index.css'
import KpiCard from './Component/common/KpiCard'
import HeatMap from './Component/common/HeatMap'
import RecordTable from './Component/common/RecordTable'
import Exercise from './Component/Habit/Exercise'
import Water from './Component/Habit/Water'
import Reading from './Component/Habit/Reading'
const App = () => {

    const [activeHabit, setActiveHabit] = useState(()=>{
      return localStorage.getItem('activeHabit') || '1'
    });

    useEffect(()=>{
      localStorage.setItem("activeHabit",activeHabit);
    },[activeHabit]);

  return (
    <div className='main-container'>
      
    <div className="left-sidebar">
      <Sidebar 
        activeHabit= {activeHabit}
        setActiveHabit = {setActiveHabit}
      />
    </div>
    <div className="right-side">
      {activeHabit === "1" && <Exercise />}
      {activeHabit === "2" && <Water />}
      {activeHabit === "3" && <Reading />}

    </div>
    </div>
  )
}

export default App