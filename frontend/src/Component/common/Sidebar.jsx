import React, { useState } from 'react'

const SIDEBAR_LABEL = [
    {  id: '1'  ,label : 'Excersie', color : "orange", days : 30},
    {  id: '2'  ,label : 'Water', color : "gray", days : 30},
    {  id: '3'  ,label : 'Reading', color : "gray", days : 30}
]
const Sidebar = ({activeHabit, setActiveHabit}) => {
    console.log("Label", SIDEBAR_LABEL);


       let handleLabel = SIDEBAR_LABEL.map((title)=>{
            return title.color;
        })

    console.log(" Label extracted: ", handleLabel);


  return (
    <div className='sb-container'>

        <div className='component-title'>
            <h1>Habit <br /> <span className='component-subtitle'>Tracker</span>  </h1>
        </div>
        <div className='sb-parent'>
            {SIDEBAR_LABEL.map((title) =>{
                console.log("rendering Data", title)
                return (
                    <div 
                    className={`sb-menu ${activeHabit === title.id ? 'active-menu' : ''}`} 
                    key={title.id}
                    onClick={()=>setActiveHabit(title.id)}
                    >
                        <div className='sb-menu-dot'></div>
                        <h2 className='sb-menu-title'>{title.label}</h2>
                    </div>
                )
            })}

        <button className='sb-new-habit'> + New Habit</button>  
        </div>
    </div>
  )
}

export default Sidebar