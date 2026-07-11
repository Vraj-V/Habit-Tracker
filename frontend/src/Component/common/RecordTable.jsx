import React from 'react'


const UserRecords = [{
    id: 1,
    habit: "Jogging 10KM",
    progress: 63,
    status :'Pending',
    priority : 'medium',
    category: 'Excersice'

    },
    {
    id: 2,
    habit: "Reading 20 min",
    progress: 100,
    status :'Done',
    priority : 'High',
    category: 'Reading'

    },
    {
    id: 3,
    habit: "Water 4L Drinking",
    progress: 43,
    status :'Pending',
    priority : 'High',
    category: 'Water'
    }

]

const RecordTable = () => {
  return (
    <div className='records-container'>
        <h2>Records Table </h2>

        <div className="records-table">
            <div className="sort-btn">Habit</div>
            <div className="sort-btn">Progress</div>
            <div className="sort-btn">Status</div>
            <div className="sort-btn">Priority</div>
            <div className="sort-btn">Category</div>
        </div>

        {/* Records */}

        {UserRecords.map((user)=>{
            return(
                <div className="table-tr">
                    <h3>{user.habit}</h3>
<progress 
  value={user.progress} 
  max="100" 
  className={`base-progress ${user.progress === 100 ? 'custom-progress-success' : 'custom-progress-pending'}`}
/>                    <p>{user.priority}</p>
                    <p>{user.category}</p>
                </div>
            )
        })}
    </div>
  )
}

export default RecordTable