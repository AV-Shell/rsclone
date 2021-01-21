import React from 'react';
import { useState } from 'react';
import './training-configure.scss';

import {
  shadowTrainingProps,
  startTrainingParams,
  trainingType,
} from '../../../../constants/interfaces';

import {
  MIN_NEW_WORDS_PER_DAY,
  MAX_NEW_WORDS_PER_DAY,
  MIN_REPEAT_WORDS_PER_DAY,
  MAX_REPEAT_WORDS_PER_DAY,
} from '../../../../constants/constants';
interface wordsSetting {
  new: number,
  repeat: number,
}

interface props extends shadowTrainingProps {
  dailyTrainingCount: number,
  startTraining: (typeOfTraining: startTrainingParams) => void
}

function TrainingConfigure(props: props) {
  console.log(props);

  const { userWords, statistic, settings, startTraining, dailyTrainingCount } = props;
  const [wordsSetting, setWordsSetting] = useState<wordsSetting>({
    new: settings.optional.newWordsPerDay,
    repeat: settings.optional.repeatWordsPerDay
  });

  const changeTrainingWordsSettings = (event: React.ChangeEvent<HTMLInputElement>) => {

    const name = event.target.name;
    let value = +event.target.value;

    if ((name === 'new') && (value > MAX_NEW_WORDS_PER_DAY)) {
      value = MAX_NEW_WORDS_PER_DAY;
    } else if ((name === 'new') && (value < MIN_NEW_WORDS_PER_DAY)) {
      value = MIN_NEW_WORDS_PER_DAY;
    } else if ((name === 'repeat') && (value > MAX_REPEAT_WORDS_PER_DAY)) {
      value = MAX_REPEAT_WORDS_PER_DAY;
    } else if ((name === 'repeat') && (value < MIN_REPEAT_WORDS_PER_DAY)) {
      value = MIN_REPEAT_WORDS_PER_DAY;
    }

    setWordsSetting((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  console.log('wordsSetting', wordsSetting);

  const startTrainingWithWords = (trainingType: trainingType) => {
    const startTrainingParams: startTrainingParams = {
      trainingType: trainingType,
      newWords: wordsSetting.new,
      repeatWords: wordsSetting.repeat,
    }
    
    startTraining(startTrainingParams);
  }

  if ((settings === null) || (statistic === null) || (userWords === null)) {
    return <div className="No props Shadow Traning Page"></div>
  }
  console.log('wordsSetting', wordsSetting);
  return (
    <div className="training-configure">
      <div className="wrapper">
        <h2>Training count per day {dailyTrainingCount}
          <i className="bi bi-stoplights-fill"></i>
        </h2>
        <div className="training-progress">
          progress-bar
          </div>
        <div className="training-card">
          <div className="training-card-header">
            <button className="training-card-header-btn-sound" onClick={() => startTrainingWithWords('mixed')}>
              New Training
              </button>
            <button className="training-card-header-btn-keyboard" onClick={() => startTrainingWithWords('repeat')}>
              Only repeat
              </button>
            <label >Number of new words(3-15):
                <input
                onChange={changeTrainingWordsSettings}
                type="number" id="newWordsSelector" name="new"
                min="3" max="15" value={wordsSetting.new}>
              </input>
            </label>
            <label >Number words for repeat(10-35):
                <input
                onChange={changeTrainingWordsSettings}
                type="number" id="repeatWordsSelector" name="repeat"
                min="10" max="35" value={wordsSetting.repeat}></input>
            </label>
            <button className="training-card-header-btn-difficult" onClick={() => startTrainingWithWords('new')}>
              Only new words
              </button>
            <button className="training-card-header-btn-delete" onClick={() => startTrainingWithWords('difficult')}>
              difficult words
              </button>
          </div>
          <div className="training-card-body">
          </div>
          <div className="training-card-footer">
            <button>Я хз</button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default TrainingConfigure;