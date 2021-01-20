import React from 'react';
import { useState, useEffect } from 'react';
import './shadow-training-page.scss';

import {
  shadowTrainingProps,
  aggregatedWordsResult,
  paginatedWord,
  saveTraining,
  areThereStillWordsOnGroups,
  userCardAnswer,
  userSettings,
  saveTrainingPart,
  cardAnswer,
  currentTraining,
  userWordReq,
  startTrainingParams,
} from '../../constants/interfaces';

import Spinner from '../slave-components/spinner';
import TrainingConfigure from './components/training-configure';
import TestingCard from './components/testing-card';
import {
  loadNewWords,
  nextUTCDayTimeStamp,
  currentUTCDayTimeStamp,
  shuffleArrayInPlace,
} from '../../helpers/utils';
import {
  TOTAL_DIFFICULTY_GROUPS,
} from '../../constants/constants';
import { formatDiagnosticsWithColorAndContext } from 'typescript';


const serverErrorLog = (err: Error) => {
  console.log(`Achtung! Achtung!
  Der Backend-Server reagierte beim Speichern der Einstellungen mit einem Fehler,
  ohne den Krieg zu erklären. Wir arbeiten weiterhin im Notfallmodus.`);
  console.log(err);
}
const userWordServerLog = (obj: any) => {
  console.log(`User Word Server Responce`);
  console.log(obj);
}

function ShadowTrainingPage(props: shadowTrainingProps) {
  console.log(props);
  const { currentTrainingState, setCurrentTrainingState, updateSettings,
    userWords, statistic, settings, apiService } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('ShadowTrainingPage did mount');
    return () => {
      console.log('ShadowTrainingPage did UNmount');
    };
  }, []);

  if (isLoading) {
    return <Spinner></Spinner>
  }
  if ((settings === null) || (statistic === null) || (userWords === null)) {
    return <div className="No props Shadow Traning Page"></div>
  }


  const createMixedTraining = (newWordsCount: number, repeatWordsCount: number, hasRepeat: boolean) => {
    setIsLoading(true);
    let levelsWord: areThereStillWordsOnGroups = JSON.parse(settings.optional.stillWordsOnGroup)
    loadNewWords({
      maxWordsGroup: (TOTAL_DIFFICULTY_GROUPS - 1),
      userLevel: settings.optional.userLanguageLevel,
      newWordsCount: newWordsCount,
      levelsWord: levelsWord,
      apiService: apiService,
    })
      .then((data) => {
        const { constWordArray, isWordsOnGroups } = data;
        let userWordsForTraining: paginatedWord[];
        if (hasRepeat) {
          userWords.sort((word1, word2) => {
            if (word1.userWord && word2.userWord) {
              return word1.userWord.optional.nextRepeat - word2.userWord.optional.nextRepeat;
            } else if (!word1.userWord && !word2.userWord) {
              return 0;
            } else if (!word1.userWord) {
              return -1;
            } else if (!word1.userWord) {
              return 1;
            }
            return 0;
          });
          userWordsForTraining = userWords
            .filter((word) => {
              if (word.userWord) {
                return word.userWord.optional.status !== 'deleted';
              }
              return false;
            })
            .slice(0, repeatWordsCount);
        } else {
          userWordsForTraining = [];
        }
        const trainingWords: paginatedWord[] = [...constWordArray, ...userWordsForTraining];
        shuffleArrayInPlace(trainingWords);
        let dailyTrainingCount: number = 0;
        const a: saveTraining | null = JSON.parse(settings.optional.mainGameShort);
        if (a !== null) {
          const dayNow: string = new Date(Date.now()).toISOString().split('T')[0];
          const savedDay: string = new Date(a.startTrainingTimestamp).toISOString().split('T')[0];
          if (dayNow === savedDay) {
            dailyTrainingCount = a.trainingCountPerDay;
          }
        }
        const trainingParams: saveTrainingPart = {
          startTrainingTimestamp: Date.now(),
          totalWordsCount: trainingWords.length,
          trainingCountPerDay: dailyTrainingCount,
          trueAnswerCount: 0,
        }
        console.log('setCurrentTrainingState');
        setCurrentTrainingState({
          ...trainingParams,
          wordsForTraining: trainingWords,
        });
        const idArray: string[] = trainingWords.map((word) => word._id);
        const saveTraining: saveTraining = {
          ...trainingParams,
          wordsForTraining: idArray,
        }
        /*
        console.log('update setting before start training');
        const newSettings: userSettings = {
          wordsPerDay: settings.wordsPerDay,
          optional: {
            ...settings.optional,
            newWordsPerDay: wordsSetting.new,
            repeatWordsPerDay: wordsSetting.repeat,
            stillWordsOnGroup: JSON.stringify(isWordsOnGroups),
            mainGameShort: JSON.stringify(saveTraining),
          }
        }
        apiService.updateSettings(newSettings)
          .then(data => {
            console.log(data);
            //TODO: what i am doing? i need to save new settings.
            updateSettings(data); //update settings state
          })
          .catch(serverErrorLog)
          .finally(() => {
            //TODO: так, на всякий.
          });
          */
        settings.optional.newWordsPerDay = newWordsCount;
        settings.optional.repeatWordsPerDay = repeatWordsCount;
        settings.optional.stillWordsOnGroup = JSON.stringify(isWordsOnGroups);
        settings.optional.mainGameShort = JSON.stringify(saveTraining);
        apiService.updateSettings(settings).catch(serverErrorLog);
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

  const createRepeatTraining = (newWordsCount: number, repeatWordsCount: number, isRepeatAll: boolean) => {
    let userWordsForTraining: paginatedWord[];
    userWords.sort((word1, word2) => {
      if (word1.userWord && word2.userWord) {
        return word1.userWord.optional.nextRepeat - word2.userWord.optional.nextRepeat;
      } else if (!word1.userWord && !word2.userWord) {
        return 0;
      } else if (!word1.userWord) {
        return -1;
      } else if (!word1.userWord) {
        return 1;
      }
      return 0;
    });
    if (isRepeatAll) {
      userWordsForTraining = userWords
        .filter((word) => {
          if (word.userWord) {
            return word.userWord.optional.status !== 'deleted';
          }
          return false;
        })
        .slice(0, repeatWordsCount);
    } else {
      userWordsForTraining = userWords
        .filter((word) => {
          if (word.userWord) {
            return word.userWord.optional.status === 'difficult';
          }

          return false;
        })
        .slice(0, repeatWordsCount);
    }
    if (userWordsForTraining.length === 0) {
      return;
    }
    const trainingWords: paginatedWord[] = userWordsForTraining;
    shuffleArrayInPlace(trainingWords);
    let dailyTrainingCount: number = 0;
    const a: saveTraining | null = JSON.parse(settings.optional.mainGameShort);
    if (a !== null) {
      const dayNow: string = new Date(Date.now()).toISOString().split('T')[0];
      const savedDay: string = new Date(a.startTrainingTimestamp).toISOString().split('T')[0];
      if (dayNow === savedDay) {
        dailyTrainingCount = a.trainingCountPerDay;
      }
    }
    const trainingParams: saveTrainingPart = {
      startTrainingTimestamp: Date.now(),
      totalWordsCount: trainingWords.length,
      trainingCountPerDay: dailyTrainingCount,
      trueAnswerCount: 0,
    }
    console.log('setCurrentTrainingState');
    setCurrentTrainingState({
      ...trainingParams,
      wordsForTraining: trainingWords,
    });
    const idArray: string[] = trainingWords.map((word) => word._id);
    const saveTraining: saveTraining = {
      ...trainingParams,
      wordsForTraining: idArray,
    }
    settings.optional.newWordsPerDay = newWordsCount;
    settings.optional.repeatWordsPerDay = repeatWordsCount;
    settings.optional.mainGameShort = JSON.stringify(saveTraining);
    apiService.updateSettings(settings).catch(serverErrorLog);
  }


  const startTraining = (params: startTrainingParams) => {
    if ((params.trainingType === 'mixed') || (params.trainingType === 'new')) {
      createMixedTraining(params.newWords, params.repeatWords, (params.trainingType === 'mixed'));
    } else if ((params.trainingType === 'repeat') || (params.trainingType === 'difficult')) {
      createRepeatTraining(params.newWords, params.repeatWords, (params.trainingType === 'repeat'));
    }
  }

  const getAnswer = (res: cardAnswer) => {
    console.log('res: ', res);

    const len = currentTrainingState.wordsForTraining.length;
    if (len > 0 && currentTrainingState.wordsForTraining[len - 1]._id === res._id) {
      const word: paginatedWord = currentTrainingState.wordsForTraining[len - 1];
      console.log('setCurrentTrainingState');
      const index = userWords.findIndex((element) => element._id === word._id);
      const userWordReq: userWordReq = {
        difficulty: res.difficulty,
        optional: {
          ...res.optional,
        },
      }
      console.log('index', index);
      if (index === -1) {
        word.userWord = userWordReq;
        userWords.push(word);
        //TODO: write to backend,
        console.log('start create user word on server')

        /*
        comment for testing
        apiService.createUserWord(word._id, userWordReq)
          .then((data) => { console.log('create'); userWordServerLog(data); })
          .catch((error) => { console.log('create'); userWordServerLog(error); })

          */
      } else {
        //TODO: CHECK
        userWords[index].userWord = userWordReq; // так и оставить
        console.log('start update user word on server', index, userWords[index]._id)
        apiService.updateUserWord(word._id, userWordReq)
          .then((data) => { console.log('create'); userWordServerLog(data); })
          .catch((error) => { console.log('create'); userWordServerLog(error); })
      }
      let newWordsForTraining: paginatedWord[];
      if (res.isRepeat) {
        newWordsForTraining = [word, ...currentTrainingState.wordsForTraining.slice(0, -1)];
      } else {
        newWordsForTraining = currentTrainingState.wordsForTraining.slice(0, -1);
        //TODO: обновить слово в словах юзера. 
      }
      let newTrueAnswerCount: number;
      if (res.points > 0) {
        newTrueAnswerCount = currentTrainingState.trueAnswerCount + res.points;
      }

      if (newWordsForTraining.length === 0) {
        currentTrainingState.trainingCountPerDay +=1;
        const resultPoints = currentTrainingState.trueAnswerCount * 2 / currentTrainingState.trainingCountPerDay;
        
        //TODO: update statistic
        statistic.optional.mainGameLong = 'null';


        if ((currentTrainingState.startTrainingTimestamp - currentUTCDayTimeStamp()) < 0){
          currentTrainingState.startTrainingTimestamp = 0;
          currentTrainingState.totalWordsCount = 0;
          currentTrainingState.trainingCountPerDay = 0;
          currentTrainingState.trueAnswerCount = 0;
        }


      }
      const saveTrainingPart: saveTrainingPart = {
        startTrainingTimestamp: currentTrainingState.startTrainingTimestamp,
        totalWordsCount: currentTrainingState.totalWordsCount,
        trainingCountPerDay: (newWordsForTraining.length > 0) ? currentTrainingState.trainingCountPerDay : currentTrainingState.trainingCountPerDay + 1,
        trueAnswerCount: currentTrainingState.trueAnswerCount + res.points,
      }


      const idArray: string[] = newWordsForTraining.map((word) => word._id);
      const saveTraining: saveTraining = {
        ...saveTrainingPart,
        wordsForTraining: idArray,
      }
      /*
      console.log('update setting after answered word start training');
      const newSettings: userSettings = {
        wordsPerDay: settings.wordsPerDay,
        optional: {
          ...settings.optional,
          mainGameShort: JSON.stringify(saveTraining),
        }
      }
      apiService.updateSettings(newSettings)
        .then(data => {
          console.log(data);
          //TODO: what i am doing? i need to save new settings.

          console.log('update settings state after get a respons from server after answer')
          updateSettings(data); //update settings state
        })
        .catch(serverErrorLog)
        .finally(() => {
          //TODO: так, на всякий.
        });
        */
      settings.optional.mainGameShort = JSON.stringify(saveTraining);
      apiService.updateSettings(settings).catch(serverErrorLog);
      const newState: currentTraining = {
        ...saveTrainingPart,
        wordsForTraining: newWordsForTraining,
      }
      setIsLoading(true);
      setCurrentTrainingState(newState);

    }


    if (res.isRepeat) {
    }
    if (res.points) {

    }
  }


  if (currentTrainingState.wordsForTraining.length === 0) {
    let isNeedNewWords: boolean = false;
    let isNeedOldWords: boolean = false;
    let dailyTrainingCount: number = 0;

    if ((currentTrainingState.startTrainingTimestamp - currentUTCDayTimeStamp()) < 0){
      dailyTrainingCount = 0;
    } else {
      dailyTrainingCount = currentTrainingState.trainingCountPerDay;
    }


    console.log('settings.optional.mainGameShort', settings.optional.mainGameShort);
    const a: saveTraining | null = JSON.parse(settings.optional.mainGameShort);
    if (a !== null) {
      console.log('a.startTrainingTimestamp', a.startTrainingTimestamp)
      const dayNow: string = new Date(Date.now()).toISOString().split('T')[0];
      const savedDay: string = new Date(a.startTrainingTimestamp).toISOString().split('T')[0];
      if (dayNow === savedDay) {
        if (a.wordsForTraining.length === 0) {
          dailyTrainingCount = a.trainingCountPerDay;
        }
        else {
          //TODO:  запрос на старые слова.
          setIsLoading(true);
          Promise.all(a.wordsForTraining.map((wordId) => apiService.getUserAggregatedWordById(wordId)))
            .then((data) => {
              const transformedWordArray: paginatedWord[] = data.map((wordShell) => wordShell[0]);
              console.log('saved words array after promice all', transformedWordArray);
              console.log('setCurrentTrainingState');
              setCurrentTrainingState({
                ...a,
                wordsForTraining: transformedWordArray,
              });
            })
            .catch((error) => {
              console.log('error array after promice all', error);
            })
            .finally(() => {
              setIsLoading(false);
            })



          //TODO: обновление массива слов.
          // Обновление игры.
          return <Spinner></Spinner>
        }
      } else {
        console.log('clear settings.optional.mainGameShort');
        settings.optional.mainGameShort = JSON.stringify(null);
      }
    }
    return (
      <TrainingConfigure
        dailyTrainingCount = {dailyTrainingCount}
        startTraining={startTraining}
        {...props}
      />
    )
  }
  console.log("currentTrainingState ", currentTrainingState)
  const words = currentTrainingState.wordsForTraining;
  return (
    <TestingCard
      word={words[words.length - 1]}
      wordNumber={currentTrainingState.totalWordsCount - words.length + 1}
      totalWords={currentTrainingState.totalWordsCount}
      getAnswer={getAnswer}
    ></TestingCard>
  );
}

export default ShadowTrainingPage;
