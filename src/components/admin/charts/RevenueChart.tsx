import React from 'react';
import ReactECharts from 'echarts-for-react';
import { faker } from '@faker-js/faker';

const RevenueChart: React.FC = () => {
  const labels = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(2024, i, 1);
    return d.toLocaleString('fr-FR', { month: 'short' });
  });

  const data = labels.map(() => faker.number.int({ min: 1000, max: 8000 }));

  const options = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} €'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: labels,
      axisLine: {
        lineStyle: {
          color: '#A1A1AA'
        }
      },
      axisLabel: {
        color: '#71717A'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#A1A1AA'
        }
      },
      axisLabel: {
        formatter: '{value} €',
        color: '#71717A'
      },
      splitLine: {
        lineStyle: {
          color: '#E4E4E7'
        }
      }
    },
    series: [
      {
        name: 'Revenu',
        type: 'line',
        smooth: true,
        data: data,
        itemStyle: {
          color: '#3b82f6',
        },
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(59, 130, 246, 0.3)'
            }, {
              offset: 1, color: 'rgba(59, 130, 246, 0)'
            }]
          }
        }
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />;
};

export default RevenueChart;
