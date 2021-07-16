import { Typography } from '@material-ui/core';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { Bar } from 'react-chartjs-2';

export default function CommitersAndContributors() {
  const optionForAreaStack = {
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

  const optionForLineBar = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ['Projects', 'Total Views'],
    },
    xAxis: [
      {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'OCt', 'Nov', 'Dec'],
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Projects',
        min: 0,
        max: 250,
        interval: 50,
      },
      {
        type: 'value',
        name: 'Total Views',
        min: 0,
        max: 25,
        interval: 5,
      },
    ],
    series: [
      {
        name: 'Projects',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        color: '#519978',
      },
      {
        name: 'Total Views',
        type: 'line',
        yAxisIndex: 1,
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
        color: '#FE8A88',
      },
    ],
  };

  const rand = () => Math.round(Math.random() * 20);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'OCt', 'Nov', 'Dec'],
    datasets: [
      {
        type: 'line',
        label: 'Dataset 1',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        fill: false,
        data: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      },
      {
        type: 'bar',
        label: 'Dataset 3',
        backgroundColor: 'rgb(75, 192, 192)',
        data: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
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
      <Typography style={{ marginTop: 40 }} variant="h5">
        Echart - Area Stack Chart
      </Typography>
      <ReactECharts option={optionForAreaStack} style={{ height: 400 }} />

      <Typography style={{ marginTop: 40 }} variant="h5">
        Echart - Bar Line Chart
      </Typography>
      <ReactECharts option={optionForLineBar} style={{ height: 400 }} />

      <Typography style={{ marginTop: 40 }} variant="h5">
        Chartjs - Bar Line Chart
      </Typography>
      <Bar data={data} type="bar" />
    </div>
  );
}
