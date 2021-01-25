/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
import React, {
  useRef, useEffect, useState, ReactNode,
} from 'react';
import './app.scss';
import LoginPage from '../login-page';
import CreateSettings from '../create-settings';
import LogoutPage from '../logout-page'
import DailyGoalPage from '../daily-goal-page';
import DashboardPage from '../dashboard-page';
import SettingsPage from '../settings-page';
import TrainingPage from '../training-page';
import ShadowTrainingPage from '../shadow-training-page';
import VocabularyPage from '../vocabulary-page';
import MagicButton from '../magic-button'
import Header from '../header';
import Footer from '../footer';
import Spinner from '../slave-components/spinner';
import ApiService from '../../services/api-service';

import testUser, { testWordsIdArray, TEST_DEFAULT_USER_WORD } from '../../gitignoreConf/.testUserConfig';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import {
  loginResponseData,
  signInRequestBody,
  wordData,
  wordsCount,
  userData,
  userResponce,
  tokenResponce,
  userWordReq,
  userWordRes,
  paginatedWord,
  aggregatedWordsResult,
  userStatistics,
  userSettings,
  trainingProps,
  headerProps,
  currentTraining,
  saveTraining,
  IgetSettingsPageResponce,
} from '../../constants/interfaces';

import {
  DEFAULT_USER_SETTINGS,
  DEFAULT_USER_STATISTIC,
  DEFAULT_USER_WORD,
  DARK_THEME_CLASSNAME,
  USER_HAS_ENTITY,
  USER_NO_ENTITY,
  USER_NOT_LOGGED,
  USER_SERVER_ERROR,
  userWordsFilter,
} from '../../constants/constants';
import {
  loadSettings,
  loadStatistic,
} from '../../helpers/utils';

const currentTrainingDefault: currentTraining = {
  wordsForTraining: [],
  startTrainingTimestamp: 0,
  totalWordsCount: 0,
  trainingCountPerDay: 0,
  trueAnswerCount: 0,
}


type TreadyToJoin = 'READY' | 'NOTLOGGED' | 'NEEDSETTINGS' | 'LOADING';
type ThasUserSettings = 'NO' | 'YES' | 'NOTONSERVER';
const api = new ApiService();


interface IrefContainer {
  api: ApiService,
  isLoading: boolean,
  isAuthorizated: boolean,
  // tokenRefreshInterval: null | ReturnType<typeof setTimeout>,
  // tokenRefreshInterval: ReturnType<typeof setInterval> | undefined,
  tokenRefreshInterval: number | undefined;
}
const shell = (a: IrefContainer) => a;


const App: React.FC = () => {
  console.log('\r\n Render App \r\n');
  const that = useRef(shell({
    api: new ApiService(),
    isLoading: true,
    isAuthorizated: api.checkTokenValidity(),
    tokenRefreshInterval: undefined,
  }));
  const [isMute, setIsMute] = useState<boolean>(false);
  const [isLanguageRU, setIsLanguageRU] = useState<boolean>(true);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [isAuthorizated, setIsAuthorizated] = useState<boolean>(api.checkTokenValidity());
  const [userWordsArray, setUserWordsArray] = useState<Array<paginatedWord> | null>(null);
  const [userSettings, setUserSettings] = useState<userSettings>(DEFAULT_USER_SETTINGS);
  const [userStatistic, setUserStatistic] = useState<userStatistics>(DEFAULT_USER_STATISTIC);
  const [currentTrainingState, setCurrentTrainingState] = useState<currentTraining>(currentTrainingDefault);
  const [readyToJoin, setReadyToJoin] = useState<TreadyToJoin>('LOADING');
  const [hasUserSettings, setHasUserSettings] = useState<ThasUserSettings>('NO');
  // const [hasUserStatistic, setHasUserStatistic] = useState<ThasUserSettings>('NO');
  const appClassNames: string = `app${isDarkTheme ? ` ${DARK_THEME_CLASSNAME}` : ''}`;

  const logoutUser = () => {
    api.clearUserLog();
    setIsAuthorizated(false);
    setHasUserSettings('NO');
    // setHasUserStatistic('NO');
    setUserSettings(DEFAULT_USER_SETTINGS);
    setUserStatistic(DEFAULT_USER_STATISTIC);
    setUserWordsArray(null);
  }

  const toggleCurrentTheme = () => {
    setIsDarkTheme((value) => !value);
  }


  //TODO: save to LocalStorage isMute  Language // useEffect

  //TODO: save to LocalStorage


  const isLoginCallback = (isLogin: boolean) => {
    console.log('isLoginCallback', isLogin);
    setIsAuthorizated(true);
  }


  const getSettingsCallback = (result: IgetSettingsPageResponce) => {
    console.log('getSettingsCallback', result);
    // setIsAuthorizated(true);
    if (result.isSuccess) {
      setUserSettings(result.userSettings);
      setUserStatistic(result.userStatistics)
      setHasUserSettings('YES');
      // setHasUserStatistic('YES');
    } else {
      logoutUser();
    }
  }


  //check Login and refresh token
  //TODO:
  useEffect(() => {
    const deltaTimeToRefresh = 30 * 60 * 1000;
    const tokenLifeTime = 4 * 60 * 60 * 1000;
    const spareTime2min = 2 * 60 * 1000;
    const timeToRefresh = tokenLifeTime - deltaTimeToRefresh;
    function setRefreshTokenInterval() {
      console.log('setRefreshTokenInterval');
      //TODO:// get from that
      // clearTimeout(this.refreshAuthTimer);
      window.clearInterval(that.current.tokenRefreshInterval);
      // const refreshTime = expTime - new Date().getTime() - timeToRefresh;

      //TODO: add to that
      that.current.tokenRefreshInterval = window.setInterval(() => {

        api.getNewTokens()
          .then(() => {
            console.log('Token Refreshed');
          })
          .catch((err) => {
            console.log(err.message);
            logoutUser();
          })
      }, timeToRefresh - spareTime2min);
      // },  3 * 60 * 1000);
    }
    if (isAuthorizated) {
      console.log('Обновляем токен при заходе юзера, и ставим таймаут.');
      let expTime;
      expTime = api.tokenExpiresIn;
      if (expTime - new Date().getTime() < timeToRefresh) {
        console.log('refresh token');
        api.getNewTokens()
          .then(() => {
            console.log('обновили токен, всё норм');
            setRefreshTokenInterval();
          })
          .catch((err) => {
            console.log('api.getNewTokens() problem, logout user', err.message);
            logoutUser();
          })

      } else {
        setRefreshTokenInterval();
      }

    } else {
      console.log('сбрасываем интервал');
      window.clearInterval(that.current.tokenRefreshInterval);
    }
    console.log('\r\n\r\n\r\n\r\n\r\n');
    console.log('\r\n\r\n\r\n\r\n\r\n');
    console.log(isAuthorizated);
    console.log('\r\n\r\n\r\n\r\n\r\n');
    console.log('\r\n\r\n\r\n\r\n\r\n');
    console.log('userWords data');
  }, [isAuthorizated]);



  useEffect(() => {
    if (isAuthorizated && hasUserSettings === 'YES' && userWordsArray !== null) {
      console.log('useEffect === READY');
      console.log(isAuthorizated, hasUserSettings, userWordsArray)
      setReadyToJoin('READY');
    } else if (isAuthorizated && hasUserSettings === 'NO') {
      console.log('useEffect === LOADING')
      if (isAuthorizated && hasUserSettings === 'NO') {
        loadSettings({ apiService: api })
          .then((responseSettings) => {
            if (responseSettings.result === USER_HAS_ENTITY) {
              loadStatistic({ apiService: api })
                .then((responseStat) => {
                  if (responseStat.result === USER_HAS_ENTITY) {
                    //TODO: set user statistic and settings, 
                    //TODO: change to ref
                    userSettings.wordsPerDay = responseSettings.settings.wordsPerDay;
                    userSettings.optional = {
                      ...responseSettings.settings.optional,
                    }
                    userStatistic.learnedWords = responseStat.statistic.learnedWords;
                    userStatistic.optional = {
                      ...responseStat.statistic.optional,
                    }

                    setHasUserSettings('YES');
                    // setHasUserStatistic('YES');

                  } else {
                    //TODO: logout;
                    logoutUser();
                  }
                })
                .catch((err) => {
                  console.log('get error with statistic in app after get settings something went wrong', err.message);
                })
            } else if (responseSettings.result === USER_NO_ENTITY) {
              setHasUserSettings('NOTONSERVER')
            }
          })
        //запрос на сервер

        // если есть настройки,  то да
      }
      setReadyToJoin('LOADING');
    } else if (isAuthorizated && hasUserSettings === 'NOTONSERVER') {
      console.log('useEffect === NEEDSETTINGS')
      setReadyToJoin('NEEDSETTINGS');
    } else if (!isAuthorizated) {
      console.log('useEffect === NOTLOGGED')
      setReadyToJoin('NOTLOGGED');
    } else if (isAuthorizated && hasUserSettings === 'YES' && userWordsArray === null) {
      api.getAllUserAggregatedWords(null, null, 3600, userWordsFilter)
        .then((data) => {
          console.log('\r\n\r\n\r\n\r\n\r\n');
          console.log(that.current.isAuthorizated);
          console.log('\r\n\r\n\r\n\r\n\r\n');
          console.log('userWords data', data);
          if (data.paginatedResults.length > 0) {
            setUserWordsArray(data.paginatedResults);
          } else {
            setUserWordsArray([]);
          }
        })
        .catch((err) => {
          console.log('user words get error', err.message);
          logoutUser();
        })
      setReadyToJoin('LOADING');
    } else {
      console.log('useEffect === LOADING')
      setReadyToJoin('LOADING');
    }
  }, [isAuthorizated, hasUserSettings, userWordsArray])
  let routeComponent: ReactNode = null;


  const trainingPageProps: trainingProps = {
    isMute: isMute,
    isLanguageRU: isLanguageRU,
    isDarkTheme: isDarkTheme,
    settings: userSettings,
    updateSettings: setUserSettings,
    statistic: userStatistic,
    updateStatistic: setUserStatistic,
    userWords: userWordsArray,
    updateUserWords: setUserWordsArray,
    apiService: api,
  }

  if (readyToJoin === 'READY') {
    console.log('readyToJoin === READY');
    routeComponent = (
      <Switch >
        <Route path='/dashboard' render={() => <DashboardPage {...trainingPageProps}></DashboardPage>} />
        <Route path='/dailygoal' render={() => <DailyGoalPage {...trainingPageProps}></DailyGoalPage>} />
        <Route path='/training' render={() => <ShadowTrainingPage
          {...trainingPageProps}
          currentTrainingState={currentTrainingState}
          setCurrentTrainingState={setCurrentTrainingState}
        ></ShadowTrainingPage>} />
        <Route path='/vocabulary' render={() => <VocabularyPage {...trainingPageProps}></VocabularyPage>} />
        <Route path='/settings' render={() => <SettingsPage {...trainingPageProps}></SettingsPage>} />
        <Route path='/logout' render={() => <LogoutPage isDarkTheme={isDarkTheme} logoutUser={logoutUser} 
          isMute={isMute} isLanguageRU={isLanguageRU} ></LogoutPage>} />
        <Route path='/magicButton' render={() => <MagicButton {...trainingPageProps}
          isAuthorizated={isAuthorizated}></MagicButton>} />
        {/* <Route path='/magicButton' component={() => {
          return (
            <ShadowTrainingPage
              {...trainingPageProps}
              currentTrainingState={currentTrainingState}
              setCurrentTrainingState={setCurrentTrainingState}
            ></ShadowTrainingPage>
          )
        }} /> */}
        <Redirect to='/dashboard' />
      </Switch>
    );
    console.log('user login');
  } else if (readyToJoin === 'NOTLOGGED') {
    console.log('readyToJoin === NOTLOGGED');
    routeComponent = (
      <Switch >
        <Route path='/' render={() => <MagicButton isAuthorizated={false}></MagicButton>} exact />
        <Route path='/login' render={() => <LoginPage isLogin={true} apiService={api}
          isLoginCallback={isLoginCallback} ></LoginPage>} />
        <Route path='/registration' render={() => <LoginPage isLogin={false} apiService={api}
          isLoginCallback={isLoginCallback} ></LoginPage>} />
        <Redirect to='/' />
      </Switch>
    );
    console.log('user not login');
  } else if (readyToJoin === 'NEEDSETTINGS') {
    console.log('readyToJoin === NEEDSETTINGS');
    routeComponent = (
      <Switch >
        <Route path='/createsettings' render={() => <CreateSettings apiService={api}
          getSettingsCallback={getSettingsCallback} ></CreateSettings>} />
        <Redirect to='/createsettings' />
      </Switch>
    );
  } else if (readyToJoin === 'LOADING') {
    console.log('readyToJoin === LOADING');
    routeComponent = <Spinner></Spinner>
  }
  return (
    <Router>
      <div className={appClassNames}>
        <Header
          isMute={isMute} isDarkTheme={isDarkTheme} isLanguageRU={isLanguageRU} settings={userSettings}
          setIsMute={setIsMute} setIsLanguageRU={setIsLanguageRU} toggleTheme={toggleCurrentTheme}
          isAuthorizated={readyToJoin === 'READY'}
        ></Header>
        {routeComponent}
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;