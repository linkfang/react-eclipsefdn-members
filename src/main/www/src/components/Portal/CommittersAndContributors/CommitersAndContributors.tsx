import { Typography } from '@material-ui/core';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

export default function CommitersAndContributors() {
  const option = {
    color: ['#80FFA5', '#00DDFF', '#FFBF00'],
    title: {
      text: 'Your Committer Activity',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['Line 1', 'Line 2', 'Line 3'],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: 'total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(128, 255, 165)',
            },
            {
              offset: 1,
              color: 'rgba(1, 191, 236)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [140, 532, 101, 464, 90, 340],
      },
      {
        name: 'Line 2',
        type: 'line',
        stack: 'total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0, 221, 255)',
            },
            {
              offset: 1,
              color: 'rgba(77, 119, 255)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [120, 582, 111, 434, 220, 340],
      },
      {
        name: 'Line 3',
        type: 'line',
        stack: 'total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        label: {
          show: true,
          position: 'top',
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 191, 0)',
            },
            {
              offset: 1,
              color: 'rgba(224, 62, 76)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [220, 532, 181, 434, 210, 290],
      },
    ],
  };
  return (
    <div
      style={{
        margin: '40px 0',
      }}
    >
      <Typography variant="h4">Commiters and Contributors</Typography>
      <ReactECharts option={option} style={{ height: 400 }} />;
    </div>
  );
}
