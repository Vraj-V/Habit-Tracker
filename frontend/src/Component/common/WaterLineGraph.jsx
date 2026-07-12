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
  { time: "6 AM", water: 0.3 },
  { time: "8 AM", water: 0.6 },
  { time: "10 AM", water: 1.2 },
  { time: "12 PM", water: 1.8 },
  { time: "2 PM", water: 2.3 },
  { time: "4 PM", water: 2.8 },
  { time: "6 PM", water: 3.2 },
  { time: "8 PM", water: 3.8 },
  { time: "10 PM", water: 4.0 },
];

const WaterLineGraph = () => {
  return (
    <div className="water-chart">

      <h2>Today's Water Intake</h2>

      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="time" />
          <YAxis unit="L"  />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="water"
            stroke="#3B82F6"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default WaterLineGraph;