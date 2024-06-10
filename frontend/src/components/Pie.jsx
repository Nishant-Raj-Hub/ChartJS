import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://blackcoffer-backend-czht.onrender.com/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const prepareChartData = () => {
    const sectors = [...new Set(data.map(item => item.sector))];
    const sectorData = sectors.map(sector => {
      return {
        sector,
        count: data.filter(item => item.sector === sector).length
      };
    });

    return {
      labels: sectors,
      datasets: [
        {
          label: 'Sector Distribution',
          data: sectorData.map(item => item.count),
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          hoverOffset: 50,
        }
      ]
    };
  };

  return (
    <div>
      <h2>Pie Chart - Sector Distribution</h2>
      <Pie data={prepareChartData()} />
    </div>
  );
};

export default PieChart;
