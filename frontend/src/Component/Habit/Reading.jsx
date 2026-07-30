import React from "react";
import KpiCard from "../common/KpiCard";
import ReadingLineGraph from "../common/ReadingLineGraph";
import ReadingRecordTable from "../common/ReadingRecordTable";

const Reading = () => {
  return (
    <>
      <div className="kpi-cards">

        <KpiCard
          id="reading-time"
          title="Today's Reading"
          main_value="45 min"
          subtitle="Goal: 60 min"
          category="R"
          icons="📚"
        />

        <KpiCard
          id="books"
          title="Books Completed"
          main_value="12"
          subtitle="This Year"
          category="B"
          icons="📖"
        />

        <KpiCard
          id="pages"
          title="Pages Read"
          main_value="38"
          subtitle="Today's Progress"
          category="P"
          icons="📄"
        />

      </div>

      <div className="kpi-heatmap">

        <div className="reading-graph">
          <ReadingLineGraph />
        </div>

        <div className="record-table">
          <ReadingRecordTable />
        </div>

      </div>
    </>
  );
};

export default Reading;