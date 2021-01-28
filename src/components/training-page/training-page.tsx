import React, { useState, useEffect } from 'react';
import './training-page.scss';
import { paginatedWord, trainingCardProps } from '../../constants/interfaces';
import { MIN_REPEAT_LEVEL } from './training-consts';
import { FILE_URL } from '../../constants/constants';
import {
  lineProps, IforInput, NextButtonProps, ForCardExamples, IlinePropsTranslation
 } from './training-page-interfaces';
import {
  TrainingCardUpperBtn, TrainingCardLineCode, TrainingCardImage, StarsLevelField,
  TrainingProgressBar, WordProgress, TrainingCardTranslationLine, soundControl
  } from './training-components/training-simple-functions';
import InputControl from './training-components/training-page-input';
import CardFooter from './training-components/training-page-card-footer';
import TrainingCardExamples from './training-components/training-card-examples-field';
import ButtonNext from './training-components/training-page-btn-next';
import { RU, EN } from './langs';

function TrainingPage(props:trainingCardProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [isAnswerTrue, setIsAnswerTrue] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [wordPosition, setWordPosition] = useState<'active' | 'deleted' | 'difficult'>('active'); // для создания объекта
  const [intervalStatus, setIntervalStatus] = useState<string>(''); // для подсчета интервала
  const [intervalLevel, setIntervalLevel] = useState<number>(MIN_REPEAT_LEVEL); // прокидывать в футер карточки
  const [isNew, setIsNew] = useState<boolean>(true); // чтобы брать настройки, если слово не новое
  const [counter, setCounter] = useState<number>(0);
  const [success, setSuccess] = useState<number>(0);
  const [isIntervalUsed, setIntervalUsed] = useState<boolean>(true);

  const trainingDay: number = Date.now();
  let nextTrainingDay: number = 0;

  console.log(props);
  const {
    word, settings, wordNumber, totalWords, getAnswer, isLanguageRU, isMute
  } = props;
  const { optional } = settings;
  const [isSoundOn, setIsSoundOn] = useState<boolean>(!isMute);

  let currentLang = isLanguageRU ? RU : EN;
  
  useEffect(() => {
    setIsAnswerTrue(false);
    setIsAnswered(false);
    setInputValue('');
    setWordPosition('active');
    setIntervalStatus('');
    setIntervalLevel(0);
    setIsNew(true);
    setCounter(0);
    setSuccess(0);
    setIntervalUsed(true)
    console.log('in the useEffect');
  }, [ word ]);

  useEffect(() => {
    currentLang = isLanguageRU ? RU : EN;
  }, [ isLanguageRU ]);
  
  
  const currentCard: number = wordNumber;
  let thisWord: paginatedWord;
  thisWord = word;
  const {group} = thisWord;
 
  const {
    answerButton, autoSound, cardExample, cardExampleTranslation,
    cardWordPronunciation, cardExplanation, cardExplanationTranslation, 
    cardImage, cardTranscription, cardExplanationTranslationAfter, cardExampleTranslationAfter,
    cardTranslation, cardTranslationAfterSuccess, statusButtons, feedbackButtons,
  } = optional;

  const allTrainingCards: number = totalWords;
  let firstAppearance: number = trainingDay;

  if (('userWord' in thisWord) && (isNew)) {
    setIsNew(false);
    const {userWord} = thisWord;
    const wordStatus: 'active' | 'deleted' | 'difficult' = userWord!.optional.status; // active, difficult, deleted
    setWordPosition(wordStatus);
    firstAppearance = userWord!.optional.firstAppearance;
    setIntervalLevel(userWord!.optional.level);
    setCounter(userWord!.optional.counter);
    setSuccess(userWord!.optional.success);
    console.log(`counter: ${counter}, success: ${success}`);

    nextTrainingDay = userWord!.optional.nextRepeat;
    const nextDate = new Date(nextTrainingDay).setHours(0, 0, 0, 0);
    console.log(nextDate);
    const thisDay = new Date(trainingDay).setHours(0, 0, 0, 0);
    console.log(thisDay);
    console.log(nextDate > thisDay);
    if (nextDate > thisDay) {
      setIntervalUsed(false);
    };

  };

  const imgURL: string = FILE_URL + '/' + thisWord.image;
  const audioWordURL: string = FILE_URL + '/' + thisWord.audio;
  const audioExampleURL: string = FILE_URL + '/' + thisWord.audioExample;
  const audioMeaningURL: string = FILE_URL + '/' + thisWord.audioMeaning;

  useEffect(() => {
    setIsSoundOn(!isMute);
    soundControl();
  }, [ isMute ]);

  const objForTranslation: IlinePropsTranslation = {
    isTrue: cardTranslation,
    isShownAfter: cardTranslationAfterSuccess,
    isAnswered: isAnswered,
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

  const objForInput: IforInput = {
    value: inputValue,
    updateValue: setInputValue,
    theWord: thisWord.word,
    isAnswerSet: isAnswered,
    updateAnswerSet: setIsAnswered,
    isTrue: isAnswerTrue,
    updateAnswer: setIsAnswerTrue,
    isSoundOn: isSoundOn,
    wordURL: audioWordURL,
    isAutoPlayOn: autoSound,
    playExample: cardExample,
    playMeaning: cardExplanation,
    counter: counter,
    success: success,
    updateCounter: setCounter,
    updateSuccess: setSuccess,
    isSoundBtnShown: cardWordPronunciation,
    intervalLevel: intervalLevel,
    updateIntervalLevel: setIntervalLevel,
    isIntervalUsed: isIntervalUsed
  };
  
  const objForExamplesPart: ForCardExamples = {
    isExampleShown: cardExample,
    isExampleTranslationShown: cardExampleTranslation,
    isExampleTranslationAfter: cardExampleTranslationAfter,
    isMeaningShown: cardExplanation,
    isMeaningTranslationShown: cardExplanationTranslation,
    isMeaningTranslationAfter: cardExplanationTranslationAfter,
    isSoundOn: isSoundOn,
    isAnswered: isAnswered,
    exampleURL: audioExampleURL,
    meaningURL: audioMeaningURL,
    exampleString: thisWord.textExample,
    meaningString: thisWord.textMeaning,
    exampleTranslationString: thisWord.textExampleTranslate,
    meaningTranslationString: thisWord.textMeaningTranslate
  }

  const objForNextButton: NextButtonProps = {
    isShown: isAnswered,
    isAnswerTrue: isAnswerTrue,
    levelForRepeat: intervalLevel,
    levelStatus: intervalStatus,
    wordID: word._id,
    getAnswer: getAnswer,
    wordStatus: wordPosition,
    firstAppearance: firstAppearance,
    counter: counter,
    success: success,
    language: currentLang,
    nextTrainingDay: nextTrainingDay,
    isIntervalUsed: isIntervalUsed
  }

  return (
    <div className="training-page">
      <div className="wrapper">
        <div className="wrapper-upper">
          <h1><i className="bi bi-stack"></i>&nbsp;{currentLang.trainingHeader}</h1>
          <ButtonNext {...objForNextButton}/>
        </div>
        <div className="training-progress">
          <span className="training-progress-left">1</span>
          <TrainingProgressBar left={currentCard} right={allTrainingCards}/>
          <span className="training-progress-right">{allTrainingCards}</span>
        </div>
        <div className="training-card">
          <div className="training-card-header">
            <button className="training-card-header-btn-keyboard upper-btns">
              <i className="bi bi-keyboard"></i>
            </button>
            <TrainingCardUpperBtn 
              id={'active'}
              isShown={statusButtons}
              isAnswerRight={isAnswered}
              isWordNew={isNew}
              status={wordPosition}
              line={currentLang.activeButton}
              classCss={"training-card-header-btn-active upper-btns"}
              iClass={"bi bi-check-circle"}
              setStatusForObj={setWordPosition}/>            
            <TrainingCardUpperBtn 
              id={'difficult'}
              isShown={statusButtons}
              isAnswerRight={isAnswered}
              isWordNew={isNew}
              status={wordPosition}
              line={currentLang.difficultButton}
              classCss={"training-card-header-btn-difficult upper-btns"}
              iClass={"bi bi-exclamation-diamond"}
              setStatusForObj={setWordPosition}/>
            <TrainingCardUpperBtn
              id={'deleted'}
              isShown={statusButtons}
              isAnswerRight={isAnswered}
              isWordNew={false}
              status={wordPosition}
              line={currentLang.deleteButton}
              classCss={"training-card-header-btn-delete upper-btns"}
              iClass={"bi bi-dash-square-dotted"}
              setStatusForObj={setWordPosition}/>
          </div>
          <div className="training-card-body">
            <div className="training-card-body-upper">
              <hr />
              <div className="training-card-body-upper-progress">
                <WordProgress level={intervalLevel}
                  language={currentLang} />
                <StarsLevelField level={group} />
              </div>
            </div>
            <div className="training-card-body-word">
              <div className="training-card-body-word-details">
                <p>{currentLang.beforeInput}</p>
                <InputControl {...objForInput} />
                <TrainingCardTranslationLine {...objForTranslation}/>
                <TrainingCardLineCode {...objForTranscription}/>
              </div>
              <TrainingCardImage {...objForImage}/>
            </div>
            <TrainingCardExamples {...objForExamplesPart}/>
          </div>
          <CardFooter currentWord={thisWord.word}
            hasShowAnswerButton={answerButton}
            hasIntervalButtons={feedbackButtons}
            updateInput={setInputValue}
            hasAnswer={isAnswered}
            updateHasAnswer={setIsAnswered}
            intervalLevel={intervalStatus}
            updateIntervalLevel={setIntervalStatus}
            isAnswerTrue={isAnswerTrue}
            language={currentLang} />
        </div>
      </div>
    </div>
  );
}

export default TrainingPage;
