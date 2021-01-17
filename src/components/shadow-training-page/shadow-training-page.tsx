import React from 'react';
import { useState, useEffect } from 'react';
import './shadow-training-page.scss';

import {
  shadowTrainingProps,
  aggregatedWordsResult,
  paginatedWord,
  saveTraining,
  areThereStillWordsOnGroups,
} from '../../constants/interfaces';

import SentenceWrapper from '../slave-components/sentence-wrapper'
import Spinner from '../slave-components/spinner'
import TrainingConfigure from './components/training-configure'
import { loadNewWords } from '../../helpers/utils'

const maxWordsGroup = 5;
let userLevel = 3;
let newWordsCount = 15;

interface wordsSetting {
  new: number,
  repeat: number,
}


function ShadowTrainingPage(props: shadowTrainingProps) {
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
    } else     if (name === 'repeat') {
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
  const levelsWord: areThereStillWordsOnGroups = JSON.parse(settings.optional.stillWordsOnGroup)
  

  const loadData2 = async () => {
    //TODO: get UserLvl from Settings
    let startLvl = userLevel;
    const constWordArray: paginatedWord[] = [];
    let responce: aggregatedWordsResult;
    //TODO: get from settings
    let hiLvlWordsCount = Math.ceil(newWordsCount / 2);
    let lowLvlWordsCount = newWordsCount - hiLvlWordsCount;
    let hasLowLvlWords = false;
    let hasHiLvlWords = false;
    for (let i: number = 0; i < startLvl; i++) {
      hasLowLvlWords = hasLowLvlWords || levelsWord[i];
    }
    for (let i: number = startLvl; i <= maxWordsGroup; i++) {
      hasHiLvlWords = hasHiLvlWords || levelsWord[i];
    }
    if (hasLowLvlWords === false) {
      hiLvlWordsCount = newWordsCount;
    }
    if (hasHiLvlWords === false) {
      lowLvlWordsCount = newWordsCount;
    }
    console.log('lowLvlWordsCount', lowLvlWordsCount);
    console.log('hiLvlWordsCount', hiLvlWordsCount);
    console.log('hasLowLvlWords', hasLowLvlWords);
    console.log('hasHiLvlWords', hasHiLvlWords);
    if (hasLowLvlWords) {
      let totalGotWords = 0;
      for (let i = 0; i < startLvl; i += 1) {
        if (levelsWord[i] !== false) {
          const requestWordsCount = Math.ceil((lowLvlWordsCount - totalGotWords) / (startLvl - i));
          console.log('ilow', i, 'requestWordsCount', requestWordsCount, 'totalGotWords', totalGotWords);
          let responce = await apiService.getAggregatedNewWordsFromGroup(requestWordsCount, i);
          console.log('responce', responce);
          if (responce.paginatedResults.length === 0) {
            //TODO: где нить проверить, что изменилось, и записать в настройки.
            levelsWord[i] = false;
          } else {
            responce.paginatedResults.forEach((word) => constWordArray.push(word));
            totalGotWords += responce.paginatedResults.length;
          }
        }
      }
    }
    if (hasHiLvlWords) {
      let totalGotWords = 0;
      for (let i = startLvl; i <= maxWordsGroup; i += 1) {
        if (levelsWord[i] !== false) {
          const requestWordsCount = hiLvlWordsCount - totalGotWords;
          console.log('i hi', i, 'requestWordsCount', requestWordsCount, 'totalGotWords', totalGotWords);
          let responce = await apiService.getAggregatedNewWordsFromGroup(requestWordsCount, i);
          console.log('responce', responce);
          if (responce.paginatedResults.length === 0) {
            //TODO: где нить проверить, что изменилось, и записать в настройки.
            levelsWord[i] = false;
          } else {
            responce.paginatedResults.forEach((word) => constWordArray.push(word));
            totalGotWords += responce.paginatedResults.length;
            if (hiLvlWordsCount === totalGotWords) {
              break;
            }
          }
        }
      }
    }
    return constWordArray;
  }

  const getNewWords = () => {
    console.log('getNewWords start');
    setIsLoading(true);
    loadNewWords({
      maxWordsGroup: 5,
      userLevel: 3,
      newWordsCount: 15,
      levelsWord: levelsWord,
      apiService: apiService,
    })
      .then((data) => {
        console.log('getNewWords data');
        console.log(data);
      })
      .catch((error) => {
        console.log('getNewWords error');
        console.log(error);
      })
      .finally(() => {
        console.log('finally');
        setIsLoading(false);
      })
  }

  const createNewTraining = () => {
    //
  }


  if (currentTrainingState.wordsForTraining.length === 0) {
    let isNeedNewWords: boolean = false;
    let isNeedOldWords: boolean = false;
    let dailyTrainingCount: number = 0;
    const a: saveTraining | null = JSON.parse(settings.optional.mainGameShort);
    if (a !== null) {
      const dayNow: string = new Date(Date.now()).toISOString().split('T')[0];
      const savedDay: string = new Date(a.startTrainingTimestamp).toISOString().split('T')[0];
      if (dayNow === savedDay) {
        if (a.wordsForTraining.length === 0) {
          dailyTrainingCount = a.trainingCountPerDay;
        }
        else {
          //TODO:  запрос на старые слова. 
          //TODO: обновление массива слов.
          // Обновление игры.
          return <Spinner></Spinner>
        }
      } else {
        settings.optional.mainGameShort = JSON.stringify('null');
      }
    }
    return <TrainingConfigure {...props}/>
    return (
      <div className="shadow-training-page">
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
  } else {
    console.log("currentTrainingState ", currentTrainingState)




  }
  console.log('props', props);
  console.log('userWords', userWords);

  // Component code start
  return (
    <div className="shadow-training-page">
      <div className="wrapper">
        <h2>Training
          <i className="bi bi-stoplights-fill"></i>
        </h2>
        <div className="training-progress">
          progress-bar
        </div>
        <div className="training-card">
          <div className="training-card-header">
            <button className="training-card-header-btn-sound">Звук</button>
            <button className="training-card-header-btn-keyboard">Клава</button>
            <button className="training-card-header-btn-difficult">Сложные</button>
            <button className="training-card-header-btn-delete">Удалить</button>
          </div>
          <div className="training-card-body">
            <div className="training-card-body-upper">
              <hr />
              <p>word-progress</p>
            </div>
            <div className="training-card-body-word">
              <div className="training-card-body-word-details">
                <p>Введите английское слово</p>
                <input className="training-card-body-word-details-input" type="text" />
                <p className="training-card-body-word-details-translation">перевод</p>
                <p className="training-card-body-word-details-transcription">транскрипция</p>
              </div>
              <div className="training-card-body-word-img">
                <img src="" alt="word" />
              </div>
            </div>
            <div className="training-card-body-examples">
              <SentenceWrapper sentence={userWords[0].textExample}
                classCss={'training-card-body-sentence-eng'}
                openTag={'<b>'}
                closeTag={'</b>'}
              />
              <SentenceWrapper sentence={userWords[0].textExample}
                classCss={'training-card-body-sentence-eng answered'}
                openTag={'<b>'}
                closeTag={'</b>'}
              />
              <p className="training-card-body-sentence-ru">{userWords[0].textExampleTranslate}</p>
              <SentenceWrapper sentence={userWords[0].textMeaning}
                classCss={'training-card-body-explanation-eng'}
                openTag={'<i>'}
                closeTag={'</i>'}
              />
              <SentenceWrapper sentence={userWords[0].textMeaning}
                classCss={'training-card-body-explanation-eng answered'}
                openTag={'<i>'}
                closeTag={'</i>'}
              />
              <p className="training-card-body-explanation-ru">{userWords[0].textMeaningTranslate}</p>
            </div>
          </div>
          <div className="training-card-footer">
            <button>Показать ответ</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShadowTrainingPage;
