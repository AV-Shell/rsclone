import React, { useEffect } from 'react';
import './dashboard-page.scss';
import { Line, Bar } from 'react-chartjs-2';
import { IDashboardProps } from '../../constants/interfaces';
import { AVA_URL } from '../../constants/constants';
import { RU, EN } from './langs';
import { getMainGameStatistic } from '../shadow-training-page/utils/statistic-utils';
import {
  chartOptionDark,
  chartOptionLite,
  options,
  cardCase,
  dateToday,
} from './constant';
import {
  checkCase,
  transformDate,
  transformValue,
  transformValueAll,
  CreatePieChart,
  switchUserLvl,
  switchRang,
} from './utils';

const DashboardPage: React.FC<IDashboardProps> = (props: IDashboardProps) => {
  const {
    isDarkTheme, isLanguageRU, settings, statistic,
  } = props;

  const { optional } = statistic;
  const { optional: optionalSet } = settings;

  const { mainGameLong } = optional;
  const stats = getMainGameStatistic(mainGameLong);
  const {
    bestAll,
    rightPerDay,
    totalCards,
    userWordsPerDay,
    totalPoints,
    totalCorrectCards,
  } = stats;
  const { currentRightPerDay } = stats;
  const userNewWords = userWordsPerDay.length > 0 ?
    userWordsPerDay[userWordsPerDay.length - 1].value : 0;
  const {
    cardsPerDay,
    userLanguageLevel,
    createSettingsTimestamp,
  } = optionalSet;
  const dateUser = new Date(createSettingsTimestamp);

  currentRightPerDay.value =
    dateToday === new Date(currentRightPerDay.date).getDay()
      ? currentRightPerDay.value
      : 0;

  const UserLvlLang: string = switchUserLvl(userLanguageLevel);

  const rangImgID: string = switchRang(totalPoints);

  const rangImgUrl: string = `https://raw.githubusercontent.com/av-shell/rslang-ava/master/ranks/Ranks0${rangImgID}.png`;

  let userDay: any = dateUser.getDate();
  if (userDay.toString().length < 2) {
    userDay = `0${userDay}`;
  }
  let userMonth: any = dateUser.getMonth() + 1;
  if (userMonth.toString().length < 2) {
    userMonth = `0${userMonth}`;
  }
  const userYear = dateUser.getFullYear();
  const dateCreateUser = `${userDay}.${userMonth}.${userYear}`;

  const dataAll: any = {
    labels: transformDate(userWordsPerDay),
    datasets: [
      {
        data: transformValueAll(userWordsPerDay),
        fill: true,
        borderColor: '#F3F6F9',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    ],
  };
  const dataCorrect: any = {
    labels: transformDate(rightPerDay),
    datasets: [
      {
        data: transformValue(rightPerDay),
        fill: true,
        borderColor: '#7E8299',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    ],
  };
  if (isDarkTheme) {
    dataCorrect.datasets[0].borderColor = '#7E8299';
    dataCorrect.datasets[0].backgroundColor = 'rgba(54, 162, 235, 0.3)';
    dataAll.datasets[0].borderColor = '#F3F6F9';
    dataAll.datasets[0].backgroundColor = 'rgba(54, 162, 235, 0.3)';
  }

  const optionSwitchTheme = !isDarkTheme ? chartOptionLite : chartOptionDark;

  options.scales = optionSwitchTheme;

  const avatarUrl = `${AVA_URL}ava_${settings.optional.avatarID}.png`;

  const userName =
    localStorage.getItem('userName') !== null
      ? localStorage.getItem('userName')?.slice(1, -1)
      : 'Student';

  const dataPieCart = [totalCards - totalCorrectCards, totalCorrectCards];
  const labelCorrect = Math.floor((totalCorrectCards / totalCards) * 100);
  const labelsPieCart = [`${100 - labelCorrect}%`, `${labelCorrect}%`];
  let currentLang = isLanguageRU ? RU : EN;
  const difCurrentCards = cardsPerDay - currentRightPerDay.value;

  const choseCards = isLanguageRU
    ? cardCase[checkCase(currentRightPerDay.value)]
    : currentLang.cards;
  const choseCards1 = isLanguageRU
    ? cardCase[checkCase(difCurrentCards)]
    : currentLang.cards;

  const dailyGoalDone =
    difCurrentCards > 0 ?
      (
        <p>
          {currentLang.complete}

          {difCurrentCards}
          {choseCards1}
          {currentLang.reach}
        </p>
      ) :
      (
        <p>{currentLang.dailyGoalDone}</p>
      );
  useEffect(() => {
    currentLang = isLanguageRU ? RU : EN;
  }, [isLanguageRU]);

  useEffect(() => {
    const canvas: any = document.getElementById('piechart');
    const ctx: any = canvas.getContext('2d');
    CreatePieChart(ctx, canvas, dataPieCart, labelsPieCart);
  }, []);

  useEffect(() => {
    dataAll.labels = transformDate(userWordsPerDay);
    dataAll.datasets[0].data = transformValueAll(userWordsPerDay);
    dataCorrect.labels = transformDate(rightPerDay);
    dataCorrect.datasets[0].data = transformValue(rightPerDay);
  }, [props]);
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-first_column-user_info">
        <div className="dashboard-page-first_column-user_info-img">
          <img src={avatarUrl} alt="avatar" />
        </div>
        <div className="dashboard-page-first_column-user_info-data">
          <div className="dashboard-page-first_column-user_info-data-rangImg">
            <img src={rangImgUrl} alt="rang" />
          </div>
          <h3>{userName}</h3>
          <p>
            {currentLang.engkishLvl}
            <strong>{UserLvlLang}</strong>
          </p>
          <p>
            {currentLang.learningFrom}
            {dateCreateUser}
          </p>
        </div>
      </div>

      <div className="dashboard-page-second_column-info">
        <div className="dashboard-page-second_column-info-all_words">
          {currentLang.newWords}
          <p className="dashboard-page-second_column-info-card-stat">
            {userNewWords}
          </p>
        </div>
        <div className="dashboard-page-second_column-info-best_series">
          {currentLang.bestStreak}
          <p className="dashboard-page-second_column-info-card-stat">
            {bestAll}
          </p>
        </div>
        <div className="dashboard-page-second_column-info-all_cards">
          {currentLang.totalPassed}
          <p className="dashboard-page-second_column-info-card-stat">
            {totalCards}
          </p>
        </div>
        <div className="dashboard-page-second_column-info-card_point">
          {currentLang.yourPoint}

          <p className="dashboard-page-second_column-info-card-stat">
            {totalPoints}
          </p>
        </div>
      </div>

      <div className="dashboard-page-third_column-daily">
        <span>{currentLang.dailyGoal}</span>
        <p>
          {currentLang.complete}
          {cardsPerDay}
          {currentLang.cards}
.
        </p>
        <p>
          {currentLang.todayCoplited}
          {currentRightPerDay.value}
          {choseCards}
.
        </p>
        {dailyGoalDone}
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
};

export default DashboardPage;
