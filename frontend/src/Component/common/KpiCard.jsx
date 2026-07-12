import React from 'react'

const KpiCard = ({title,id,subtitle,main_value,category,icons}) => {


  return (
    <div>

        <div className='kpi-card-section' key={id}>
            <div className='kpi-header'>
                <div className='kpi-category-profile'>{category}</div>
                <h2 className='kpi-title'>{title}</h2>
            </div>

            <div className="kpi-main">
                <h1> <span>{icons} </span> {main_value}</h1>
            </div>

            <div className="kpi-subtitle">
                {subtitle}
            </div>
        </div>

    </div>
  )
}

export default KpiCard