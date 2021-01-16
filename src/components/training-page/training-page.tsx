import React, { useState } from 'react';
import './training-page.scss';
import { trainingProps, userSettings, paginatedWord } from '../../constants/interfaces';
import levelsOfRepeat from './training-consts';
import { FILE_URL } from '../../constants/constants';

interface upperButtonProps {
  isTrue:boolean,
  line:string,
  classCss: string
}

interface forInput {
  theWord: string,
  isTrue: boolean,
  updateAnswer: React.Dispatch<React.SetStateAction<boolean>>
}

type IntervalTime = {
  [days: number]: number 
};

interface cardBodyProps {
  words: paginatedWord[],
  settings: userSettings | null,
  levelsOfRepeat: IntervalTime,
  updateSettings: React.Dispatch<React.SetStateAction<userSettings | null>>,
  updateUserWords: React.Dispatch<React.SetStateAction<Array<paginatedWord> | null>>,
}

function TrainingPage(props:trainingProps) {
  console.log(props);
  const {
    userWords, apiService, settings, statistic, updateSettings, updateStatistic, updateUserWords
  } = props;
  if ((props.settings === null) || (props.statistic === null) || (props.userWords=== null)) {
    return <div className="training-page"></div>
  };
  const { optional } = props.settings;
  const trainingDayWords = userWords ? userWords : [];
  // const wordsLen : number = userWords ? userWords.length : 0; // это чисто длина слов на повтор
  const {getSomethingAggregatedNewWords: newWords} = apiService;
  // getSomethingAggregatedNewWords in apiServise -взять какие-то новые слова
  // const [dayWords, setDayWords] = useState(trainingDayWords);
  const {
    answerButton, autoSound, cardExample, cardExampleTranslation,
    cardExplanation, cardExplanationTranslation, cardImage, cardTranscription,
    cardTranslation, cardTranslationAfterSuccess, cardsPerDay, commonProgress,
    deleteButton, difficultWordsButton, feedbackButtons, isSoundOn,
    newWordsPerDay, repeatWordsPerDay,
  } = optional;

  const objForDifficultyBtn: upperButtonProps = {
    isTrue: difficultWordsButton,
    line: 'Сложное',
    classCss: "training-card-header-btn-difficult",
  };

  const objForDeleteBtn: upperButtonProps = {
    isTrue: deleteButton,
    line: 'Удалить',
    classCss: "training-card-header-btn-delete",
  };

  const objForCardBody: cardBodyProps = {
    words: trainingDayWords, // нужен  юз стейт
    settings: settings,
    levelsOfRepeat: levelsOfRepeat,
    updateSettings: updateSettings,
    updateUserWords: updateUserWords
  };
  return (
    <div className="training-page">
      <div className="wrapper">
        <h2>Training</h2>
        <div className="training-progress">
          <span>1</span><span>progress-bar</span><span>{cardsPerDay}</span>
        </div>
        <div className="training-card">
          <div className="training-card-header">
            <button className="training-card-header-btn-sound">Звук</button>
            <button className="training-card-header-btn-keyboard">Клава</button>
            <TrainingCardUpperBtn {...objForDifficultyBtn}/>
            <TrainingCardUpperBtn {...objForDeleteBtn}/>
          </div>
          <TrainingCardBody {...objForCardBody}/>
          <div className="training-card-footer">
            <button>Показать ответ</button>
          </div>
        </div>
      </div>
    </div>
  );
}
// training-card-header-btn-difficult
function TrainingCardUpperBtn(props:upperButtonProps) {
  const {isTrue, line, classCss} = props;
  if (isTrue) {
    return (<button className={classCss}>{line}</button>);
  };
  return null;
}

function TrainingCardLineCode(props:upperButtonProps) {
  const {isTrue, line, classCss} = props;
  if (isTrue) {
    return (<p className={classCss}>{line}</p>);
  };
  return null;
}

function TrainingCardImage(props:upperButtonProps) {
  const {isTrue, line, classCss} = props;
  if (isTrue) {
    return (<div className={classCss}>
    <img src={line} alt="word" />
    </div>);
  };
  return null;
}

// const objForCardBody: cardBodyProps = {
//   words: trainingDayWords, // нужен  юз стейт
//   settings: settings,
//   levelsOfRepeat: levelsOfRepeat,
//   updateSettings: updateSettings,
//   updateUserWords: updateUserWords
// };

function TrainingCardBody(props:cardBodyProps) {
  const [isAnswerTrue, setIsAnswerTrue] = useState<boolean>(false);
  const {words, settings, levelsOfRepeat, updateSettings, updateUserWords} = props;
  if (settings === null) {
    return <div className="training-page"></div>
  };
  const {optional} = settings;
  const {
    answerButton, autoSound, cardExample, cardExampleTranslation,
    cardExplanation, cardExplanationTranslation, cardImage, cardTranscription,
    cardTranslation, cardTranslationAfterSuccess, cardsPerDay, commonProgress,
    feedbackButtons, isSoundOn, newWordsPerDay, repeatWordsPerDay,
  } = optional;

   
  const thisWord = words[3];
  const imgURL: string = FILE_URL + '/' + thisWord.image;
  const audioWordURL: string = FILE_URL + '/' + thisWord.audio;
  const audioExampleURL: string = FILE_URL + '/' + thisWord.audioExample;
  const audioMeaningURL: string = FILE_URL + '/' + thisWord.audioMeaning;

  const objForTranslation: upperButtonProps = {
    isTrue: cardTranslation,
    line: thisWord.wordTranslate,
    classCss: "training-card-body-word-details-translation"
  };

  const objForTranscription: upperButtonProps = {
    isTrue: cardTranscription,
    line: thisWord.transcription,
    classCss: "training-card-body-word-details-transcription"
  };

  const objForImage: upperButtonProps = {
    isTrue: cardImage,
    line: imgURL,
    classCss: "training-card-body-word-img"
  };

  const objForExample: upperButtonProps = {
    isTrue: cardExample,
    line: thisWord.textExample,
    classCss: "training-card-body-sentence-eng"
  };

  const objForExampleTranslation: upperButtonProps = {
    isTrue: cardExampleTranslation,
    line: thisWord.textExampleTranslate,
    classCss: "training-card-body-sentence-ru"
  };

  const objForMeaning: upperButtonProps = {
    isTrue: cardExplanation,
    line: thisWord.textMeaning,
    classCss: "training-card-body-explanation-eng"
  };

  const objForMeaningTranslation: upperButtonProps = {
    isTrue: cardExplanationTranslation,
    line: thisWord.textMeaningTranslate,
    classCss: "training-card-body-explanation-ru"
  };

  const objForInput: forInput = {
    theWord: thisWord.word,
    isTrue: isAnswerTrue,
    updateAnswer: setIsAnswerTrue

  };

  // это если ответил правильно
  // if (autoSound) {
        //   const audioWord = new Audio(audioWordURL);
        //   const audioWordExample = new Audio(audioExampleURL);
        //   const audioWordMeaning = new Audio(audioMeaningURL);
        //   audioWord.play();
          // audioWordExample.play();
          // audioWordMeaning.play();

          //сделать константу тру/фолс и менять компоненты в зависимости от?

  return (<div className="training-card-body">
  <div className="training-card-body-upper">
    <hr />
    <div className="training-card-body-upper-progress">
      <span>word-progress<small>тут чо-то написано</small></span><span>звездочки</span>
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
</div>)
}

function InputControl(props: forInput) {
  const {theWord, isTrue, updateAnswer} = props;
  const [inputValue, setInputValue] = useState<string>('');

  const InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const KeyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      console.log('enter pressed in input');
      if (inputValue.toLocaleLowerCase() === theWord) {
        console.log('that is right');
        updateAnswer(true);
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
    onChange={InputChangeHandler}/>)
}


export default TrainingPage;
