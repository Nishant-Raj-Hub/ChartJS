import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const BarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://blackcoffer-backend-czht.onrender.com/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const prepareIntensityBySectorChartData = () => {
    const sectors = [...new Set(data.map(item => item.sector))];
    const intensityBySector = {};

    sectors.forEach(sector => {
      const sectorItems = data.filter(item => item.sector === sector);
      const avgIntensity = sectorItems.reduce((acc, item) => acc + item.intensity, 0) / sectorItems.length || 0;
      intensityBySector[sector] = avgIntensity;
    });

    return {
      labels: Object.keys(intensityBySector),
      datasets: [
        {
          label: 'Average Intensity by Sector',
          data: Object.values(intensityBySector),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        }
      ],
    };
  };

  return (
    <div>
      <h2>Bar Chart - Intensity by Sector</h2>
      <Bar data={prepareIntensityBySectorChartData()} />
    </div>
  );
};

export default BarChart;
