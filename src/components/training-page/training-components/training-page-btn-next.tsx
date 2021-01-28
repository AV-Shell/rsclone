import React from 'react';
import { cardAnswer, userWordOptional } from '../../../constants/interfaces';
import { levelsOfRepeat, MAX_REPEAT_LEVEL } from '../training-consts';
import { NextButtonProps } from '../training-page-interfaces';

export default function ButtonNext(props: NextButtonProps) {
  const {
    isShown, isAnswerTrue, levelForRepeat, levelStatus, getAnswer, wordID, wordStatus,
    firstAppearance, counter, success, language, nextTrainingDay, isIntervalUsed
  } = props;
  const trainingDay: number = Date.now();
  if (!isShown) {
    return null;
  };  
  
  const currentCount: number = counter;
  const currentSuccess: number = success;
  const currentProgress: number = Math.floor((currentSuccess / currentCount) * 100) / 100;

  const ButtonNextHandler = () => {
    const isToRepeat: boolean = (levelStatus === 'again') ? true : false;
    const point: number = isAnswerTrue ? 1 : 0;
    let nextTime: number = isIntervalUsed ? trainingDay : nextTrainingDay;
    
    let levelNow: number = levelForRepeat;
    console.log(levelNow, 'levelNow');
    if (isAnswerTrue && isIntervalUsed) {
      switch (levelStatus) {
        case 'again': 
          console.log('in again switch');
          levelNow = levelNow - 2; // сбросить до исходного
          console.log(`levelNow: ${levelNow}, nextRepeat: ${nextTime}`);
        break;
        case 'hard':  
          console.log('in hard switch');
          if (levelNow < MAX_REPEAT_LEVEL) {
            levelNow = levelNow - 1;
          };
          nextTime+= levelsOfRepeat[levelNow];
          console.log(`levelNow: ${levelNow}, nextRepeat: ${nextTime}`);
        break;
        case 'easy':
          console.log('in easy switch');
          if (levelNow < MAX_REPEAT_LEVEL - 2) {
            levelNow = levelNow + 1;
          }
          nextTime += levelsOfRepeat[levelNow];
          console.log(`levelNow: ${levelNow}, nextRepeat: ${nextTime}`);
        break;
        default:
          console.log('in normal switch')
          nextTime += levelsOfRepeat[levelNow];
          console.log(`levelNow: ${levelNow}, nextRepeat: ${nextTime}`);
        break;
      }
    } else if (isIntervalUsed) {
      console.log('when answer wrong');
      levelNow = 1;
      nextTime += levelsOfRepeat[levelNow];
      console.log(`levelNow: ${levelNow}, nextRepeat: ${nextTime}`);
    };

    const wordSettings: userWordOptional = {
      firstAppearance: firstAppearance,
      lastRepeat: trainingDay,
      nextRepeat: nextTime, // подсчет по методике в кнопке или из настроек, если без ИП
      counter: currentCount, // сколько раз выпадала, плюсовать по клику на дальше
      success: currentSuccess, // сколько всего правильных ответов, плюсовать по клику на дальше
      progress: currentProgress, // отношение успешных ответов ко всемпше ыефегы
      status: wordStatus,//string,   //'active', 'deleted', 'difficult'
      level: levelNow,
      userWord: true,
      }
    
    const resultOfTheCard: cardAnswer = {
      difficulty: 'default',
      optional: wordSettings,
      isRepeat: isToRepeat,
      points: point,
      _id: wordID
    }
    
    console.log('повторять или нет: ', resultOfTheCard.isRepeat);
    console.log(`доинтервальный уровень повторения: ${levelForRepeat},
    уровень повторения: ${levelNow}, 
    повторить через: ${levelsOfRepeat[levelNow]} 
    следущий повтор: ${nextTime}`);
    console.log(resultOfTheCard);

    // возвращение нужного объекта
    let res: cardAnswer;
    res = resultOfTheCard;
    getAnswer(res);
  }

  return (<button className="button-next" onClick={ButtonNextHandler}>{language.nextButton}</button>)
}
