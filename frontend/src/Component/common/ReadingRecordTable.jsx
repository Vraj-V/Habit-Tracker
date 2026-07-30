import React from "react";

const sessions = [
  {
    book: "Atomic Habits",
    pages: "18",
    duration: "25 min",
  },
  {
    book: "Deep Work",
    pages: "12",
    duration: "15 min",
  },
  {
    book: "Clean Code",
    pages: "8",
    duration: "10 min",
  },
];

const ReadingRecordTable = () => {
  return (
    <div className="records-container">

      <h2>Today's Reading Sessions</h2>

      <div className="">
        <div className="reading-table">
            <div className="table-heading">Book</div>
            <div className="table-heading">Pages</div>
            <div className="table-heading">Duration</div>
        </div>

        {sessions.map((item, index) => (
          <div key={index} className="table-cell">
            <div className="">{item.book}</div>
            <div className="">{item.pages}</div>
            <div className="">{item.duration}</div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default ReadingRecordTable;