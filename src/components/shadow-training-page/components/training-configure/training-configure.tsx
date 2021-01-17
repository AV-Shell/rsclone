import React from 'react';
import { useState, useEffect } from 'react';
import './training-configure.scss';

import {
  shadowTrainingProps,
  aggregatedWordsResult,
  paginatedWord,
  saveTraining,
  areThereStillWordsOnGroups,
} from '../../../../constants/interfaces';

import SentenceWrapper from '../../../slave-components/sentence-wrapper'
import Spinner from '../../../slave-components/spinner'

import { loadNewWords } from '../../../../helpers/utils'

const maxWordsGroup = 5;
let userLevel = 3;
let newWordsCount = 15;

interface wordsSetting {
  new: number,
  repeat: number,
}


function TrainingConfigure(props: shadowTrainingProps) {
  console.log(props);
  const { currentTrainingState, setCurrentTrainingState, userWords, statistic, settings, apiService } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isServerError, setisServerError] = useState<boolean>(false);
  const [wordsSetting, setWordsSetting] = useState<wordsSetting>({ new: 15, repeat: 25 });

  const changeTrainingWordsSettings = (event: React.ChangeEvent<HTMLInputElement>) => {

    const name = event.target.name;
    let value = +event.target.value;
    if (name === 'new') {
      value = value > 15 ? 15 : value < 3 ? 3 : value;
    } else if (name === 'repeat') {
      value = value > 35 ? 35 : value < 10 ? 10 : value;
    }

    setWordsSetting((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  if (isLoading) {
    return <Spinner></Spinner>
  }

  if ((settings === null) || (statistic === null) || (userWords === null)) {
    return <div className="No props Shadow Traning Page"></div>
  }
  const dailyTrainingCount = 10;
  const getNewWords = () => {

  }

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
            <button className="training-card-header-btn-sound" onClick={getNewWords}>
              New Training
              </button>
            <button className="training-card-header-btn-keyboard">
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
            <button className="training-card-header-btn-difficult">
              Only new words
              </button>
            <button className="training-card-header-btn-delete">
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
