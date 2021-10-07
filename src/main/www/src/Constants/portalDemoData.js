import { brightOrange, darkGray, darkOrange } from './Constants';

export const dataForAreaStack = {
  labels: ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F'],
  datasets: [
    {
      label: 'First dataset',
      data: [140, 532, 101, 464, 90, 340],
      borderColor: brightOrange,
      backgroundColor: brightOrange,
      fill: true,
    },
    {
      label: 'Second dataset',
      data: [120, 582, 111, 434, 220, 340],
      borderColor: darkGray,
      backgroundColor: darkGray,
      fill: true,
    },
    {
      label: 'Third dataset',
      data: [220, 532, 181, 434, 210, 290],
      borderColor: '#D7D7D7',
      backgroundColor: '#D7D7D7',
      fill: true,
    },
  ],
};

export const configForAreaStack = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Your Committer Activity',
    },
    tooltip: {
      mode: 'index',
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Month',
      },
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: 'Value',
      },
    },
  },
};

const rand = () => Math.round(Math.random() * 20);

export const dataForBarLineChart = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'OCt', 'Nov', 'Dec'],
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: darkOrange,
      borderWidth: 2,
      fill: false,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: '#F0F2F8',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
  ],
};

export const configForBar = {
  responsive: true,
  aspectRatio: 3,
};