import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://blackcoffer-chartjs-backend.onrender.com/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const prepareDataForDoughnutChart = () => {
    const topics = [...new Set(data.map(item => item.topic))];
    const topicCount = {};

    topics.forEach(topic => {
      const topicItems = data.filter(item => item.topic === topic);
      topicCount[topic] = topicItems.length;
    });

    return {
      labels: Object.keys(topicCount),
      datasets: [{
        data: Object.values(topicCount),
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
      <h2>Doughnut Chart - Insights by Topic</h2>
      <Doughnut data={prepareDataForDoughnutChart()} />
    </div>
  );
};

export default DoughnutChart;
