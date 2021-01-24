import React, { useState } from 'react';
import './training-page.scss';
import { userSettings, paginatedWord, cardAnswer, userWordOptional, trainingCardProps } from '../../constants/interfaces';
import { levelsOfRepeat, MAX_REPEAT_LEVEL, MIN_REPEAT_LEVEL } from './training-consts';
import { FILE_URL } from '../../constants/constants';
import { lineProps, forInput, NextButtonProps, ForCardExamples } from './training-page-interfaces';
import {
  TrainingCardUpperBtn, TrainingCardLineCode, TrainingCardImage, StarsLevelField,
  TrainingProgressBar, WordProgress
  } from './training-simple-functions';
import InputControl from './training-page-input';
import CardFooter from './training-page-card-footer';
import TrainingCardExamples from './training-card-examples-field';

function TrainingPage(props:trainingCardProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [isAnswerTrue, setIsAnswerTrue] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [wordPosition, setWordPosition] = useState<'active' | 'deleted' | 'difficult'>('active'); // для создания объекта
  const [intervalStatus, setIntervalStatus] = useState<string>(''); // для подсчета интервала
  const [intervalLevel, setIntervalLevel] = useState<number>(0); // прокидывать в футер карточки
  const [isNew, setIsNew] = useState<boolean>(true); // чтобы брать настройки, если слово не новое
  const [counter, setCounter] = useState<number>(0);
  const [success, setSuccess] = useState<number>(0);
  
  const trainingDay: number = Date.now();

  console.log(props);
  const {
    word, settings, wordNumber, totalWords, getAnswer
  } = props;
  
  const { optional } = settings;
  
  const currentCard: number = wordNumber;
  let thisWord: paginatedWord;
  thisWord = word;
  const {group} = thisWord;
 
  const {
    answerButton, /*autoSound, автовоспроизведение всех звуков*/ cardExample, cardExampleTranslation,
    cardWordPronunciation, cardExplanation, cardExplanationTranslation, 
    cardImage, cardTranscription, cardExplanationTranslationAfter, cardExampleTranslationAfter,
    cardTranslation, cardTranslationAfterSuccess, statusButtons, feedbackButtons,
  } = optional;
  const isSoundOn:boolean = true; // временно, пока звук не передается
  const autoSound:boolean = false; // пока не найду, как нормально проигрывать

  const allTrainingCards: number = totalWords;
  let firstAppearance: number = trainingDay;
  // let counter: number = 5;
  // let success: number = 3;
  let progress: number = 0;

  if (('userWord' in thisWord) && (isNew)) {
    setIsNew(false);
    const {userWord} = thisWord;
    const wordStatus: 'active' | 'deleted' | 'difficult' = userWord!.optional.status; // active, difficult, deleted
    setWordPosition(wordStatus);
    firstAppearance = userWord!.optional.firstAppearance;
    setIntervalLevel(userWord!.optional.level);
    // counter = userWord!.optional.counter;
    // success = userWord!.optional.success;
    setCounter(userWord!.optional.counter);
    setSuccess(userWord!.optional.success);
    progress = userWord!.optional.counter;
  };
  progress = Math.floor((success / counter) * 100) / 100;

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

  const objForInput: forInput = {
    value: inputValue,
    updateValue: setInputValue,
    theWord: thisWord.word,
    isAnswerSet: isAnswered,
    updateAnswerSet: setIsAnswered,
    isTrue: isAnswerTrue,
    updateAnswer: setIsAnswerTrue,
    isSoundOn: isSoundOn,
    wordSound: playWord,
    isAutoPlayOn: autoSound,
    exampleSound: playExample,
    meaningSound: playMeaning,
    counter: counter,
    success: success,
    updateCounter: setCounter,
    updateSuccess: setSuccess,
    isSoundBtnShown: cardWordPronunciation
  };
  
  const objForExamplesPart: ForCardExamples = {
    isExampleShown: cardExample,
    isExampleTranslationShown: cardExampleTranslation,
    isMeaningShown: cardExplanation,
    isMeaningTranslationShown: cardExplanationTranslation,
    showTranslationAfter: cardTranslationAfterSuccess,
    isSoundOn: isSoundOn,
    isAnswered: isAnswered,
    soundExample: playExample,
    soundMeaning: playMeaning,
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
    success: success
  }

  return (
    <div className="training-page">
      <div className="wrapper">
        <div className="wrapper-upper">
          <h1><i className="bi bi-stack"></i> Training</h1>
          <ButtonNext {...objForNextButton}/>
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
              isShown={statusButtons}
              isAnswerRight={isAnswered}
              isWordNew={isNew}
              status={wordPosition}
              line={`Изучаемое`}
              classCss={"training-card-header-btn-active"}
              iClass={"bi bi-check-circle"}
              setStatusForObj={setWordPosition}/>            
            <TrainingCardUpperBtn 
              id={'difficult'}
              isShown={statusButtons}
              isAnswerRight={isAnswered}
              isWordNew={isNew}
              status={wordPosition}
              line={`Сложное`}
              classCss={"training-card-header-btn-difficult"}
              iClass={"bi bi-exclamation-diamond"}
              setStatusForObj={setWordPosition}/>
            <TrainingCardUpperBtn
              id={'deleted'}
              isShown={statusButtons}
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
                <WordProgress level={intervalLevel}/>
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
            isAnswerTrue={isAnswerTrue} />
        </div>
      </div>
    </div>
  );
}

function ButtonNext(props: NextButtonProps) {
  const {
    isShown, isAnswerTrue, levelForRepeat, levelStatus, getAnswer, wordID, wordStatus,
    firstAppearance, counter, success
  } = props;
  const trainingDay: number = Date.now();
  if (!isShown) {
    return null;
  };  
  
  const currentCount: number = counter;
  const currentSuccess: number = success;
  const currentProgress: number = Math.floor((currentSuccess / currentCount) * 100) / 100;

  const ButtonNextHandler = () => {
    const isToRepeat: boolean = (levelStatus === 'again') ? true : false;
    const point: number = isAnswerTrue ? 1 : 0;
    let nextTime: number = trainingDay
    
    let levelNow: number = levelForRepeat;
    console.log(levelNow, 'levelNow');
    if (isAnswerTrue) {
      switch (levelStatus) {
        case 'again': 
          console.log('in again switch');
          levelNow = levelNow + 1;
          console.log(`nextRepeat: ${nextTime}`);
        break;
        case 'hard':  
          console.log('in hard switch');
          if (levelNow < MAX_REPEAT_LEVEL) {
            levelNow = levelNow + 1;
          };
          nextTime+= levelsOfRepeat[levelNow];
          console.log(`nextRepeat: ${nextTime}`);
        break;
        case 'easy':
          console.log('in easy switch');
          if (levelNow < MAX_REPEAT_LEVEL - 2) {
            levelNow = levelNow + 3;
          } else if (levelNow < MAX_REPEAT_LEVEL - 1) {
            levelNow = levelNow + 2;
          } else if (levelNow < MAX_REPEAT_LEVEL) {
            levelNow = levelNow + 1;
          }
          nextTime += levelsOfRepeat[levelNow];
          console.log(`nextRepeat: ${nextTime}`);
        break;
        default:
          console.log('in normal switch');
          if (levelNow < MAX_REPEAT_LEVEL - 1) {
            levelNow = levelNow + 2;
          } else if (levelNow < MAX_REPEAT_LEVEL) {
            levelNow = levelNow + 1;
          };
          nextTime += levelsOfRepeat[levelNow];
          console.log(`nextRepeat: ${nextTime}`);
        break;
      }
    } else {
      console.log('when answer wrong');
      levelNow = 1;
      nextTime += levelsOfRepeat[levelNow];
      console.log(`nextRepeat: ${nextTime}`);
    };
    console.log(`nextRepeat: ${nextTime}`, 'outside switch');

    const wordSettings: userWordOptional = {
      firstAppearance: firstAppearance,
      lastRepeat: trainingDay,
      nextRepeat: nextTime, // подсчет по методике в кнопке
      counter: currentCount, // сколько раз выпадала, плюсовать по клику на дальше
      success: currentSuccess, // сколько всего правильных ответов, плюсовать по клику на дальше
      progress: currentProgress, // отношение успешных ответов ко всемпше ыефегы
      status: wordStatus,//string,   //'active', 'deleted', 'difficult'
      level: levelNow,
      userWord: true,
      }
    
    const resultOfTheCard: cardAnswer = {
      difficulty: 'default',
      optional: wordSettings,
      isRepeat: isToRepeat,
      points: point,
      _id: wordID
    }
    
    console.log('повторять или нет: ', resultOfTheCard.isRepeat);
    console.log(`уровень повторения: ${levelForRepeat}, повторить через: ${levelsOfRepeat[levelNow]} следущий повтор: ${nextTime}`);
    console.log(resultOfTheCard);

    // возвращение нужного объекта
    // let res: cardAnswer;
    // res = resultOfTheCard;
    // getAnswer(res);
  }

  return (<button className="button-next" onClick={ButtonNextHandler}>Дальше</button>)
}

export default TrainingPage;
