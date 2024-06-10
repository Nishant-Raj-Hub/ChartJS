import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Scatter } from 'react-chartjs-2';

const ScatterChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://blackcoffer-backend-czht.onrender.com/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const prepareDataForScatterChart = () => {
    return {
      datasets: [{
        label: 'Intensity vs. Likelihood',
        data: data.map(item => ({ x: item.intensity, y: item.likelihood })),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };
  };

  return (
    <div>
      <h2>Scatter Chart - Intensity vs. Likelihood</h2>
      <Scatter
        data={prepareDataForScatterChart()}
        options={{
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'Intensity'
              }
            },
            y: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Likelihood'
              }
            }
          }
        }}
      />
    </div>
  );
};

export default ScatterChart;
