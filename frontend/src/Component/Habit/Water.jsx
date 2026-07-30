import React from "react";
import KpiCard from "../common/KpiCard";
import WaterLineGraph from "../common/WaterLineGraph";
import WaterRecordTable from "../common/WaterRecordTable";

const Water = () => {
  return (
    <>
      <div className="kpi-cards">
        <KpiCard
          id="today-water"
          title="Today's Intake"
          main_value="2.8 L"
          subtitle="Goal: 4 L"
          category="W"
          icons="💧"
        />

        <KpiCard
          id="best-day"
          title="Best Day"
          main_value="5.2 L"
          subtitle="Highest Intake"
          category="B"
          icons="🥤"
        />

        <KpiCard
          id="completion"
          title="Goal Completion"
          main_value="70%"
          subtitle="Today's Progress"
          category="G"
          icons="🎯"
        />
      </div>

      <div className="kpi-heatmap">

        <div className="heatmap">
          <WaterLineGraph />
        </div>

        <div className="record-table">
          <WaterRecordTable />
        </div>

      </div>
    </>
  );
};

export default Water;