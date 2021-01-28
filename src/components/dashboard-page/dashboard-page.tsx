import React, { useState, useLayoutEffect, useEffect } from "react";
import Chart from "chart.js";
import "./dashboard-page.scss";
import { dashboardProps } from "../../constants/interfaces";
import { AVA_URL } from "../../constants/constants";
import { Line } from 'react-chartjs-2';
import { RU, EN } from './langs';


function DashboardPage(props: dashboardProps) {
  const {
    isDarkTheme,
    isLanguageRU,
    settings,
  } = props;
  const data:any = {
    labels: [
      '10/04', '10/05', 
      '10/06', '10/07', 
      '10/08', '10/09', 
      '10/10', '10/11', 
      '10/12', '10/13', 
      '10/14', '10/15'
    ],
    datasets: [
      {
        
        data: [22,19,27,23,22,24,17,25,23,24,20,19],
        fill: true,          
        borderColor: '#7E8299'  
      }
    ]
  }
  const options:any = {legend:{  display: false,},
  maintainAspectRatio : false,
  responsive: true, 
  scales: {
    xAxes: [
      {
        ticks: {
          autoskip: true,
          autoSkipPadding: 30
        },
      },
    ],
  },
  
  }

  
  console.log(props);
  const avatarUrl = `${AVA_URL}ava_${settings.optional.avatarID}.png`;
  const userName = localStorage.getItem('userName')?.slice(1,-1);
  const cardsPerDay = props.settings.optional.cardsPerDay;
  const comonProgress = props.settings.optional.commonProgress;
  let currentLang = isLanguageRU ? RU : EN;
  useEffect(() => {
    currentLang = isLanguageRU ? RU : EN;
  }, [ isLanguageRU ]);
  useLayoutEffect(() => {
   CreatePieChart();
  }, []);

  
  function CreatePieChart() {
    const canvas: any = document.getElementById("piechart");
    const ctx: any = canvas.getContext("2d");
    let lastend = 0;
    const data = [60, 210];
    let myTotal = 0;
    const myColor = ["red", "#95b524"];
    const labels = ["35%", "65%"];
    const off = 10;
    const w = (canvas.width - off) / 2;
    const h = (canvas.height - off) / 2;
    for (let i = 0; i < data.length; i++) {
      myTotal += data[i];
    }
    for (let i = 0; i < data.length; i++) {
      ctx.fillStyle = myColor[i];
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w, h);
      const len = (data[i] / myTotal) * 2 * Math.PI;
      const r = h - off / 2;
      ctx.arc(w, h, r, lastend, lastend + len, false);
      ctx.lineTo(w, h);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const mid = lastend + len / 2;
      ctx.fillText(
        labels[i],
        w + Math.cos(mid) * (r / 2),
        h + Math.sin(mid) * (r / 2)
      );
      lastend += Math.PI * 2 * (data[i] / myTotal);
    }
  }
  
  // Component code start
  return (
    <div className='dashboard-page'>
      <div className='dashboard-page-first_column-user_info'>
        <div className='dashboard-page-first_column-user_info-img'>
          <img src={avatarUrl} alt='avatar' />
        </div>
        <div className='dashboard-page-first_column-user_info-data'>
          <h3>{userName}</h3>
          <p>Newbie</p>
          <p>{currentLang.learningFrom} 20.01.2021</p>
        </div>
      </div>

      <div className='dashboard-page-second_column-info'>
        <div className='dashboard-page-second_column-info-all_words'>
        {currentLang.newWords}
          <p className='dashboard-page-second_column-info-card-stat'>3</p>
        </div>
        <div className='dashboard-page-second_column-info-best_series'>
        {currentLang.bestStreak}
          <p className='dashboard-page-second_column-info-card-stat'>3</p>
        </div>
        <div className='dashboard-page-second_column-info-all_cards'>
        {currentLang.totalPassed}
          <p className='dashboard-page-second_column-info-card-stat'>3</p>
        </div>
        <div className='dashboard-page-second_column-info-card_point'>
        {currentLang.yourPoint}

          <p className='dashboard-page-second_column-info-card-stat'>3</p>
        </div>
      </div>

      <div className='dashboard-page-third_column-daily'>
        <span>        {currentLang.dailyGoal}
</span>
        <p>{currentLang.complete} {cardsPerDay} {currentLang.cards} </p>
        <p>
        {currentLang.todayCoplited}{comonProgress} {currentLang.cards} . {currentLang.complete} {cardsPerDay-comonProgress} {currentLang.reach}
        </p>
        <p>{currentLang.bestStreakToday} 0</p>
      </div>

      <div className='dashboard-page-first-chart_progress'>
        <div>{currentLang.chartTitle1}</div>
        <div className='chart-wrapper'> <Line  data={data} options={options} /></div>
       

      </div>
      <div className='dashboard-page-second-chart_diagram'>
        <div>{currentLang.chartTitle2}</div>
        <canvas id='piechart' height='275'></canvas>
        <div className='piechart'>
          <div className='piechart-legend'>
            <div className='piechart-legend-correct'></div>
            <span>- {currentLang.correctAnswer}</span>
          </div>
          <div className='piechart-legend'>
            <div className='piechart-legend-incorrect'> </div>
            <span>- {currentLang.incorrectAnswer}</span>
          </div>
        </div>
      </div>
      <div className='dashboard-page-third-chart_card_progress'>
        <div>{currentLang.chartTitle3}</div>
        <div className='chart-wrapper'> <Line  data={data} options={options}/></div>
      </div>
     
    </div>
  );
}

export default DashboardPage;
