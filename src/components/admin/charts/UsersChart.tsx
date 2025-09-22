import React from 'react';
import ReactECharts from 'echarts-for-react';
import { faker } from '@faker-js/faker';

const UsersChart: React.FC = () => {
  const labels = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(2024, i, 1);
    return d.toLocaleString('fr-FR', { month: 'short' });
  });

  const data = labels.map(() => faker.number.int({ min: 50, max: 400 }));

  const options = {
    tooltip: {
      trigger: 'axis',
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
        name: 'Nouveaux utilisateurs',
        type: 'bar',
        data: data,
        itemStyle: {
          color: '#8b5cf6',
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />;
};

export default UsersChart;
