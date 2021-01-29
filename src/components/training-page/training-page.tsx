import React, { useState, useEffect, useMemo } from 'react';
import './training-page.scss';
import { paginatedWord, trainingCardProps } from '../../constants/interfaces';
import { MIN_REPEAT_LEVEL } from './training-consts';
import { FILE_URL } from '../../constants/constants';
import {
  lineProps, IforInput, NextButtonProps, ForCardExamples, IlinePropsTranslation, TsoundsObject
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
import WordStarsLevel from '../slave-components/word-stars-level';

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
  const audioWordURL: string = useMemo(() => (FILE_URL + '/' + thisWord.audio), [thisWord.audio]);
  const audioExampleURL: string = useMemo(() => (FILE_URL + '/' + thisWord.audioExample), [thisWord.audioExample]);
  const audioMeaningURL: string = useMemo(() => (FILE_URL + '/' + thisWord.audioMeaning), [thisWord.audioMeaning]);
  // как-то надо нижележащее тоже в юзМемо
  // упс, теперь снова на значок рядом с инпутом воспроизводится всё
  const wordSound: HTMLAudioElement = useMemo(() => (new Audio(audioWordURL)), [audioWordURL]);
  const exampleSound: HTMLAudioElement = useMemo(() => (new Audio(audioExampleURL)), [audioExampleURL]);
  const meaningSound: HTMLAudioElement = useMemo(() => (new Audio(audioMeaningURL)), [audioMeaningURL]);
  const allSounds: TsoundsObject = useMemo(() =>({
    'wordSound': wordSound,
    'exampleSound': exampleSound,
    'meaningSound': meaningSound
  }), [wordSound, exampleSound, meaningSound]);
  
  useEffect(() => {
    setIsSoundOn(!isMute);
    
    soundControl(allSounds);
  }, [ isMute, allSounds ]);

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
    isIntervalUsed: isIntervalUsed,
    soundsObject: allSounds
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
    exampleSound: exampleSound,
    meaningSound: meaningSound,
    soundsObject: allSounds,
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
    isIntervalUsed: isIntervalUsed,
    stopSoundsObj: allSounds
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
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-keyboard" viewBox="0 0 16 16">
              <path d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2z"/>
              <path d="M13 10.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm0-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5 0A.25.25 0 0 1 8.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 8 8.75v-.5zm2 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-.5zm1 2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5-2A.25.25 0 0 1 6.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 6 8.75v-.5zm-2 0A.25.25 0 0 1 4.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 4 8.75v-.5zm-2 0A.25.25 0 0 1 2.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2 8.75v-.5zm11-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0A.25.25 0 0 1 9.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 9 6.75v-.5zm-2 0A.25.25 0 0 1 7.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 7 6.75v-.5zm-2 0A.25.25 0 0 1 5.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 5 6.75v-.5zm-3 0A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 6.75v-.5zm0 4a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm2 0a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5.5a.25.25 0 0 1-.25-.25v-.5z"/>
            </svg>
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
                <WordStarsLevel level={group} />
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
