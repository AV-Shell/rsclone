import React, { useState, useEffect } from 'react';
import './shadow-training-page.scss';

import {
  shadowTrainingProps,
  paginatedWord,
  ISaveTraining,
  areThereStillWordsOnGroups,
  ISaveTrainingPart,
  cardAnswer,
  currentTraining,
  IUserWordReq,
  IStartTrainingParams,
  IstatisticMainLong,
} from '../../constants/interfaces';

import Spinner from '../slave-components/spinner';
import TrainingConfigure from './components/training-configure';
// import TestingCard from './components/testing-card';
import TrainingPage from '../training-page';

import {
  loadNewWords,
  currentUTCDayTimeStamp,
  shuffleArrayInPlace,
  isSameDays,
} from '../../helpers/utils';

import {
  addToStatArray,
  getMainGameStatistic,
} from './utils/statistic-utils';

import {
  TOTAL_DIFFICULTY_GROUPS,
  DEFAULT_USER_SETTINGS,
  DEFAULT_USER_STATISTIC,
} from '../../constants/constants';

const serverErrorLog = (err: Error) => {
  console.log(`Achtung! Achtung!
  Der Backend-Server reagierte beim Speichern der Einstellungen mit einem Fehler,
  ohne den Krieg zu erklären. Wir arbeiten weiterhin im Notfallmodus.`);
  console.log(err);
};
const userWordServerLog = (obj: any) => {
  console.log('User Word Server Responce');
  console.log(obj);
};

const ShadowTrainingPage: React.FC<shadowTrainingProps> = (props: shadowTrainingProps) => {
  console.log(props);
  const {
    currentTrainingState, setCurrentTrainingState, userWords, statistic,
    settings, apiService, isDarkTheme, isMute, isLanguageRU,
  } = props;
  console.log('DEFAULT_USER_SETTINGS', DEFAULT_USER_SETTINGS)
  console.log('DEFAULT_USER_STATISTIC', DEFAULT_USER_STATISTIC);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // TODO: remove before end of development
  useEffect(() => {
    console.log('ShadowTrainingPage did mount');
    return () => {
      console.log('ShadowTrainingPage did UNmount');
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  if ((settings === null) || (statistic === null) || (userWords === null)) {
    return <div className="No props Shadow Traning Page" />;
  }

  const createMixedTraining = (newWordsCount: number, repeatWordsCount: number, hasRepeat: boolean) => {
    setIsLoading(true);
    const levelsWord: areThereStillWordsOnGroups = JSON.parse(settings.optional.stillWordsOnGroup);
    loadNewWords({
      maxWordsGroup: (TOTAL_DIFFICULTY_GROUPS - 1),
      userLevel: settings.optional.userLanguageLevel,
      newWordsCount,
      levelsWord,
      apiService,
    })
      .then((data) => {
        const { constWordArray, isWordsOnGroups } = data;
        let userWordsForTraining: paginatedWord[];
        if (hasRepeat) {
          userWords.sort((word1, word2) => {
            if (word1.userWord && word2.userWord) {
              return word1.userWord.optional.nextRepeat - word2.userWord.optional.nextRepeat;
            }
            if (!word1.userWord && !word2.userWord) {
              return 0;
            }
            if (!word1.userWord) {
              return -1;
            }
            if (!word1.userWord) {
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
        const a: ISaveTraining | null = JSON.parse(settings.optional.mainGameShort);
        if (a !== null) {
          const dayNow: string = new Date(Date.now()).toISOString().split('T')[0];
          const savedDay: string = new Date(a.startTrainingTimestamp).toISOString().split('T')[0];
          if (dayNow === savedDay) {
            dailyTrainingCount = a.trainingCountPerDay;
          }
        }
        const trainingParams: ISaveTrainingPart = {
          startTrainingTimestamp: Date.now(),
          totalWordsCount: trainingWords.length,
          trainingCountPerDay: dailyTrainingCount,
          trueAnswerCount: 0,
        };
        console.log('setCurrentTrainingState');
        setCurrentTrainingState({
          ...trainingParams,
          wordsForTraining: trainingWords,
        });
        const idArray: string[] = trainingWords.map((word) => word._id);
        const saveTraining: ISaveTraining = {
          ...trainingParams,
          wordsForTraining: idArray,
        };
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
      });
  };

  const createRepeatTraining = (newWordsCount: number, repeatWordsCount: number, isRepeatAll: boolean) => {
    let userWordsForTraining: paginatedWord[];
    userWords.sort((word1, word2) => {
      if (word1.userWord && word2.userWord) {
        return word1.userWord.optional.nextRepeat - word2.userWord.optional.nextRepeat;
      }
      if (!word1.userWord && !word2.userWord) {
        return 0;
      }
      if (!word1.userWord) {
        return -1;
      }
      if (!word1.userWord) {
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
    const a: ISaveTraining | null = JSON.parse(settings.optional.mainGameShort);
    if (a !== null) {
      const dayNow: string = new Date(Date.now()).toISOString().split('T')[0];
      const savedDay: string = new Date(a.startTrainingTimestamp).toISOString().split('T')[0];
      if (dayNow === savedDay) {
        dailyTrainingCount = a.trainingCountPerDay;
      }
    }
    const trainingParams: ISaveTrainingPart = {
      startTrainingTimestamp: Date.now(),
      totalWordsCount: trainingWords.length,
      trainingCountPerDay: dailyTrainingCount,
      trueAnswerCount: 0,
    };
    console.log('setCurrentTrainingState');
    setCurrentTrainingState({
      ...trainingParams,
      wordsForTraining: trainingWords,
    });
    const idArray: string[] = trainingWords.map((word) => word._id);
    const saveTraining: ISaveTraining = {
      ...trainingParams,
      wordsForTraining: idArray,
    };
    settings.optional.newWordsPerDay = newWordsCount;
    settings.optional.repeatWordsPerDay = repeatWordsCount;
    settings.optional.mainGameShort = JSON.stringify(saveTraining);
    apiService.updateSettings(settings).catch(serverErrorLog);
  };

  const startTraining = (params: IStartTrainingParams) => {
    if ((params.trainingType === 'mixed') || (params.trainingType === 'new')) {
      createMixedTraining(params.newWords, params.repeatWords, (params.trainingType === 'mixed'));
    } else if ((params.trainingType === 'repeat') || (params.trainingType === 'difficult')) {
      createRepeatTraining(params.newWords, params.repeatWords, (params.trainingType === 'repeat'));
    }
    // clear currentForTraining: number, in CreateNewTraining;
    const mainGameLong: IstatisticMainLong = getMainGameStatistic(statistic.optional.mainGameLong);
    mainGameLong.currentForTraining = 0; // TODO:  may be move this part for saved trainings.
    statistic.optional.mainGameLong = JSON.stringify(mainGameLong);
    apiService.updateStatistics(statistic).catch((err) => { console.log('update Statistic server error', err.message); });
  };

  const getAnswer = (res: cardAnswer) => {
    console.log('res: ', res);
    let bonusPoints: number = 0;
    const currentUTCDayTimeStampConst = currentUTCDayTimeStamp();
    let isTrainingEnd: boolean = false;
    const len = currentTrainingState.wordsForTraining.length;
    if (len > 0 && currentTrainingState.wordsForTraining[len - 1]._id === res._id) {
      const word: paginatedWord = currentTrainingState.wordsForTraining[len - 1];
      console.log('setCurrentTrainingState');
      const index = userWords.findIndex((element) => element._id === word._id);
      const userWordReq: IUserWordReq = {
        difficulty: res.difficulty,
        optional: {
          ...res.optional,
        },
      };
      console.log('index', index);
      if (index === -1) {
        word.userWord = userWordReq;
        userWords.push(word);
        // TODO: write to backend,
        console.log('start create user word on server');
        // comment for testing
        apiService.createUserWord(word._id, userWordReq)
          .then((data) => { console.log('create'); userWordServerLog(data); })
          .catch((error) => { console.log('create'); userWordServerLog(error); });
      } else {
        userWords[index].userWord = userWordReq; // так и оставить
        console.log('start update user word on server', index, userWords[index]._id);
        // comment for testing
        apiService.updateUserWord(word._id, userWordReq)
          .then((data) => { console.log('create'); userWordServerLog(data); })
          .catch((error) => { console.log('create'); userWordServerLog(error); });
      }
      let newWordsForTraining: paginatedWord[];
      if (res.isRepeat || (res.points === 0)) {
        newWordsForTraining = [{ ...word }, ...currentTrainingState.wordsForTraining.slice(0, -1)];
      } else {
        newWordsForTraining = currentTrainingState.wordsForTraining.slice(0, -1);
      }
      if (res.points > 0) {
        currentTrainingState.trueAnswerCount += res.points;
      }

      if (newWordsForTraining.length === 0) {
        currentTrainingState.trainingCountPerDay += 1;
        bonusPoints = Math.floor((currentTrainingState.trueAnswerCount * 2) / (currentTrainingState.trainingCountPerDay ** 2));
        isTrainingEnd = true;
        if ((currentTrainingState.startTrainingTimestamp - currentUTCDayTimeStampConst) < 0) {
          currentTrainingState.startTrainingTimestamp = 0;
          currentTrainingState.totalWordsCount = 0;
          currentTrainingState.trainingCountPerDay = 0;
          currentTrainingState.trueAnswerCount = 0;
        }
      }
      const saveTrainingPart: ISaveTrainingPart = {
        startTrainingTimestamp: currentTrainingState.startTrainingTimestamp,
        totalWordsCount: currentTrainingState.totalWordsCount,
        trainingCountPerDay: currentTrainingState.trainingCountPerDay,
        trueAnswerCount: currentTrainingState.trueAnswerCount,
      };

      const idArray: string[] = newWordsForTraining.map((myWord) => myWord._id);
      const saveTraining: ISaveTraining = {
        ...saveTrainingPart,
        wordsForTraining: idArray,
      };
      settings.optional.mainGameShort = JSON.stringify(saveTraining);
      apiService.updateSettings(settings).catch(serverErrorLog);
      const newState: currentTraining = {
        ...saveTrainingPart,
        wordsForTraining: newWordsForTraining,
      };
      // TODO: check this
      // setIsLoading(true);
      setCurrentTrainingState(newState);
    }

    // Statistic parts
    const mainGameLong: IstatisticMainLong = getMainGameStatistic(statistic.optional.mainGameLong);

    if ((res.points) && (!res.isRepeat)) {
      mainGameLong.currentAll += 1;

      if (mainGameLong.currentAll >= mainGameLong.bestAll) {
        mainGameLong.bestAll = mainGameLong.currentAll;
        mainGameLong.bestAllData = currentUTCDayTimeStampConst;
      }

      mainGameLong.currentForTraining += 1;

      if (mainGameLong.currentForTraining >= mainGameLong.bestForTraining) {
        mainGameLong.bestForTraining = mainGameLong.currentForTraining;
        mainGameLong.bestForTrainingData = currentUTCDayTimeStampConst;
      }

      mainGameLong.totalCorrectCards += 1;
      // eslint-disable-next-line prefer-const
      let currentPoints = 1;
      // TODO: calculate MB  bonus and minus;
      // check Bonus and Minus;
      // currentPoints *=bonus;
      // currentPoints /=minus;
      // bonusPoints *=bonus;
      // bonusPoints /=minus;
      mainGameLong.totalPoints += currentPoints + bonusPoints;

      if (isSameDays(mainGameLong.currentRightPerDay.date, currentUTCDayTimeStampConst)) {
        mainGameLong.currentRightPerDay.value += 1;
      } else {
        mainGameLong.currentRightPerDay.value = 1;
        mainGameLong.currentRightPerDay.date = currentUTCDayTimeStampConst;
      }

      mainGameLong.rightPerDay = addToStatArray(mainGameLong.rightPerDay, mainGameLong.currentRightPerDay, false);
    } else if (res.points === 0) {
      mainGameLong.currentAll = 0;
      mainGameLong.currentForTraining = 0;
    }

    if (!res.isRepeat) {
      mainGameLong.totalCards += 1;
    }

    mainGameLong.currentUserWordPerDay.value = userWords.length;
    mainGameLong.currentUserWordPerDay.date = currentUTCDayTimeStampConst;
    mainGameLong.userWordsPerDay = addToStatArray(mainGameLong.userWordsPerDay, mainGameLong.currentUserWordPerDay, true);

    if (isTrainingEnd) {
      mainGameLong.currentForTraining = 0; // TODO:  may be move this part for saved trainings.
    }

    statistic.optional.mainGameLong = JSON.stringify(mainGameLong);
    apiService.updateStatistics(statistic).catch((err) => { console.log('update Statistic server error', err.message); });
  };

  if (currentTrainingState.wordsForTraining.length === 0) {
    let dailyTrainingCount: number = 0;

    if ((currentTrainingState.startTrainingTimestamp - currentUTCDayTimeStamp()) < 0) {
      dailyTrainingCount = 0;
    } else {
      dailyTrainingCount = currentTrainingState.trainingCountPerDay;
    }
    console.log('settings.optional.mainGameShort', settings.optional.mainGameShort);
    const a: ISaveTraining | null = JSON.parse(settings.optional.mainGameShort);
    if (a !== null) {
      console.log('a.startTrainingTimestamp', a.startTrainingTimestamp);
      const dayNow: string = new Date(Date.now()).toISOString().split('T')[0];
      const savedDay: string = new Date(a.startTrainingTimestamp).toISOString().split('T')[0];
      if (dayNow === savedDay) {
        if (a.wordsForTraining.length === 0) {
          dailyTrainingCount = a.trainingCountPerDay;
        } else {
          // запрос на старые слова.
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
            });
          return <Spinner />;
        }
      } else {
        console.log('clear settings.optional.mainGameShort');
        settings.optional.mainGameShort = JSON.stringify(null);
      }
    }
    return (
      <TrainingConfigure
        dailyTrainingCount={dailyTrainingCount}
        startTraining={startTraining}
        {...props}
      />
    );
  }
  console.log('currentTrainingState ', currentTrainingState);
  const words = currentTrainingState.wordsForTraining;
  return (
    <TrainingPage
      word={words[words.length - 1]}
      isDarkTheme={isDarkTheme}
      isMute={isMute}
      isLanguageRU={isLanguageRU}
      settings={settings}
      wordNumber={currentTrainingState.totalWordsCount - words.length + 1}
      totalWords={currentTrainingState.totalWordsCount}
      getAnswer={getAnswer}
    />
    // <TestingCard
    //   word={words[words.length - 1]}
    //   isDarkTheme={isDarkTheme}
    //   settings={settings}
    //   wordNumber={currentTrainingState.totalWordsCount - words.length + 1}
    //   totalWords={currentTrainingState.totalWordsCount}
    //   getAnswer={getAnswer}
    // ></TestingCard>
  );
};

export default ShadowTrainingPage;
