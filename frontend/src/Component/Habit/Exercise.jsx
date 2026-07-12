import React from 'react'
import KpiCard from '../common/KpiCard'
import HeatMap from '../common/HeatMap'
import RecordTable from '../common/RecordTable'

const Exercise = () => {
  return (
    <div>
        <div className='kpi-cards'>
            <KpiCard id='steak-count' title='Total Steak' main_value='3' subtitle='Goal Steak' category='E' icons={"🔥"}/>
            <KpiCard id='Total-count' title='Longest Steak' main_value='31' subtitle='Highest Steak' category='L' icons={"🚩"} />
            <KpiCard id='Total-count' title='Today performace' main_value='62.39%' subtitle='Overall perform' category='L' icons={"🏁"} />
        </div>


        <div className='kpi-heatmap'>
          <div className="heatmap">
                      <HeatMap />
          </div>
          <div className="record-table">
            
          <RecordTable />
          </div>
        </div>
    </div>
  )
}

export default Exercise