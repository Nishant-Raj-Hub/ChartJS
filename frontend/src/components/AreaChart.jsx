import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const AreaChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://blackcoffer-backend-czht.onrender.com/api/data")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const prepareChartData = () => {
    const regions = [...new Set(data.map((item) => item.region))];
    const intensityByRegion = {};

    regions.forEach((region) => {
      const regionItems = data.filter((item) => item.region === region);
      const avgIntensity =
        regionItems.reduce((acc, item) => acc + item.intensity, 0) /
          regionItems.length || 0;
      intensityByRegion[region] = avgIntensity;
    });

    return {
      labels: Object.keys(intensityByRegion),
      datasets: [
        {
          label: "Average Intensity by Region",
          data: Object.values(intensityByRegion),
          fill: true,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div>
      <h2>Area Chart - Intensity by Region</h2>
      <Line data={prepareChartData()} />
    </div>
  );
};

export default AreaChart;
