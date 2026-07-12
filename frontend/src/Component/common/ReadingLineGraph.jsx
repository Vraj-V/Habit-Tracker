import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", minutes: 30 },
  { day: "Tue", minutes: 40 },
  { day: "Wed", minutes: 20 },
  { day: "Thu", minutes: 60 },
  { day: "Fri", minutes: 50 },
  { day: "Sat", minutes: 70 },
  { day: "Sun", minutes: 45 },
];

const ReadingLineGraph = () => {
  return (
    <div className="reading-chart">

      <h2>Weekly Reading Time</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="day" />
          <YAxis unit=" min" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="minutes"
            stroke="#8B5CF6"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default ReadingLineGraph;