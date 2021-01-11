import React from 'react';
import './app.scss';
import LoginPage from '../login-page';
import DailyGoalPage from '../daily-goal-page';
import DashboardPage from '../dashboard-page';
import SettingsPage from '../settings-page';
import TrainingPage from '../training-page';
import VocabularyPage from '../vocabulary-page';
import MagicButton from '../magic-button'
import Header from '../header';
import Footer from '../footer';

import { BrowserRouter as Router, Route } from 'react-router-dom';
// eslint-disable-next-line
const isLogin = false;

function App() {
  return (
    <Router>
      <div className="app">
        <Header></Header>
        <Route path='/' component={MagicButton} exact/>
        <Route path='/login' component={LoginPage} />
        <Route path='/dailygoal' component={DailyGoalPage} />
        <Route path='/dashboard' component={DashboardPage} />
        <Route path='/training' component={TrainingPage} />
        <Route path='/vocabulary' component={VocabularyPage} />
        <Route path='/settings' component={SettingsPage} />
        <Route path='/magicButton' component={MagicButton} />
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;