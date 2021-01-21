import React, { useState } from 'react';
import './training-page.scss';
import { trainingProps, userSettings, paginatedWord } from '../../constants/interfaces';
import levelsOfRepeat from './training-consts';
import { FILE_URL } from '../../constants/constants';
import { lineProps, forInput, forNextBtn, IconForSound } from './training-page-interfaces';
import {
  TrainingCardUpperBtn, TrainingCardLineCode, TrainingCardImage, StarsLevelField, TrainingProgressBar
  } from './training-simple-functions';
import SentenceWrapper from '../slave-components/sentence-wrapper';
import CardFooter from './training-page-card-footer';

interface sentenceWrapperProps{
  sentence:string, 
  classCss:string, 
  openTag:'<b>'|'<i>', 
  closeTag:'</b>'|'</i>',
}

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
  const currentCard: number = 9;
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

  const playWord = async () => {
    const soundObject = new Audio(audioWordURL);
    await soundObject.load();
    soundObject.play();
  }
  const playExample = async () => {
    const soundObject = new Audio(audioExampleURL);
    await soundObject.load();
    soundObject.play();
  }
  const playMeaning = async () => {
    const soundObject = new Audio(audioMeaningURL);
    await soundObject.load();
    soundObject.play();
  }

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

  const objForExample: sentenceWrapperProps = {
    sentence: thisWord.textExample,
    classCss: "sentence-eng",
    openTag:'<b>', 
    closeTag:'</b>'
  };

  const objForExampleTranslation: lineProps = {
    isTrue: cardExampleTranslation,
    line: thisWord.textExampleTranslate,
    classCss: "sentence-ru"
  };

  const objForMeaning: sentenceWrapperProps = {
    sentence: thisWord.textMeaning,
    classCss: "meaning-eng",
    openTag:'<i>', 
    closeTag:'</i>'
  };

  const objForMeaningTranslation: lineProps = {
    isTrue: cardExplanationTranslation,
    line: thisWord.textMeaningTranslate,
    classCss: "meaning-ru"
  };

  const objForInput: forInput = {
    value: inputValue,
    updateValue: setInputValue,
    theWord: thisWord.word,
    isAnswerSet: isAnswered,
    updateAnswerSet: setIsAnswered,
    isTrue: isAnswerTrue,
    updateAnswer: setIsAnswerTrue,
    isSoundOn: isSoundOn,
    wordSound: playWord
  };

  return (
    <div className="training-page">
      <div className="wrapper">
        <div className="wrapper-upper">
          <h1><i className="bi bi-stack"></i> Training</h1>
          <ButtonNext isShown={isAnswered}/>
        </div>
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
              <SoundOnSentences isSoundOn={isSoundOn}
                sound={playExample}
                forCSS="example-sound" />
                <SoundOnSentences isSoundOn={isSoundOn}
                sound={playMeaning}
                forCSS="meaning-sound" />
              <SentenceWrapper {...objForExample}/>
              <TrainingCardLineCode {...objForExampleTranslation}/>
              <SentenceWrapper {...objForMeaning}/>
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

function SoundOnSentences(props: IconForSound) {
  const {isSoundOn, sound, forCSS} = props;

  const classCSS: string = isSoundOn ? `bi bi-volume-up-fill ${forCSS}` : `bi bi-volume-mute-fill ${forCSS}`;

  const SoundHandler = () => {
    if (isSoundOn) {
      sound().catch(() => true);  
    }
  }
  return (
    <i className={classCSS} onClick={SoundHandler}></i>
  )
}

function ButtonNext(props: forNextBtn) {
  const {isShown} = props;
  if (isShown) {
    return (<button className="button-next">Дальше</button>)
  } else {
    return null;
  }  
}

function InputControl(props: forInput) {
  const {
    value, updateValue, theWord, isAnswerSet, updateAnswerSet, isTrue, updateAnswer, isSoundOn, wordSound
  } = props;
  
  const audioIcon: string = isSoundOn ? "bi bi-volume-up-fill" : "bi bi-volume-mute-fill";

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
        }
      }
  };

  const SoundHandler =() => {
    if (isSoundOn) {
      wordSound().catch(() => true);  
    }
  }

  if (isAnswerSet) {
    console.log('isAnswerSet true');
    const cssStyle: string = isTrue ? "training-card-body-word-details-field-input green"
      : "training-card-body-word-details-field-input red";
    return (
    <div className="training-card-body-word-details-field">
      <i className={audioIcon} onClick={SoundHandler}></i>
      <input 
        className={cssStyle} 
        type="text" 
        size={theWord.length}
        autoFocus={false} 
        spellCheck={false}
        value={value}
        disabled={true}/>
    </div>)
  } 
  console.log('isAnswerSet false');
  return (
  <div className="training-card-body-word-details-field">
    <i className={audioIcon} onClick={SoundHandler}></i>
    <input 
      className="training-card-body-word-details-field-input" 
      type="text" 
      size={theWord.length}
      autoFocus={true} 
      spellCheck={false}
      onKeyPress={KeyPressHandler}
      value={value} 
      onChange={InputChangeHandler}
      onClick={ClickHandler}/>
  </div>)
}

export default TrainingPage;
