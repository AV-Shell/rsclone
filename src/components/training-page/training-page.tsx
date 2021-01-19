import React, { useState } from 'react';
import './training-page.scss';
import { trainingProps, userSettings, paginatedWord } from '../../constants/interfaces';
import levelsOfRepeat from './training-consts';
import { FILE_URL } from '../../constants/constants';
import { lineProps, forInput } from './training-page-interfaces';
import {
  TrainingCardUpperBtn, TrainingCardLineCode, TrainingCardImage, StarsLevelField, TrainingProgressBar
  } from './training-simple-functions';
import CardFooter from './training-page-card-footer';

function TrainingPage(props:trainingProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [isAnswerTrue, setIsAnswerTrue] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [wordPosition, setWordPosition] = useState<string>(''); // для создания объекта
  const [intervalStatus, setIntervalStatus] = useState<string>(''); // для подсчета интервала
  const [isNew, setIsNew] = useState<boolean>(true);

  const trainingDay: number = Date.now();
  console.log(props);
  const {
    userWords, apiService, settings, statistic, updateSettings, updateStatistic, updateUserWords
  } = props;
  if ((props.settings === null) || (props.statistic === null) || (props.userWords=== null)) {
    return <div className="training-page"></div>
  };
  const { optional } = props.settings;
  const trainingDayWords = userWords ? userWords : [];
  const currentCard: number = 4;
  let thisWord: paginatedWord;
  thisWord = trainingDayWords[currentCard];
  const {group} = thisWord;
 
  const {
    answerButton, autoSound, cardExample, cardExampleTranslation,
    cardExplanation, cardExplanationTranslation, cardImage, cardTranscription,
    cardTranslation, cardTranslationAfterSuccess, cardsPerDay, commonProgress,
    deleteButton, difficultWordsButton, feedbackButtons, isSoundOn,
    newWordsPerDay, repeatWordsPerDay,
  } = optional;

  const allTrainingCards: number = cardsPerDay;

  
  if (('userWord' in thisWord) && (isNew)) {
    setIsNew(false);
    const {userWord} = thisWord;
    const wordStatus: string = userWord!.optional.status; // active, difficult, deleted
    setWordPosition(wordStatus);
  };

  const imgURL: string = FILE_URL + '/' + thisWord.image;
  const audioWordURL: string = FILE_URL + '/' + thisWord.audio;
  const audioExampleURL: string = FILE_URL + '/' + thisWord.audioExample;
  const audioMeaningURL: string = FILE_URL + '/' + thisWord.audioMeaning;

  const objForTranslation: lineProps = {
    isTrue: cardTranslation,
    line: thisWord.wordTranslate,
    classCss: "training-card-body-word-details-translation"
  };

  const objForTranscription: lineProps = {
    isTrue: cardTranscription,
    line: thisWord.transcription,
    classCss: "training-card-body-word-details-transcription"
  };

  const objForImage: lineProps = {
    isTrue: cardImage,
    line: imgURL,
    classCss: "training-card-body-word-img"
  };

  const objForExample: lineProps = {
    isTrue: cardExample,
    line: thisWord.textExample,
    classCss: "training-card-body-sentence-eng"
  };

  const objForExampleTranslation: lineProps = {
    isTrue: cardExampleTranslation,
    line: thisWord.textExampleTranslate,
    classCss: "training-card-body-sentence-ru"
  };

  const objForMeaning: lineProps = {
    isTrue: cardExplanation,
    line: thisWord.textMeaning,
    classCss: "training-card-body-explanation-eng"
  };

  const objForMeaningTranslation: lineProps = {
    isTrue: cardExplanationTranslation,
    line: thisWord.textMeaningTranslate,
    classCss: "training-card-body-explanation-ru"
  };

  const objForInput: forInput = {
    value: inputValue,
    updateValue: setInputValue,
    theWord: thisWord.word,
    isAnswerSet: isAnswered,
    updateAnswerSet: setIsAnswered,
    isTrue: isAnswerTrue,
    updateAnswer: setIsAnswerTrue
  };

  return (
    <div className="training-page">
      <div className="wrapper">
        <h1><i className="bi bi-stack"></i> Training</h1>
        <div className="training-progress">
          <span className="training-progress-left">1</span>
          <TrainingProgressBar left={currentCard} right={allTrainingCards}/>
          <span className="training-progress-right">{allTrainingCards}</span>
        </div>
        <div className="training-card">
          <div className="training-card-header">
            <button className="training-card-header-btn-keyboard">
              <i className="bi bi-keyboard"></i>
            </button>
            <TrainingCardUpperBtn 
              id={'active'}
              isShown={difficultWordsButton}
              isAnswerRight={isAnswered}
              isWordNew={isNew}
              status={wordPosition}
              line={`Изучаемое`}
              classCss={"training-card-header-btn-active"}
              iClass={"bi bi-check-circle"}
              setStatusForObj={setWordPosition}/>            
            <TrainingCardUpperBtn 
              id={'difficult'}
              isShown={difficultWordsButton}
              isAnswerRight={isAnswered}
              isWordNew={isNew}
              status={wordPosition}
              line={`Сложное`}
              classCss={"training-card-header-btn-difficult"}
              iClass={"bi bi-exclamation-diamond"}
              setStatusForObj={setWordPosition}/>
            <TrainingCardUpperBtn
              id={'deleted'}
              isShown={deleteButton}
              isAnswerRight={isAnswered}
              isWordNew={false}
              status={wordPosition}
              line={`Удалить`}
              classCss={"training-card-header-btn-delete"}
              iClass={"bi bi-dash-square-dotted"}
              setStatusForObj={setWordPosition}/>
          </div>
          <div className="training-card-body">
            <div className="training-card-body-upper">
              <hr />
              <div className="training-card-body-upper-progress">
                <span className="word-progress">word-progress<small>тут чо-то написано</small></span>
                <StarsLevelField level={group} />
              </div>
            </div>
            <div className="training-card-body-word">
              <div className="training-card-body-word-details">
                <p>Введите английское слово</p>
                <InputControl {...objForInput} />
                <TrainingCardLineCode {...objForTranslation}/>
                <TrainingCardLineCode {...objForTranscription}/>
              </div>
              <TrainingCardImage {...objForImage}/>
            </div>
            <div className="training-card-body-examples">
              <TrainingCardLineCode {...objForExample}/>
              <TrainingCardLineCode {...objForExampleTranslation}/>
              <TrainingCardLineCode {...objForMeaning}/>
              <TrainingCardLineCode {...objForMeaningTranslation}/>
            </div>
          </div>
          <CardFooter currentWord={thisWord.word}
            hasShowAnswerButton={answerButton}
            hasIntervalButtons={feedbackButtons}
            updateInput={setInputValue}
            hasAnswer={isAnswered}
            updateHasAnswer={setIsAnswered}
            intervalLevel={intervalStatus}
            updateIntervalLevel={setIntervalStatus}
            isAnswerTrue={isAnswerTrue} />
        </div>
      </div>
    </div>
  );
}

// это если ответил правильно
  // if (autoSound) {
        //   const audioWord = new Audio(audioWordURL);
        //   const audioWordExample = new Audio(audioExampleURL);
        //   const audioWordMeaning = new Audio(audioMeaningURL);
        //   audioWord.play();
          // audioWordExample.play();
          // audioWordMeaning.play();

          //сделать константу тру/фолс и менять компоненты в зависимости от?

// при смене страницы остается тру для инпута и старое валью его
function InputControl(props: forInput) {
  const {value, updateValue, theWord, isAnswerSet, updateAnswerSet, isTrue, updateAnswer} = props;
  

  const InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    updateValue(event.target.value);
  };

  const ClickHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    updateValue('');
  };

  const KeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateAnswerSet(true);
      console.log('enter pressed in input');
      if (value.toLocaleLowerCase() === theWord) {
        console.log('that is right');
        updateAnswer(true);
        updateAnswerSet(true);
        } else {
          updateValue(theWord);
          updateAnswer(false);
          updateAnswerSet(true);
          // надо сделать слово красным, показать кнопки и заблокировать ввод?
        }
      }
  };

  if (isAnswerSet) {
    console.log('isAnswerSet true');
    const cssStyle: string = isTrue ? "training-card-body-word-details-input green"
      : "training-card-body-word-details-input red";
    return (<input 
      className={cssStyle} 
      type="text" 
      size={theWord.length}
      autoFocus={false} 
      spellCheck={false}
      value={value}
      disabled={true}/>)
  } else {
    console.log('isAnswerSet false');
    return (<input 
      className="training-card-body-word-details-input" 
      type="text" 
      size={theWord.length}
      autoFocus={true} 
      spellCheck={false}
      onKeyPress={KeyPressHandler}
      value={value} 
      onChange={InputChangeHandler}
      onClick={ClickHandler}/>)
  }
  
}


export default TrainingPage;
