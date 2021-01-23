import React from 'react';
import {
  upperButtonProps, lineProps, forStars, dayProgress, WordProgressProps
  } from './training-page-interfaces';
import {TOTAL_DIFFICULTY_GROUPS} from '../../constants/constants';
import { MAX_REPEAT_LEVEL } from './training-consts';

export function TrainingCardUpperBtn(props:upperButtonProps) {
  const {id, isShown, isAnswerRight, isWordNew, line, status, classCss, iClass, setStatusForObj} = props;
  const classWhole: string = (id === status) ? classCss + ' active' : classCss;

  const ClickHandler = () => {
    console.log(`${id} is clicked`);
    setStatusForObj(id);
  }

  if (isShown && isAnswerRight) {
    return (
    <button onClick={ClickHandler} className={classWhole}>
        <i className={iClass}></i> {line}
    </button>);
  };
  return null;
}

export function TrainingCardLineCode(props:lineProps) {
  const {isTrue, line, classCss} = props;
  if (isTrue) {
    return (<p className={classCss}>{line}</p>);
  };
  return null;
}

export function TrainingCardImage(props:lineProps) {
  const {isTrue, line, classCss} = props;
  if (isTrue) {
    return (
    <div className={classCss}>
      <img src={line} alt="word" />
    </div>);
  };
  return null;
}

export function StarsLevelField(props:forStars) {
  const {level} = props;

  const elements = Array(TOTAL_DIFFICULTY_GROUPS).fill(0)
  .map((el,index,arr) => <i key={index} className={index < (arr.length - 1 - level) ? "bi bi-star" : "bi bi-star-fill"}> 
  </i>);
  return <span className="training-card-body-upper-progress-stars">{elements}</span>;
}

export function TrainingProgressBar(props: dayProgress) {
  const { left, right } = props;
  const barWidth: number = Math.round((left / right) * 100);
  const perCent: string = `${barWidth}%`;

  return (
  <div className="training-progress-center">
    <div className="progress progress-striped active">
      <div className="bar"
        style={{width: perCent}}></div>
    </div>
  </div>)
}

export function WordProgress(props: WordProgressProps) {
  const {level} = props;

  const rightNum: number = MAX_REPEAT_LEVEL;
  const  progressString: string = `${level / rightNum * 100}%`;

  return (
    <div className="word-progress">
      <div className="progress progress-striped active">
        <div className="word-bar"
          style={{width: progressString}}></div>
      </div>
      <small>Прогресс интервального повторения</small>
    </div>
  )
}
