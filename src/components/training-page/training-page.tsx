import React, { useState } from 'react';
import './training-page.scss';
import { trainingProps, userSettings, paginatedWord } from '../../constants/interfaces';
import levelsOfRepeat from './training-consts';
import { FILE_URL } from '../../constants/constants';
import { lineProps, forInput, cardBodyProps} from './training-page-interfaces';
import {
  TrainingCardUpperBtn, TrainingCardLineCode, TrainingCardImage, StarsLevelField, TrainingProgressBar
  } from './training-simple-functions';

function TrainingPage(props:trainingProps) {
  const [isAnswerTrue, setIsAnswerTrue] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
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

  let isNew: boolean = true;
  let wordStatus: string|undefined;
  if ('userWord' in thisWord) {
    isNew = false;
    const {userWord} = thisWord;
    wordStatus = userWord?.optional.status; // active, difficult, deleted
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
    theWord: thisWord.word,
    isTrue: isAnswerTrue,
    updateAnswer: setIsAnswerTrue
  };

  return (
    <div className="training-page">
      <div className="wrapper">
        <h2><i className="bi bi-stack"></i> Training</h2>
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
              isAnswerRight={isAnswerTrue}
              isWordNew={isNew}
              status={wordStatus}
              line={`Изучаемое`}
              classCss={"training-card-header-btn-active"}
              iClass={"bi bi-check-circle"}/>            
            <TrainingCardUpperBtn 
              id={'difficult'}
              isShown={difficultWordsButton}
              isAnswerRight={isAnswerTrue}
              isWordNew={isNew}
              status={wordStatus}
              line={`Сложное`}
              classCss={"training-card-header-btn-difficult"}
              iClass={"bi bi-exclamation-diamond"}/>
            <TrainingCardUpperBtn
              id={'deleted'}
              isShown={deleteButton}
              isAnswerRight={isAnswerTrue}
              isWordNew={false}
              status={wordStatus}
              line={`Удалить`}
              classCss={"training-card-header-btn-delete"}
              iClass={"bi bi-dash-square-dotted"}/>
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
          <div className="training-card-footer">
            <button className="training-card-footer-btn-answer">
              <i className="bi bi-eye-fill"></i> 
              Показать ответ
            </button>
          </div>
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
  const {theWord, isTrue, updateAnswer} = props;
  const [inputValue, setInputValue] = useState<string>('');

  const InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const ClickHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue('');
  };

  const KeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('enter pressed in input');
      if (inputValue.toLocaleLowerCase() === theWord) {
        console.log('that is right');
        updateAnswer(true);
        } else {
          setInputValue(theWord);
          updateAnswer(false);
          // надо сделать слово красным, показать кнопки и заблокировать ввод?
        }
      }
  };

  const cssStyle: string = isTrue ? "training-card-body-word-details-input green"
  : "training-card-body-word-details-input";

  return (<input 
    className={cssStyle} 
    type="text" 
    size={theWord.length}
    autoFocus={true} 
    spellCheck={false}
    onKeyPress={KeyPressHandler}
    value={inputValue} 
    onChange={InputChangeHandler}
    onClick={ClickHandler}/>)
}


export default TrainingPage;
