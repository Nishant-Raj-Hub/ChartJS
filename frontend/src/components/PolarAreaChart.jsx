import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PolarArea } from 'react-chartjs-2';

const PolarAreaChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://blackcoffer-chartjs-backend.onrender.com/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const prepareDataForPolarAreaChart = () => {
    const regions = [...new Set(data.map(item => item.region))];
    const insightsByRegion = {};

    regions.forEach(region => {
      const regionItems = data.filter(item => item.region === region);
      insightsByRegion[region] = regionItems.length;
    });

    return {
      labels: Object.keys(insightsByRegion),
      datasets: [{
        label: 'Insights by Region',
        data: Object.values(insightsByRegion),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9966',
          '#66FF66',
          '#FF6666',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9966',
          '#66FF66',
          '#FF6666',
        ],
        hoverOffset: 50,
      }]
    };
  };

  return (
    <div>
      <h2>Polar Area Chart - Insights by Region</h2>
      <PolarArea data={prepareDataForPolarAreaChart()} />
    </div>
  );
};

export default PolarAreaChart;
