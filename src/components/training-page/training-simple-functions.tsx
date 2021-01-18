import React from 'react';
import { upperButtonProps, lineProps, forStars, dayProgress } from './training-page-interfaces';

export function TrainingCardUpperBtn(props:upperButtonProps) {
  const {id, isShown, isAnswerRight, isWordNew, line, status, classCss, iClass} = props;
  let classWhole: string = '';
  if (!isWordNew && (id === status)) {
    classWhole = classCss + ' active';
  } else {
    classWhole = classCss;
  }

  if (isShown && isAnswerRight) {
    return (<button className={classWhole}><i className={iClass}></i> {line}</button>);
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
    return (<div className={classCss}>
    <img src={line} alt="word" />
    </div>);
  };
  return null;
}

export function StarsLevelField(props:forStars) {
  const {level} = props;
  const litStar: JSX.Element = (<i className="bi bi-star-fill"></i>);
  const simpleStar: JSX.Element = (<i className="bi bi-star"></i>);

  switch (level) {
    case 5 : return (<span className="training-card-body-upper-progress-stars">
      {litStar}{litStar}{litStar}{litStar}{litStar}{litStar}
      </span>);
    case 4: return (<span className="training-card-body-upper-progress-stars">
      {simpleStar}{litStar}{litStar}{litStar}{litStar}{litStar}
      </span>);
    case 3: return (<span className="training-card-body-upper-progress-stars">
      {simpleStar}{simpleStar}{litStar}{litStar}{litStar}{litStar}
      </span>);
    case 2: return (<span className="training-card-body-upper-progress-stars">
      {simpleStar}{simpleStar}{simpleStar}{litStar}{litStar}{litStar}
      </span>);
    case 1: return (<span className="training-card-body-upper-progress-stars">
      {simpleStar}{simpleStar}{simpleStar}{simpleStar}{litStar}{litStar}
      </span>);
    default: return (<span className="training-card-body-upper-progress-stars">
      {simpleStar}{simpleStar}{simpleStar}{simpleStar}{simpleStar}{litStar}
      </span>);
  }
}

export function TrainingProgressBar(props: dayProgress) {
  const { left, right } = props;
  const barWidth: number = Math.round((left / right) * 100);
  const perCent: string = String(barWidth) + '%';

  return (<div className="training-progress-center">
    <div className="progress progress-striped active">
      <div className="bar"
        style={{width: perCent}}></div>
    </div>
    </div>)
}
