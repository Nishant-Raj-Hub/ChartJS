import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const BubbleChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://blackcoffer-chartjs-backend.onrender.com/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const prepareRelevanceByCountryChartData = () => {
    const countries = [...new Set(data.map(item => item.country))];
    const relevanceByCountry = {};

    countries.forEach(country => {
      const countryItems = data.filter(item => item.country === country && item.relevance);
      const avgRelevance = countryItems.reduce((acc, item) => acc + item.relevance, 0) / countryItems.length || 0;
      relevanceByCountry[country] = avgRelevance;
    });

    return {
      labels: Object.keys(relevanceByCountry),
      datasets: [
        {
          label: 'Relevance by Country',
          data: Object.values(relevanceByCountry).map(val => ({ x: Math.random() * 10, y: Math.random() * 10, r: val * 10 })),
          backgroundColor: 'rgb(108, 189, 108, 0.9)',
          borderColor: '#67d567',
        }
      ],
    };
  };

  return (
    <div>
      <h2>Bubble Chart - Relevance by Country</h2>
      <Bubble data={prepareRelevanceByCountryChartData()} />
    </div>
  );
};

export default BubbleChart;
