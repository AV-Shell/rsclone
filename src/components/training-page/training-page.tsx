import React from 'react';
import './training-page.scss';
import { trainingProps, userSettings, paginatedWord } from '../../constants/interfaces';
import levelsOfRepeat from './training-consts';

interface upperButtonProps {
  isTrue:boolean,
  line:string,
  classCss: string
}

type IntervalTime = {
  [days: number]: number 
};

interface cardBodyProps {
  words: object[],
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
            <TrainingCardHeaderBtn {...objForDifficultyBtn}/>
            <TrainingCardHeaderBtn {...objForDeleteBtn}/>
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
function TrainingCardHeaderBtn(props:upperButtonProps) {
  const {isTrue, line, classCss} = props;
  if (isTrue) {
    return (<button className={classCss}>{line}</button>);
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
  const {words, settings, levelsOfRepeat, updateSettings, updateUserWords} = props;
  
  const thisWord: object = words[1];
  const {userWord} = thisWord;


  return (<div className="training-card-body">
  <div className="training-card-body-upper">
    <hr />
    <div className="training-card-body-upper-progress">
      <span>word-progress</span><span>звездочки</span>
      </div>
  </div>
  <div className="training-card-body-word">
    <div className="training-card-body-word-details">
      <p>Введите английское слово</p>
      <input className="training-card-body-word-details-input" type="text" size={userWord.word.length} />
      <p className="training-card-body-word-details-translation">перевод</p>
      <p className="training-card-body-word-details-transcription">транскрипция</p>
    </div>
    <div className="training-card-body-word-img">
      <img src="" alt="word" />
    </div>
  </div>
  <div className="training-card-body-examples">
    <p className="training-card-body-sentence-eng">Some English text.</p>
    <p className="training-card-body-sentence-ru">Перевод предложения.</p>
    <p className="training-card-body-explanation-eng">What it means.</p>
    <p className="training-card-body-explanation-ru">Перевод определения.</p>
  </div>
</div>)
}

export default TrainingPage;
