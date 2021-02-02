const chartOptionDark = {
  xAxes: [
    {
      gridLines: {
        color: 'rgba(27, 197, 189, 0.3)',
      },
      ticks: {
        autoskip: true,
        autoSkipPadding: 30,
        beginAtZero: true,
        fontColor: '#7E8299',
      },
    },
  ],
  yAxes: [
    {
      ticks: {
        fontColor: '#7E8299',
        beginAtZero: true,
      },
      gridLines: {
        color: 'rgba(27, 197, 189, 0.2)',
      },
    },
  ],
};
const chartOptionLite = {
  xAxes: [
    {
      gridLines: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        autoskip: true,
        autoSkipPadding: 0,
        beginAtZero: true,
        fontColor: '#666',
      },
    },
  ],
  yAxes: [
    {
      gridLines: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        beginAtZero: true,
        fontColor: '#666',
      },
    },
  ],
};
const options: any = {
  legend: { display: false },
  maintainAspectRatio: false,
  responsive: true,

  scales: null,
};

const cardCase = [' карточку', ' карточки', ' карточек'];
const dateToday = new Date().getDay();
export {
  chartOptionDark, chartOptionLite, options, cardCase, dateToday,
};
