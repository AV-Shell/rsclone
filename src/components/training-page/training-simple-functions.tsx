import React from 'react';
import {upperButtonProps, lineProps } from './training-page-interfaces';

export function TrainingCardUpperBtn(props:upperButtonProps) {
  const {isTrue, line, classCss, iClass} = props;
  if (isTrue) {
    return (<button className={classCss}><i className={iClass}></i> {line}</button>);
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
