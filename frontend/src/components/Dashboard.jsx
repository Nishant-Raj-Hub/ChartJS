import React from "react";
import PieChart from "./Pie";
import BubbleChart from "./BubbleChart";
import RadarChart from "./RadarChart";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import LineChart from "./LineChart";
import PolarAreaChart from "./PolarAreaChart";
import ScatterChart from "./ScatterChart";
import AreaChart from "./AreaChart";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <h2 id="dashboardHeading">Data Visualization Dashboard</h2>

      <div className="dashboard-container">
        <div className="chart-section full-width">
          <BubbleChart />
        </div>
        <div className="chart-section">
          <DoughnutChart />
        </div>
        <div className="chart-section">
          <PieChart />
        </div>
        <div className="chart-section">
          <ScatterChart />
        </div>
        <div className="chart-section">
          <LineChart />
        </div>
        <div className="chart-section">
          <RadarChart />
        </div>
        <div className="chart-section">
          <PolarAreaChart />
        </div>
        <div className="chart-section">
          <BarChart />
        </div>
        <div className="chart-section">
          <AreaChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
