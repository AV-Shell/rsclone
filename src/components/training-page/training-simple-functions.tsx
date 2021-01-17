import React from 'react';
import {upperButtonProps, lineProps } from './training-page-interfaces';

export function TrainingCardUpperBtn(props:upperButtonProps) {
  const {id, isTrue, isAnswerRight, isWordNew, line, status, classCss, iClass} = props;
  let classWhole: string = '';
  if (!isWordNew && (id === status)) {
    classWhole = classCss + ' active';
  } else {
    classWhole = classCss;
  }

  if (isTrue && isAnswerRight) {
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
