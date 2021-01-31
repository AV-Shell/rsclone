import React, { useState, useLayoutEffect, useEffect } from 'react';
import Chart from 'chart.js';
import './dashboard-page.scss';
import { Line, Bar } from 'react-chartjs-2';
import { dashboardProps } from '../../constants/interfaces';
import { AVA_URL } from '../../constants/constants';
import { RU, EN } from './langs';
import { getMainGameStatistic } from '../shadow-training-page/utils/statistic-utils';

function DashboardPage(props: dashboardProps) {
  const {
    isDarkTheme,
    isLanguageRU,
    settings,
  } = props;

  const stats = getMainGameStatistic(props.statistic.optional.mainGameLong);
  console.log(stats);
  const {
    bestAll, bestForTraining, rightPerDay, totalCards, userWordsPerDay, totalPoints,
  } = stats;
  console.log(rightPerDay);
  // const a = rightPerDay[0].date;
  const dateUser = new Date(props.settings.optional.createSettingsTimestamp);
  let userDay :any = dateUser.getDate();
  if (userDay.toString().length < 2) {
    userDay = `0${userDay}`;
  }
  let userMonth:any = dateUser.getMonth() + 1;
  if (userMonth.toString().length < 2) {
    userMonth = `0${userMonth}`;
  }
  const userYear = dateUser.getFullYear();
  const dateCreateUser = `${userDay}.${userMonth}.${userYear}`;
  // console.log(new Date(dateUser).toString());

  // console.log(new Date(rightPerDay[0].date).getDate());
  // console.log(Date.prototype.toDateString(a));

  function transformDate(dateArr:any) {
    const arr:any = [];

    if (dateArr[0].date) {
      dateArr.forEach((e:any) => {
        const date = new Date(e.date);
        let day:any = date.getDate();
        if (day.toString().length < 2) {
          day = `0${day}`;
        }
        let month:any = date.getMonth() + 1;
        if (month.toString().length < 2) {
          month = `0${month}`;
        }
        const newDate = `${day}/${month}`;
        arr.push(newDate);
      });
    }

    return arr;
  }
  function transformValue(dateArr:any) {
    const arr:any = [];
    if (dateArr[0].value) {
      dateArr.forEach((e:any) => {
        arr.push(e.value);
      });
    }

    return arr;
  }
  function transformValueAll(dateArr:any) {
    const arr:any = [];
    let startValue:number = 0;
    if (dateArr[0].value) {
      dateArr.forEach((e:any) => {
        const difValue:number = e.value - startValue < 0 ? 0 : e.value - startValue;
        arr.push(difValue);
        startValue = e.value;
      });
    }

    return arr;
  }

  const dataAll:any = {
    labels: transformDate(userWordsPerDay),
    datasets: [
      {

        data: transformValue(userWordsPerDay),
        fill: true,
        borderColor: '#7E8299',
      },
    ],
  };
  const dataCorrect:any = {
    labels: transformDate(rightPerDay),
    datasets: [
      {

        data: transformValue(rightPerDay),
        fill: true,
        borderColor: '#7E8299',
      },
    ],
  };


  useEffect(() => {
    dataAll.labels = transformDate(userWordsPerDay);
    dataAll.datasets[0].data = transformValue(userWordsPerDay);
    dataCorrect.labels = transformDate(rightPerDay);
    dataCorrect.datasets[0].data = transformValue(rightPerDay);
  }, [props]);

  const options:any = {
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            autoskip: true,
            autoSkipPadding: 30,
          },
        },
      ],
    },

  };

  console.log(props);
  const avatarUrl = `${AVA_URL}ava_${settings.optional.avatarID}.png`;
  const userName = localStorage.getItem('userName')?.slice(1, -1);
  const { cardsPerDay } = props.settings.optional;
  const comonProgress = props.settings.optional.commonProgress;
  let currentLang = isLanguageRU ? RU : EN;
  useEffect(() => {
    currentLang = isLanguageRU ? RU : EN;
  }, [isLanguageRU]);
  useLayoutEffect(() => {
    CreatePieChart();
  }, []);

  function CreatePieChart() {
    const canvas: any = document.getElementById('piechart');
    const ctx: any = canvas.getContext('2d');
    let lastend = 0;
    const data = [60, 210];
    let myTotal = 0;
    const myColor = ['red', '#95b524'];
    const labels = ['35%', '65%'];
    const off = 10;
    const w = (canvas.width - off) / 2;
    const h = (canvas.height - off) / 2;
    for (let i = 0; i < data.length; i++) {
      myTotal += data[i];
    }
    for (let i = 0; i < data.length; i++) {
      ctx.fillStyle = myColor[i];
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w, h);
      const len = (data[i] / myTotal) * 2 * Math.PI;
      const r = h - off / 2;
      ctx.arc(w, h, r, lastend, lastend + len, false);
      ctx.lineTo(w, h);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const mid = lastend + len / 2;
      ctx.fillText(
        labels[i],
        w + Math.cos(mid) * (r / 2),
        h + Math.sin(mid) * (r / 2),
      );
      lastend += Math.PI * 2 * (data[i] / myTotal);
    }
  }

  // Component code start
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-first_column-user_info">
        <div className="dashboard-page-first_column-user_info-img">
          <img src={avatarUrl} alt="avatar" />
        </div>
        <div className="dashboard-page-first_column-user_info-data">
          <h3>{userName}</h3>
          <p>Newbie</p>
          <p>
            {currentLang.learningFrom}

            {dateCreateUser}
          </p>
        </div>
      </div>

      <div className="dashboard-page-second_column-info">
        <div className="dashboard-page-second_column-info-all_words">
          {currentLang.newWords}
          <p className="dashboard-page-second_column-info-card-stat">3</p>
        </div>
        <div className="dashboard-page-second_column-info-best_series">
          {currentLang.bestStreak}
          <p className="dashboard-page-second_column-info-card-stat">{bestAll}</p>
        </div>
        <div className="dashboard-page-second_column-info-all_cards">
          {currentLang.totalPassed}
          <p className="dashboard-page-second_column-info-card-stat">{totalCards}</p>
        </div>
        <div className="dashboard-page-second_column-info-card_point">
          {currentLang.yourPoint}

          <p className="dashboard-page-second_column-info-card-stat">{totalPoints}</p>
        </div>
      </div>

      <div className="dashboard-page-third_column-daily">
        <span>

          {currentLang.dailyGoal}
        </span>
        <p>
          {currentLang.complete}

          {cardsPerDay}

          {currentLang.cards}.

        </p>
        <p>
          {currentLang.todayCoplited}

          {comonProgress}

          {currentLang.cards}

          .
          </p>
        <p>
          {currentLang.complete}

          {cardsPerDay - comonProgress}

          {currentLang.reach}
        </p>
        <p>
          {currentLang.bestStreakToday}

          {bestForTraining}
          .
        </p>
      </div>

      <div className="dashboard-page-first-chart_progress">
        <div>{currentLang.chartTitle1}</div>
        <div className="chart-wrapper">

          <Bar data={dataAll} options={options} />
        </div>

      </div>
      <div className="dashboard-page-second-chart_diagram">
        <div>{currentLang.chartTitle2}</div>
        <canvas id="piechart" height="275" />
        <div className="piechart">
          <div className="piechart-legend">
            <div className="piechart-legend-correct" />
            <span>
              -
              {currentLang.correctAnswer}
            </span>
          </div>
          <div className="piechart-legend">
            <div className="piechart-legend-incorrect"> </div>
            <span>
              -
              {currentLang.incorrectAnswer}
            </span>
          </div>
        </div>
      </div>
      <div className="dashboard-page-third-chart_card_progress">
        <div>{currentLang.chartTitle3}</div>
        <div className="chart-wrapper">

          <Line data={dataCorrect} options={options} />
        </div>
      </div>

    </div>
  );
}

export default DashboardPage;
