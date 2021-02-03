import React, { useState, useEffect, useMemo } from 'react';
import './training-page.scss';
import { paginatedWord, trainingCardProps } from '../../constants/interfaces';
import { MIN_REPEAT_LEVEL } from './training-consts';
import { FILE_URL } from '../../constants/constants';
import {
  lineProps, IforInput, NextButtonProps, ForCardExamples, IlinePropsTranslation, TsoundsObject,
} from './training-page-interfaces';
import {
  TrainingCardUpperBtn, TrainingCardLineCode, TrainingCardImage,
  TrainingProgressBar, WordProgress, TrainingCardTranslationLine, soundControl,
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
  const [wordPosition, setWordPosition] = useState<'active' | 'deleted' | 'difficult'>('active');
  const [intervalStatus, setIntervalStatus] = useState<string>('');
  const [intervalLevel, setIntervalLevel] = useState<number>(MIN_REPEAT_LEVEL);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [counter, setCounter] = useState<number>(0);
  const [success, setSuccess] = useState<number>(0);
  const [isIntervalUsed, setIntervalUsed] = useState<boolean>(true);
  const [isAutoFocus, setIsAutoFocus] = useState<boolean>(true);

  const trainingDay: number = Date.now();
  let nextTrainingDay: number = 0;

  console.log(props);
  const {
    word, settings, wordNumber, totalWords, getAnswer, isLanguageRU, isMute,
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
    setIntervalUsed(true);
    setIsAutoFocus(true);
    console.log(isIntervalUsed);
  }, [word]);

  useEffect(() => {
    currentLang = isLanguageRU ? RU : EN;
  }, [isLanguageRU]);

  const currentCard: number = wordNumber;
  const thisWord: paginatedWord = word;
  const { group } = thisWord;

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
    const { userWord } = thisWord;
    const wordStatus: 'active' | 'deleted' | 'difficult' = userWord.optional.status;
    setWordPosition(wordStatus);
    firstAppearance = userWord.optional.firstAppearance;
    setIntervalLevel(userWord.optional.level);
    setCounter(userWord.optional.counter);
    setSuccess(userWord.optional.success);

    nextTrainingDay = userWord.optional.nextRepeat;
    const nextDate = new Date(nextTrainingDay).setHours(0, 0, 0, 0);

    const thisDay = new Date(trainingDay).setHours(0, 0, 0, 0);
    if (nextDate > thisDay) {
      setIntervalUsed(false);
    }
    console.log(isIntervalUsed);
  }

  const imgURL: string = `${FILE_URL}/${thisWord.image}`;
  const audioWordURL: string = useMemo(() => (`${FILE_URL}/${thisWord.audio}`), [thisWord.audio]);
  const audioExampleURL: string = useMemo(() => (`${FILE_URL}/${thisWord.audioExample}`), [thisWord.audioExample]);
  const audioMeaningURL: string = useMemo(() => (`${FILE_URL}/${thisWord.audioMeaning}`), [thisWord.audioMeaning]);

  const wordSound: HTMLAudioElement = useMemo(() => (new Audio(audioWordURL)), [audioWordURL]);
  const exampleSound: HTMLAudioElement = useMemo(() => (new Audio(audioExampleURL)), [audioExampleURL]);
  const meaningSound: HTMLAudioElement = useMemo(() => (new Audio(audioMeaningURL)), [audioMeaningURL]);

  const allSounds: TsoundsObject = useMemo(() => ({
    wordSound,
    meaningSound,
    exampleSound,
  }), [wordSound, exampleSound, meaningSound]);

  useEffect(() => {
    setIsSoundOn(!isMute);

    soundControl(allSounds).catch((e) => true);
  }, [isMute, allSounds]);

  useEffect(() => {
    console.log('smth');
    return () => {
      console.log('sounds should be silenced', allSounds);
      soundControl(allSounds).catch((e) => true);
    };
  }, []);

  const objForTranslation: IlinePropsTranslation = {
    isTrue: cardTranslation,
    isShownAfter: cardTranslationAfterSuccess,
    isAnswered,
    line: thisWord.wordTranslate,
    classCss: 'training-card-body-word-details-translation',
  };

  const objForTranscription: lineProps = {
    isTrue: cardTranscription,
    line: thisWord.transcription,
    classCss: 'training-card-body-word-details-transcription',
  };

  const objForImage: lineProps = {
    isTrue: cardImage,
    line: imgURL,
    classCss: 'training-card-body-word-img',
  };

  const objForInput: IforInput = {
    value: inputValue,
    updateValue: setInputValue,
    theWord: thisWord.word,
    isAnswerSet: isAnswered,
    updateAnswerSet: setIsAnswered,
    isTrue: isAnswerTrue,
    updateAnswer: setIsAnswerTrue,
    isSoundOn,
    isAutoPlayOn: autoSound,
    playExample: cardExample,
    playMeaning: cardExplanation,
    counter,
    success,
    updateCounter: setCounter,
    updateSuccess: setSuccess,
    isSoundBtnShown: cardWordPronunciation,
    intervalLevel,
    updateIntervalLevel: setIntervalLevel,
    isIntervalUsed,
    soundsObject: allSounds,
    isAutoFocus,
    updateAutoFocus: setIsAutoFocus,
  };

  const objForExamplesPart: ForCardExamples = {
    isExampleShown: cardExample,
    isExampleTranslationShown: cardExampleTranslation,
    isExampleTranslationAfter: cardExampleTranslationAfter,
    isMeaningShown: cardExplanation,
    isMeaningTranslationShown: cardExplanationTranslation,
    isMeaningTranslationAfter: cardExplanationTranslationAfter,
    isSoundOn,
    isAnswered,
    exampleSound: allSounds.exampleSound,
    meaningSound: allSounds.meaningSound,
    soundsObject: allSounds,
    exampleString: thisWord.textExample,
    meaningString: thisWord.textMeaning,
    exampleTranslationString: thisWord.textExampleTranslate,
    meaningTranslationString: thisWord.textMeaningTranslate,
  };

  const objForNextButton: NextButtonProps = {
    isShown: isAnswered,
    isAnswerTrue,
    levelForRepeat: intervalLevel,
    levelStatus: intervalStatus,
    wordID: word._id,
    getAnswer,
    wordStatus: wordPosition,
    firstAppearance,
    counter,
    success,
    language: currentLang,
    nextTrainingDay,
    isIntervalUsed,
    stopSoundsObj: allSounds,
    updateInterval: setIntervalUsed,
  };

  return (
    <div className="training-page">
      <div className="wrapper">
        <div className="wrapper-upper">
          <h1 className="training-page-title">
            <svg
              width="26"
              height="26"
              viewBox="0 0 34 34"
              fill="#181C32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.4337 16.2929L24.0833 20.6433L13.3567 9.91671L17.7071 5.56631L18.4142
                4.85921L17.7071 4.1521L15.6813 2.12627L14.9741 1.41916L14.267 2.12627L12.9483 3.44499L11.6296
                2.12627L10.9225 1.41916L10.2154 2.12627L7.89081 4.45083L6.57209 3.1321L5.86498 2.42499L5.15787
                3.1321L3.13204 5.15793L2.42493 5.86504L3.13204 6.57215L4.45077 7.89087L2.12621 10.2154L1.4191
                10.9225L2.12621 11.6296L3.44493 12.9484L2.12621 14.2671L1.4191 14.9742L2.12621 15.6813L4.15204
                17.7071L4.85915 18.4143L5.56625 17.7071L9.91665 13.3568L20.6433 24.0834L16.2929 28.4338L15.5858
                29.1409L16.2929 29.848L18.3187 31.8738L19.0258 32.5809L19.7329 31.8738L21.0516 30.5551L22.3704
                31.8738L23.0775 32.5809L23.7846 31.8738L26.1091 29.5493L27.4279 30.868L28.135 31.5751L28.8421
                30.868L30.8679 28.8421L31.575 28.135L30.8679 27.4279L29.5492 26.1092L31.8738 23.7847L32.5809
                23.0775L31.8738 22.3704L30.555 21.0517L31.8738 19.733L32.5809 19.0259L31.8738 18.3188L29.8479
                16.2929L29.1408 15.5858L28.4337 16.2929Z"
                stroke="none"
                strokeWidth="0"
              />
            </svg>
            &nbsp;
            {currentLang.trainingHeader}
          </h1>
          <ButtonNext {...objForNextButton} />
        </div>
        <div className="training-progress">
          <span className="training-progress-left">1</span>
          <TrainingProgressBar left={currentCard} right={allTrainingCards} />
          <span className="training-progress-right">{allTrainingCards}</span>
        </div>
        <div className="training-card">
          <div className="training-card-header">
            <button
              type="button"
              className="training-card-header-btn-keyboard upper-btns"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                className="bi bi-keyboard"
                viewBox="0 0 16 16"
              >
                <path
                  d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12zM2 4a2 2 0 0 0-2
                  2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2z"
                />
                <path
                  d="M13 10.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0
                  1-.25-.25v-.5zm0-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25
                  0 0 1-.25-.25v-.5zm-5 0A.25.25 0 0 1 8.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25
                  0 0 1 8 8.75v-.5zm2 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25
                  0 0 1-.25-.25v-.5zm1 2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0
                  0 1-.25-.25v-.5zm-5-2A.25.25 0 0 1 6.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1
                  6 8.75v-.5zm-2 0A.25.25 0 0 1 4.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 4
                  8.75v-.5zm-2 0A.25.25 0 0 1 2.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2
                  8.75v-.5zm11-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0
                  1-.25-.25v-.5zm-2 0a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0
                  1-.25-.25v-.5zm-2 0A.25.25 0 0 1 9.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 9
                  6.75v-.5zm-2 0A.25.25 0 0 1 7.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 7
                  6.75v-.5zm-2 0A.25.25 0 0 1 5.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 5
                  6.75v-.5zm-3 0A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2
                  6.75v-.5zm0 4a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0
                  1-.25-.25v-.5zm2 0a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5.5a.25.25 0 0
                  1-.25-.25v-.5z"
                />
              </svg>
            </button>
            <TrainingCardUpperBtn
              id="active"
              isShown={statusButtons}
              isAnswerRight={isAnswered}
              isWordNew={isNew}
              status={wordPosition}
              line={currentLang.activeButton}
              classCss="training-card-header-btn-active upper-btns status-btn"
              iClass="bi bi-check-circle"
              setStatusForObj={setWordPosition}
            />
            <TrainingCardUpperBtn
              id="difficult"
              isShown={statusButtons}
              isAnswerRight={isAnswered}
              isWordNew={isNew}
              status={wordPosition}
              line={currentLang.difficultButton}
              classCss="training-card-header-btn-difficult upper-btns status-btn"
              iClass="bi bi-exclamation-diamond"
              setStatusForObj={setWordPosition}
            />
            <TrainingCardUpperBtn
              id="deleted"
              isShown={statusButtons}
              isAnswerRight={isAnswered}
              isWordNew={false}
              status={wordPosition}
              line={currentLang.deleteButton}
              classCss="training-card-header-btn-delete upper-btns status-btn"
              iClass="bi bi-dash-square-dotted"
              setStatusForObj={setWordPosition}
            />
          </div>
          <div className="training-card-body">
            <div className="training-card-body-upper">
              <hr />
              <div className="training-card-body-upper-progress">
                <WordProgress
                  level={intervalLevel}
                  language={currentLang}
                />
                <WordStarsLevel level={group} />
              </div>
            </div>
            <div className="training-card-body-word">
              <div className="training-card-body-word-details">
                <p>{currentLang.beforeInput}</p>
                <InputControl {...objForInput} />
                <TrainingCardTranslationLine {...objForTranslation} />
                <TrainingCardLineCode {...objForTranscription} />
              </div>
              <TrainingCardImage {...objForImage} />
            </div>
            <TrainingCardExamples {...objForExamplesPart} />
          </div>
          <CardFooter
            currentWord={thisWord.word}
            hasShowAnswerButton={answerButton}
            hasIntervalButtons={feedbackButtons}
            updateInput={setInputValue}
            hasAnswer={isAnswered}
            updateHasAnswer={setIsAnswered}
            intervalLevel={intervalStatus}
            updateIntervalLevel={setIntervalStatus}
            isAnswerTrue={isAnswerTrue}
            language={currentLang}
          />
        </div>
      </div>
    </div>
  );
}

export default TrainingPage;
