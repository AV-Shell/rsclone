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

  if (hasAnswer) {
    if (hasIntervalButtons) {
      return (<div className="training-card-footer">
        <FooterButton id={"again"}
          line={'Снова'}
          classCss={"training-card-footer-btn-again"}
          intervalLvl={intervalLevel}
          updateIntervalLvl={updateIntervalLevel}
          isAnswerTrue={isAnswerTrue}/>
        <FooterButton id={"hard"}
          line={'Сложно'}
          classCss={"training-card-footer-btn-hard"}
          intervalLvl={intervalLevel}
          updateIntervalLvl={updateIntervalLevel}
          isAnswerTrue={isAnswerTrue}/>
        <FooterButton id={"good"}
          line={'Хорошо'}
          classCss={"training-card-footer-btn-good"}
          intervalLvl={intervalLevel}
          updateIntervalLvl={updateIntervalLevel}
          isAnswerTrue={isAnswerTrue}/>
          <FooterButton id={"easy"}
          line={'Легко'}
          classCss={"training-card-footer-btn-easy"}
          intervalLvl={intervalLevel}
          updateIntervalLvl={updateIntervalLevel}
          isAnswerTrue={isAnswerTrue}/>
      </div>);
    } else {
      return (<div className="training-card-footer"></div>)
    }
    
  } else if (hasShowAnswerButton) {
    return (<div className="training-card-footer">
    <button className="training-card-footer-btn-answer"
    onClick={ShowAnswerHandler}>
      <i className="bi bi-eye-fill"></i> 
      Показать ответ
    </button>
    </div>)
  } else {
    return (<div className="training-card-footer"></div>)
  }
}

function FooterButton(props: footerBtns) {
  const {id, line, classCss, updateIntervalLvl, intervalLvl, isAnswerTrue} = props;

  const wholeClass: string = (intervalLvl === id) ? classCss + ' active' : classCss;
  const disabled: boolean = (!isAnswerTrue && ((id === 'easy') || (id === 'good'))) ?
    true : false;

  const IntervalButtonsHandler =(event: React.MouseEvent<HTMLButtonElement>) => {
    updateIntervalLvl(event.currentTarget.id);
    console.log(event.currentTarget.id);
  }

  return (<button className={wholeClass} id={id} disabled={disabled}
  onClick={IntervalButtonsHandler}>
  {line}
  </button>)
}
