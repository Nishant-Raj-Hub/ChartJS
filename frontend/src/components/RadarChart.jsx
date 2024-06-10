import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  RadialLinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, Tooltip, Legend);

const RadarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://blackcoffer-chartjs-backend.onrender.com/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const prepareDataForRadarChart = () => {
    const regions = [...new Set(data.map(item => item.region))];
    const insightsByRegion = {};

    regions.forEach(region => {
      const regionItems = data.filter(item => item.region === region);
      insightsByRegion[region] = regionItems.length;
    });

    const sectors = [...new Set(data.map(item => item.sector))];
    const insightsBySector = {};

    sectors.forEach(sector => {
      const sectorItems = data.filter(item => item.sector === sector);
      insightsBySector[sector] = sectorItems.length;
    });

    return {
      labels: Object.keys(insightsByRegion),
      datasets: [{
        label: 'Insights by Region',
        data: Object.values(insightsByRegion),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }, {
        label: 'Insights by Sector',
        data: Object.values(insightsBySector),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };
  };

  return (
    <div>
      <h2>Radar Chart - Insights by Region and Sector</h2>
      <Radar data={prepareDataForRadarChart()} />
    </div>
  );
};

export default RadarChart;
