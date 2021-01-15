/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
import React, {
  useRef, useEffect, useState, ReactNode,
} from 'react';
import './app.scss';
import LoginPage from '../login-page';
import LogoutPage from '../logout-page'
import DailyGoalPage from '../daily-goal-page';
import DashboardPage from '../dashboard-page';
import SettingsPage from '../settings-page';
import TrainingPage from '../training-page';
import VocabularyPage from '../vocabulary-page';
import MagicButton from '../magic-button'
import Header from '../header';
import Footer from '../footer';
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
} from '../../constants/interfaces';
import { DEFAULT_USER_SETTINGS, DEFAULT_USER_STATISTIC, DEFAULT_USER_WORD } from '../../constants/constants'
const api = new ApiService();
const App: React.FC = () => {
  console.log('\r\n Render App \r\n');
  const that = useRef({
    api: new ApiService(),
  });

  // const routeComponent = useRef<any>(null);
  const [isUserLogin, setIsUserLogin] = useState<boolean>(false);
  const [userWordsArray, setUserWordsArray] = useState<Array<paginatedWord> | null>(null);
  const [userSettings, setUserSettings] = useState<userSettings | null>(null);
  const [userStatistic, setUserStatistic] = useState<userStatistics | null>(null);

  const [readyToJoin, setReadyToJoin] = useState<boolean>(false);

  useEffect(() => {
    console.log('use effect');
    let isTestUserLoggin = false;
    const user: signInRequestBody = {
      email: testUser.email,
      password: testUser.password,
    }
    console.log(api.checkTokenValidity())
    api.loginUser(user)
      .then((data) => {
        isTestUserLoggin = true;
        console.log(data);
        console.log(api.checkTokenValidity());
      })
      .catch((err) => {
        console.log('---Atata---');
        console.log(err.message);
        console.log('---Error---');
        api.createUser(testUser)
          .then((data) => {
            console.log('User Created');
            console.log(data);
            api.loginUser(user)
              .then((data) => {
                isTestUserLoggin = true;
                console.log(data);
                console.log(api.checkTokenValidity());
              })
              .catch((err) => {
                console.log('---Cannot Login after Creating---');
                console.log(err.message);
                console.log('---Error---');
              });
          })
          .catch((err) => {
            if (err.message === '422') {
              console.log('Incorrect e-mail or password');
            } else if (err.message === '417') {
              console.log('user with this e-mail exists');
            } else {
              console.log('Something went wrong');

              console.log('---Atata---');
              console.log(err.message);
              console.log('---Error---');
            }
          });
      })
      .finally(() => {
        console.log('finaly data');
        console.log('isTestUserLoggin', isTestUserLoggin);

        setIsUserLogin(() => isTestUserLoggin);
        if (isTestUserLoggin) {
          let isHaveSettings = false;
          let isHaveStatistics = false;
          let isHaveUserWords = false;
          api.getSettings()
            .then((userSettings) => {
              console.log(userSettings);
              if (userSettings.optional) {
                isHaveSettings = true;
                setUserSettings(() => userSettings);
              }
              else {
                console.log('throw error settongs');
                throw new Error('404');
              }
            })
            .catch((err) => {
              if (err.message === '401') {
                console.log('token expired')
              } else if (err.message === '404') {
                // TODO: check  enother errors, may be need to compare message
                console.log('settings not found');
                //create Default settings.
                api.updateSettings(DEFAULT_USER_SETTINGS)
                  .then((userSettings) => {
                    console.log(userSettings);
                    isHaveSettings = true;
                    console.log('Settings:', userSettings);
                    setUserSettings(() => userSettings);
                  })
                  .catch((err) => {
                    console.log('update settings error:', err.message);
                  })
              }
            })

          api.getStatistics()
            .then((userStatistics) => {
              console.log(userStatistics);
              if (userStatistics.optional) {
                isHaveStatistics = true;
                setUserStatistic(() => userStatistics);
              }
              else {
                console.log('throw error statistics');
                throw new Error('404');
              }
            })
            .catch((err) => {
              if (err.message === '401') {
                console.log('token expired')
              } else if (err.message === '404') {
                // TODO: check  enother errors, may be need to compare message
                console.log('Statistics not found');
                //create Default settings.
                api.updateStatistics(DEFAULT_USER_STATISTIC)
                  .then((userStatistics) => {

                    isHaveStatistics = true;
                    console.log(isHaveStatistics, userStatistics);
                    console.log('userStatistics:', userStatistics);
                    setUserStatistic(() => userStatistics);
                  })
                  .catch((err) => {
                    console.log('update userStatistics error:', err.message);
                  })
              }
            })
          api.getAllUserAggregatedWords(null, null, 3600,
            '{ "userWord.optional.userWord": true }')
            .then((data) => {
              console.log('user words data', data);
              if (data.paginatedResults.length > 0) {
                isHaveUserWords = true;
                setUserWordsArray(() => data.paginatedResults);
              } else {
                console.log('promice all');
                const promiceArray = testWordsIdArray.map((obj) => {
                  return api.createUserWord(obj.id, TEST_DEFAULT_USER_WORD);
                })
                Promise.all(promiceArray)
                  .then((arrayResp) => {
                    console.log('arrayResp', arrayResp);
                    api.getAllUserAggregatedWords(null, null, 3600,
                      '{ "userWord.optional.userWord": true }')
                      .then((data) => {
                        console.log('user words data after ADD', data);
                        if (data.paginatedResults.length > 0) {
                          isHaveUserWords = true;
                          setUserWordsArray(() => data.paginatedResults);
                        }
                      })
                      .catch((err) => {
                        console.log('user words get error after ADD', err);
                      })

                  })
                  .catch((err) => {
                    console.log('err.promice all', err);
                  })
              }
            })
            .catch((err) => {
              console.log('user words get error', err.message);
            })
        }
      })

  }, []);


  useEffect(() => {
    if (isUserLogin && userWordsArray !== null && userSettings !== null && userStatistic !== null) {
      setReadyToJoin(() => true);
    }
  }, [isUserLogin, userWordsArray, userSettings, userStatistic])
  let routeComponent: ReactNode = null;

  const trainingPageProps: trainingProps = {
    settings: userSettings,
    updateSettings: setUserSettings,
    statistic: userStatistic,
    updateStatistic: setUserStatistic,
    userWords: userWordsArray,
    updateUserWords: setUserWordsArray,
    apiService: api,
  }

  if (readyToJoin) {
    routeComponent = <div className="app">
      <Header></Header>
      <Switch >
        {/* <Route path='/dashboard' component={DashboardPage} /> */}
        <Route path='/dashboard' component={() => {
          return (
            <DashboardPage {...trainingPageProps}></DashboardPage>
          )
        }} />
        {/* <Route path='/dailygoal' component={DailyGoalPage} /> */}
        <Route path='/dailygoal' component={() => {
          return (
            <DailyGoalPage {...trainingPageProps}></DailyGoalPage>
          )
        }} />
        <Route path='/training' component={() => {
          return (
            <TrainingPage {...trainingPageProps}></TrainingPage>
          )
        }} />
        {/* <Route path='/vocabulary' component={VocabularyPage} /> */}
        <Route path='/vocabulary' component={() => {
          return (
            <VocabularyPage {...trainingPageProps}></VocabularyPage>
          )
        }} />
        {/* <Route path='/settings' component={SettingsPage} /> */}
        <Route path='/settings' component={() => {
          return (
            <SettingsPage {...trainingPageProps}></SettingsPage>
          )
        }} />
        <Route path='/logout' component={() => {
          return (
            <LogoutPage {...trainingPageProps}></LogoutPage>
          )
        }} />


        {/* <Route path='/magicButton' component={(routerProps: any) => <MagicButton
          routerProps={routerProps}
          myProps={{ a: 6 }}
        />} /> */}
        <Route path='/magicButton' component={() => {
          return (
            <MagicButton {...trainingPageProps}></MagicButton>
          )
        }} />

        <Redirect to='dashboard' />
      </Switch>
      <Footer></Footer>
    </div>
    console.log('user login');
  } else {
    routeComponent = <div className="app">
      <Header></Header>
      <Switch >
        {/* <Route path='/' component={MagicButton} exact /> */}
        <Route path='/' component={() => {
          return (
            <MagicButton isNotlogin={true}></MagicButton>
          )
        }} exact />
        <Route path='/login' component={LoginPage} />
        <Redirect to='/' />
      </Switch>
      <Footer></Footer>
    </div>
    console.log('user not login');
  }
  return (
    <Router>
      {routeComponent}
    </Router>
  );
}

export default App;