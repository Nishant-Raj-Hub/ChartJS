import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://blackcoffer-chartjs-backend.onrender.com/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const prepareDataForLineChart = () => {
    const sectors = [...new Set(data.map(item => item.sector))];
    const insightsBySector = {};

    sectors.forEach(sector => {
      const sectorItems = data.filter(item => item.sector === sector);
      insightsBySector[sector] = sectorItems.length;
    });

    return {
      labels: Object.keys(insightsBySector),
      datasets: [{
        label: 'Insights by Sector',
        data: Object.values(insightsBySector),
        fill: false,
        borderColor: '#4BC0C0',
        tension: 0.1
      }]
    };
  };

  return (
    <div>
      <h2>Line Chart - Insights by Sector</h2>
      <Line data={prepareDataForLineChart()} />
    </div>
  );
};

export default LineChart;
