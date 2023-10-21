import React, { useEffect, useRef } from 'react';
import {Chart} from 'chart.js';

const OnlineStatusChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const prepareChartData = (data) => {
      return data.map(item => ({
        x: new Date(item.DATE),
        y: item.ONLINE ? 1 : 0
      }));
    };

    const chartData = prepareChartData(data);

    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'מצב אונליין',
          data: chartData,
          borderColor: 'blue',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'hour',
              stepSize: 0.5
            },
            title: {
              display: true,
              text: 'תאריך ושעה'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'מצב אונליין'
            }
          }
        }
      }
    });
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default OnlineStatusChart;
