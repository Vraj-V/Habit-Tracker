import React from "react";

const records = [
  {
    time: "7:30 AM",
    amount: "300 ml",
    total: "0.3 L",
  },
  {
    time: "9:10 AM",
    amount: "500 ml",
    total: "0.8 L",
  },
  {
    time: "11:45 AM",
    amount: "400 ml",
    total: "1.2 L",
  },
];

const WaterRecordTable = () => {
  return (
    <div className="records-container">

      <h2>Today's Water Records</h2>

      <div className="water-table">
        <div className="sort-btn-water">

        <div className="">Time</div>
        <div className="">Amount</div>
        <div className="">Total</div>
        </div>

        {records.map((item, index) => (
          <React.Fragment key={index}>
            <div className="table-tr-water">
            <div className="">{item.time}</div>
            <div className="">{item.amount}</div>
            <div className="">{item.total}</div>
            </div>
          </React.Fragment>
        ))}

      </div>

    </div>
  );
};

export default WaterRecordTable;