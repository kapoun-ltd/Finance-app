import React from "react";
import "./charts.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", uv: 4000, pv: 2400 },
  { month: "Feb", uv: 3000, pv: 1398 },
  { month: "Mar", uv: 2000, pv: 9800 },
  { month: "Apr", uv: 2780, pv: 3908 },
  { month: "May", uv: 1890, pv: 4800 },
  { month: "Jun", uv: 2390, pv: 3800 },
  { month: "Jul", uv: 3490, pv: 4300 },
  { month: "Aug", uv: 4000, pv: 2400 },
  { month: "Sep", uv: 3000, pv: 1398 },
  { month: "Oct", uv: 2000, pv: 9800 },
  { month: "Nov", uv: 2780, pv: 3908 },
];

function Chart() {
  return (
    <div className="chart-container">
      <h2 className="chart-title">Yearly Performance</h2>

      <div className="chart-wrapper">
         <ResponsiveContainer width="100%" height={140}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip />

            <Bar dataKey="uv" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;
