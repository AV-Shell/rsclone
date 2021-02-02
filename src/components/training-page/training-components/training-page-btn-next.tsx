import React from 'react';
import { cardAnswer, userWordOptional } from '../../../constants/interfaces';
import { levelsOfRepeat, MAX_REPEAT_LEVEL } from '../training-consts';
import { NextButtonProps } from '../training-page-interfaces';
import { soundControl } from './training-simple-functions';

export default function ButtonNext(props: NextButtonProps) {
  const {
    isShown, isAnswerTrue, levelForRepeat, levelStatus, getAnswer, wordID, wordStatus,
    firstAppearance, counter, success, language, nextTrainingDay, isIntervalUsed, stopSoundsObj,
  } = props;
  const trainingDay: number = Date.now();
  if (!isShown) {
    return null;
  }

  const currentCount: number = counter;
  const currentSuccess: number = success;
  const currentProgress: number = Math.floor((currentSuccess / currentCount) * 100) / 100;

  const ButtonNextHandler = () => {
    soundControl(stopSoundsObj);
    const isToRepeat: boolean = (levelStatus === 'again');
    const point: number = isAnswerTrue ? 1 : 0;
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
    } else if (isIntervalUsed) {
      levelNow = 1;
      nextTime += levelsOfRepeat[levelNow];
    }

    const wordSettings: userWordOptional = {
      firstAppearance,
      lastRepeat: trainingDay,
      nextRepeat: nextTime, // подсчет по методике в кнопке или из настроек, если без ИП
      counter: currentCount, // сколько раз выпадала, плюсовать по клику на дальше
      success: currentSuccess, // сколько всего правильных ответов, плюсовать по клику на дальше
      progress: currentProgress, // отношение успешных ответов ко всем
      status: wordStatus, // string,   'active', 'deleted', 'difficult'
      level: levelNow,
      userWord: true,
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
}
