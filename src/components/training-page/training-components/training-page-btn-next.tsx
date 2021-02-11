import React from 'react';
import { cardAnswer, userWordOptional } from '../../../constants/interfaces';
import { levelsOfRepeat, MAX_REPEAT_LEVEL, MIN_REPEAT_LEVEL, DAY_IN_SECONDS } from '../training-consts';
import { NextButtonProps } from '../training-page-interfaces';
import { soundControl } from './training-simple-functions';
import { currentUTCDayTimeStamp, someUTCDayTimeStamp, nextUTCDayTimeStamp, limitMinMax } from '../../../helpers/utils';

const ButtonNext: React.FC<NextButtonProps> = (props: NextButtonProps) => {
  const {
    isShown, isAnswerTrue, levelForRepeat, levelStatus, getAnswer, wordID, wordStatus, updateInterval,
    firstAppearance, counter, success, language, nextTrainingDay, isIntervalUsed, stopSoundsObj,
  } = props;
  const trainingDay: number = Date.now();
  if (!isShown) {
    return null;
  }
  if (nextTrainingDay === 0) {
    updateInterval(true);
  }

  const currentCount: number = counter;
  const currentSuccess: number = success;
  const currentProgress: number = Math.floor((currentSuccess / currentCount) * 100) / 100;

  const ButtonNextHandler = () => {
    soundControl(stopSoundsObj);
    const isToRepeat: boolean = (levelStatus === 'again');
    const point: number = isAnswerTrue ? 1 : 0;
    /*
    let nextTime: number = isIntervalUsed ? trainingDay : nextTrainingDay;
    let levelNow: number = levelForRepeat;

    if (isAnswerTrue && isIntervalUsed) {
      switch (levelStatus) {
        case 'again':
          levelNow -= 2;
          break;
        case 'hard':
          if (levelNow < MAX_REPEAT_LEVEL) {
            levelNow -= 1;
          }
          nextTime += levelsOfRepeat[levelNow];
          break;
        case 'easy':
          if (levelNow < MAX_REPEAT_LEVEL - 2) {
            levelNow += 1;
          }
          nextTime += levelsOfRepeat[levelNow];
          break;
        default:
          nextTime += levelsOfRepeat[levelNow];
          break;
      }
    } else if (!isAnswerTrue) {
      levelNow = 1;
      nextTime += levelsOfRepeat[levelNow];
    }
    */

    const currDayTimeStamp = currentUTCDayTimeStamp();
    const nextTrainingDayTimeStamp = someUTCDayTimeStamp(nextTrainingDay);
    const nextDayTimeStamp = nextUTCDayTimeStamp();
    const isInterval = nextTrainingDayTimeStamp < nextDayTimeStamp;
    let nextRepeat = isInterval ? currDayTimeStamp : nextTrainingDayTimeStamp;
    let level = levelForRepeat;
    if (isAnswerTrue && isInterval) {
      switch (levelStatus) {
        case 'again':
          break;
        case 'hard':
          level += 1;
          break;
        case 'good':
          level += 3;
          break;
        case 'easy':
          level += 4;
          break;

        default:
          level += 2;
          break;
      }
      level = limitMinMax(level, MIN_REPEAT_LEVEL, MAX_REPEAT_LEVEL);
      nextRepeat += levelsOfRepeat[level];
    } else if (isAnswerTrue && !isInterval) {
      nextRepeat += DAY_IN_SECONDS;
    } else if (!isAnswerTrue) {
      level = MIN_REPEAT_LEVEL;
      nextRepeat = currDayTimeStamp;
    }

    console.log('currDayTimeStamp', currDayTimeStamp);
    console.log('nextTrainingDayTimeStamp', nextTrainingDayTimeStamp);
    console.log('nextTrainingDay', nextTrainingDay);
    console.log('nextDayTimeStamp', nextDayTimeStamp);
    console.log('isInterval', isInterval);
    console.log('nextRepeat', nextRepeat);
    console.log('levelForRepeat', levelForRepeat);
    console.log('level', level);
    console.log('levelStatus', levelStatus);
    console.log('isAnswerTrue', isAnswerTrue);
    console.log('nextRepeat', nextRepeat);

    const wordSettings: userWordOptional = {
      firstAppearance,
      lastRepeat: trainingDay,
      counter: currentCount, // сколько раз выпадала, плюсовать по клику на дальше
      success: currentSuccess, // сколько всего правильных ответов, плюсовать по клику на дальше
      progress: currentProgress, // отношение успешных ответов ко всем
      status: wordStatus, // string,   'active', 'deleted', 'difficult'
      userWord: true,
      // level: levelNow,
      // nextRepeat: nextTime, // подсчет по методике в кнопке или из настроек, если без ИП
      level,
      nextRepeat,
    };

    const resultOfTheCard: cardAnswer = {
      difficulty: 'default',
      optional: wordSettings,
      isRepeat: isToRepeat,
      points: point,
      _id: wordID,
    };

    const res: cardAnswer = resultOfTheCard;
    getAnswer(res);
  };

  return (
    <button
      type="button"
      className="button-next"
      onClick={ButtonNextHandler}
    >
      <span>
        {language.nextButton}
      </span>
      &nbsp;
      <i className="bi bi-box-arrow-in-right" />
    </button>
  );
};

export default ButtonNext;
