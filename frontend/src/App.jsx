import React from 'react'
import Sidebar from './Component/common/Sidebar'
import './index.css'
import KpiCard from './Component/common/KpiCard'
import HeatMap from './Component/common/HeatMap'
const App = () => {
  return (
    <div className='main-container'>
      
    <div className="left-sidebar">
      <Sidebar />
    </div>
    <div className="right-side">
        <div className='kpi-cards'>
            <KpiCard id='steak-count' title='Total Steak' main_value='3' subtitle='Goal Steak' category='E' />
            <KpiCard id='Total-count' title='Longest Steak' main_value='31' subtitle='Highest Steak' category='L' />
            <KpiCard id='Total-count' title='Today performace' main_value='62.39%' subtitle='Overall perform' category='L' />
        </div>


        <div className='kpi-heatmap'>
          <HeatMap />
        </div>
    </div>
    </div>
  )
}

export default App