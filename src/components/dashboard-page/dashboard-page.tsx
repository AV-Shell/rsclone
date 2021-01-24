import React, {
  useRef, useEffect, useState, ReactNode, useLayoutEffect
} from 'react';
import Chart from "chart.js";
import './dashboard-page.scss';
import { dashboardProps } from '../../constants/interfaces';
import userImg from '../header/assets/1.png'
import { AVA_URL } from '../../constants/constants'


function DashboardPage(props: dashboardProps) {
  const {
    isDarkTheme
  } = props;
  const chartoption = {
    legend: {
      display: false,

    },
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 10,
            suggestedMax: 100
          },
        },
      ],
    },
  }
  const [optionMenuItems, setOptionMenuItems] = useState(chartoption);
  console.log(props);
  const avatarUrl = `${AVA_URL}` + 'ava_18.png'

  useLayoutEffect(() => {
    const ctx: any = document.getElementById('myChart');
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["0s", "100s", "30s", "40s", "50s", "60s", "60s", "60s", "60s"],
        datasets: [{
          // label: "words progress",
          data: [0, 5, 15, 20, 32, 40],
        }]
      },
      options: optionMenuItems
    });
    CreateLineChart("CardChart");
    CreatePieChart();
  }, []);

  function CreateLineChart(id: string) {
    const ctx: any = document.getElementById(id);
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["0s", "100s", "30s", "40s", "50s", "60s", "60s", "60s", "60s"],
        datasets: [{
          // label: "words progress",
          data: [0, 5, 15, 20, 32, 40],
        }]
      },
      options: optionMenuItems
    });
  }
  function CreatePieChart() {
    const canvas: any = document.getElementById("piechart");
    const ctx: any = canvas.getContext("2d");
    let lastend = 0;
    const data = [60, 210];
    let myTotal = 0;
    const myColor = ['red', '#95b524'];
    const labels = ['35%', '65%'];

    for (let i = 0; i < data.length; i++) {
      myTotal += data[i];
    }

    // make the chart 10 px smaller to fit on canvas
    const off = 10
    const w = (canvas.width - off) / 2
    const h = (canvas.height - off) / 2
    for (let i = 0; i < data.length; i++) {
      ctx.fillStyle = myColor[i];
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w, h);
      const len = (data[i] / myTotal) * 2 * Math.PI
      const r = h - off / 2
      ctx.arc(w, h, r, lastend, lastend + len, false);
      ctx.lineTo(w, h);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = 'white';
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const mid = lastend + len / 2
      ctx.fillText(labels[i], w + Math.cos(mid) * (r / 2), h + Math.sin(mid) * (r / 2));
      lastend += Math.PI * 2 * (data[i] / myTotal);
    }
  }
  // Component code start
  return (
    <div className="dashboard-page">
      <div className='dashboard-page-first_column'>
        <div className='dashboard-page-first_column-user_info'>
          <div className='dashboard-page-first_column-user_info-img'><img src={avatarUrl} alt="avatar" /></div>
          <div className='dashboard-page-first_column-user_info-data'>
            <h3>John Doe</h3>
            <p>Newbie</p>
            <p>Learning from 20.01.2021</p>
          </div>
        </div>
        <div className='dashboard-page-first_column-chart_progress'>
          <canvas id="myChart" width="560" height="310"></canvas>
          <div>All words progress</div>
        </div>
      </div>
      <div className='dashboard-page-second_column'>
        <div className='dashboard-page-second_column-info'>
          <div className='dashboard-page-second_column-info-all_words'>
            New words:
             <p className='dashboard-page-second_column-info-card-stat'>3</p>
          </div>
          <div className='dashboard-page-second_column-info-best_series'>Best streak:
          <p className='dashboard-page-second_column-info-card-stat'>3</p>
          </div>
          <div className='dashboard-page-second_column-info-all_cards'>
            Total passed cards:
            <p className='dashboard-page-second_column-info-card-stat'>3</p>
          </div>
          <div className='dashboard-page-second_column-info-card_point'> Your point:
          <p className='dashboard-page-second_column-info-card-stat'>3</p>
          </div>

        </div>
        <div className='dashboard-page-second_column-chart_diaram'>
          <div className='piechart'>
            <div className='piechart-legend'>
              <div className='piechart-legend-correct'></div>
              <span>- correct answer</span>
            </div>
            <div className='piechart-legend'>
              <div className='piechart-legend-incorrect'>  </div>
              <span>- incorrect answer</span>
            </div>
          </div>
          <canvas id="piechart" width="500" height="275"></canvas>
          <div>
            Ratio of correct and incorrect answers for all time</div>
        </div>
      </div>
      <div className='dashboard-page-third_column'>
        <div className='dashboard-page-third_column-daily'>
          <span>Daily goal:</span>
          <p>Complete 50 Cards</p>
          <p>
            Today you have completed 0 cards. Complete 50 cards to reach the goal.</p>
          <p>Your best streak  today: 0</p>
        </div>
        <div className='dashboard-page-third_column-chart_card_progress'>
          <canvas id="CardChart" width="460" height="290"></canvas>
          <div>
            Number of cards made by day</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
// return (
//   <div className="dashboard-page">
//     <h2>Dashboard page</h2>
//   </div>
// );
// }