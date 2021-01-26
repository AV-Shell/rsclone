import React, { useState } from 'react';
import { forFooter, footerBtns } from './training-page-interfaces';

export default function CardFooter(props: forFooter) {
  const {
    hasShowAnswerButton, hasIntervalButtons, currentWord, updateInput, 
    hasAnswer, updateHasAnswer, intervalLevel, updateIntervalLevel, isAnswerTrue
  } = props;

  const ShowAnswerHandler = () => {
    updateHasAnswer(true);
    updateInput(currentWord);
  };

  const objForAgain: footerBtns = {
    id: "again",
    line: 'Снова',
    classCss: "training-card-footer-btn-again btn-footer",
    intervalLvl: intervalLevel,
    updateIntervalLvl: updateIntervalLevel,
    isAnswerTrue: isAnswerTrue 
  };
  const objForHard: footerBtns = {
    id: "hard",
    line: 'Сложно',
    classCss: "training-card-footer-btn-hard btn-footer",
    intervalLvl: intervalLevel,
    updateIntervalLvl: updateIntervalLevel,
    isAnswerTrue: isAnswerTrue 
  }
  const objForGood: footerBtns = {
    id: "good",
    line: 'Хорошо',
    classCss: "training-card-footer-btn-good btn-footer",
    intervalLvl: intervalLevel,
    updateIntervalLvl: updateIntervalLevel,
    isAnswerTrue: isAnswerTrue 
  }
  const objForEasy: footerBtns = {
    id: "easy",
    line: 'Легко',
    classCss: "training-card-footer-btn-easy btn-footer",
    intervalLvl: intervalLevel,
    updateIntervalLvl: updateIntervalLevel,
    isAnswerTrue: isAnswerTrue 
  }

  if (hasAnswer && hasIntervalButtons) {
      return (
      <div className="training-card-footer">
        <FooterButton {...objForAgain}/>
        <FooterButton {...objForHard}/>
        <FooterButton {...objForGood}/>
        <FooterButton {...objForEasy}/>
      </div>);
  };

  if (!hasAnswer && hasShowAnswerButton) {
    return (
    <div className="training-card-footer">
      <button className="btn-footer training-card-footer-btn-answer"
      onClick={ShowAnswerHandler}>
        <i className="bi bi-eye-fill"></i> 
        Показать ответ
      </button>
    </div>)
  } ;
  
  return (<div className="training-card-footer"></div>)
  
}

function FooterButton(props: footerBtns) {
  const {id, line, classCss, updateIntervalLvl, intervalLvl, isAnswerTrue} = props;

  const wholeClass: string = (intervalLvl === id) ? classCss + ' active' : classCss;
  // если ответил неправильно, не может их нажать
  const disabled: boolean = (!isAnswerTrue && ((id === 'easy') || (id === 'good') || (id === 'hard')));

  const IntervalButtonsHandler =(event: React.MouseEvent<HTMLButtonElement>) => {
    if (intervalLvl === id) {
      updateIntervalLvl('');
    } else {
      updateIntervalLvl(event.currentTarget.id);
    };    
  };
  
  console.log('интервальное повторение:', intervalLvl);
  return (
  <button className={wholeClass} id={id} disabled={disabled}
  onClick={IntervalButtonsHandler}>
    {line}
  </button>)
}
