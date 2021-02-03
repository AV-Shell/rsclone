import React from 'react';
import { forFooter, footerBtns } from '../training-page-interfaces';

const CardFooter: React.FC<forFooter> = (props: forFooter) => {
  const {
    hasShowAnswerButton, hasIntervalButtons, currentWord, updateInput,
    hasAnswer, updateHasAnswer, intervalLevel, updateIntervalLevel, isAnswerTrue, language,
  } = props;

  const ShowAnswerHandler = () => {
    updateHasAnswer(true);
    updateInput(currentWord);
  };

  const objForAgain: footerBtns = {
    id: 'again',
    line: language.againButton,
    classCss: 'training-card-footer-btn-again btn-footer',
    intervalLvl: intervalLevel,
    updateIntervalLvl: updateIntervalLevel,
    isAnswerTrue,
  };
  const objForHard: footerBtns = {
    id: 'hard',
    line: language.hardButton,
    classCss: 'training-card-footer-btn-hard btn-footer',
    intervalLvl: intervalLevel,
    updateIntervalLvl: updateIntervalLevel,
    isAnswerTrue,
  };
  const objForGood: footerBtns = {
    id: 'good',
    line: language.goodButton,
    classCss: 'training-card-footer-btn-good btn-footer',
    intervalLvl: intervalLevel,
    updateIntervalLvl: updateIntervalLevel,
    isAnswerTrue,
  };
  const objForEasy: footerBtns = {
    id: 'easy',
    line: language.easyButton,
    classCss: 'training-card-footer-btn-easy btn-footer',
    intervalLvl: intervalLevel,
    updateIntervalLvl: updateIntervalLevel,
    isAnswerTrue,
  };

  if (hasAnswer && hasIntervalButtons) {
    return (
      <div className="training-card-footer">
        <FooterButton {...objForAgain} />
        <FooterButton {...objForHard} />
        <FooterButton {...objForGood} />
        <FooterButton {...objForEasy} />
      </div>
    );
  }

  if (!hasAnswer && hasShowAnswerButton) {
    return (
      <div className="training-card-footer">
        <button
          type="button"
          className="btn-footer training-card-footer-btn-answer"
          onClick={ShowAnswerHandler}
        >
          <i className="bi bi-eye-fill" />
          &nbsp;
          {language.showAnswer}
        </button>
      </div>
    );
  }

  return (
    <div className="training-card-footer" />
  );
};

function FooterButton(props: footerBtns) {
  const {
    id, line, classCss, updateIntervalLvl, intervalLvl, isAnswerTrue,
  } = props;

  const wholeClass: string = (intervalLvl === id) ? `${classCss} active` : classCss;
  const disabled: boolean = (!isAnswerTrue && ((id === 'easy') || (id === 'good') || (id === 'hard')));

  const IntervalButtonsHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (intervalLvl === id) {
      updateIntervalLvl('');
    } else {
      updateIntervalLvl(event.currentTarget.id);
    }
  };

  return (
    <button
      type="button"
      className={wholeClass}
      id={id}
      disabled={disabled}
      onClick={IntervalButtonsHandler}
    >
      {line}
    </button>
  );
}

export default CardFooter;
