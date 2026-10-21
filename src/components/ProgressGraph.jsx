import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function ProgressGraph({ weeklyMinutes = [] }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = days.map((day, index) => ({
    day,
    minutes: weeklyMinutes[index] || 0,
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis
            allowDecimals={false}
            label={{
              value: "Minutes",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip
            formatter={(value) => [`${value} min`, "Workout"]}
          />

          <Bar
            dataKey="minutes"
            fill="#2563eb"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProgressGraph;