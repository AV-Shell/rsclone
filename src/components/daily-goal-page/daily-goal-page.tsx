import React, { useEffect } from 'react';
import './daily-goal-page.scss';
import {  dailyGoalProps } from '../../constants/interfaces';
function DailyGoalPage(props:dailyGoalProps) {

  useEffect(() => {
    console.log('DailyGoalPage did mount');
    return () => {
      console.log('DailyGoalPage did UNmount');
    };
  }, []);

  // Component code start
  return (
    <div className="daily-goal-page">
      <h2>Daily goal page</h2>
    </div>
  );
}

export default DailyGoalPage;
