import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip"; // 1. Changed to named export
import "react-calendar-heatmap/dist/styles.css";

// Utility to generate random data for the past 12 months
function generateRandomData() {
  const today = new Date();
  const startDate = new Date();
  startDate.setFullYear(today.getFullYear() - 1);
  startDate.setDate(startDate.getDate() + 1);

  const values = [];
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    values.push({
      date: d.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 5), // 0–4 activity levels
    });
  }
  return values;
}

export default function HeatMap() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateRandomData());
  }, []);

  return (
    <div className="heatmap-graph">
      <h2>GitHub-Style 12-Month Heatmap</h2>
      <CalendarHeatmap
        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        endDate={new Date()}
        className ='heatmap'
        values={data}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) return null;
          // 2. Updated attributes for react-tooltip v5+
          return {
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content": `${value.date}: ${value.count} contributions`,
          };
        }}
        showWeekdayLabels
      />
      {/* 3. Render the updated Tooltip component with a matching ID */}
      <Tooltip id="heatmap-tooltip" />
      
      <style>{`
        /* GitHub-like color scale */
        .color-empty { fill: #ebedf0; }
        .color-github-1 { fill: #c6e48b; }
        .color-github-2 { fill: #7bc96f; }
        .color-github-3 { fill: #239a3b; }
        .color-github-4 { fill: #196127; }
      `}</style>
    </div>
  );
}