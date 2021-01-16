import React from 'react';
import './shadow-training-page.scss';
import { shadowTrainingProps } from '../../constants/interfaces';
import SentenceWrapper from '../slave-components/sentence-wrapper'
function ShadowTrainingPage(props: shadowTrainingProps) {
  console.log(props);
  const { currentTrainingState, setCurrentTrainingState, userWords, statistic, settings } = props;

  if ((settings === null) || (statistic === null) || (userWords === null)) {
    return <div className="No props Shadow Traning Page"></div>
  }

  if (userWords.length === 0) {
    return <div>{"No user Words"}</div>
  }


  if (currentTrainingState.wordsForTraining.length === 0) {

  } else {

  }
  console.log('props', props);

  console.log('userWords', userWords);

  // Component code start
  return (
    <div className="training-page">
      <div className="wrapper">
        <h2>Training
          <i className="bi bi-stoplights-fill"></i>
        </h2>
        <div className="training-progress">
          progress-bar
        </div>
        <div className="training-card">
          <div className="training-card-header">
            <button className="training-card-header-btn-sound">Звук</button>
            <button className="training-card-header-btn-keyboard">Клава</button>
            <button className="training-card-header-btn-difficult">Сложные</button>
            <button className="training-card-header-btn-delete">Удалить</button>
          </div>
          <div className="training-card-body">
            <div className="training-card-body-upper">
              <hr />
              <p>word-progress</p>
            </div>
            <div className="training-card-body-word">
              <div className="training-card-body-word-details">
                <p>Введите английское слово</p>
                <input className="training-card-body-word-details-input" type="text" />
                <p className="training-card-body-word-details-translation">перевод</p>
                <p className="training-card-body-word-details-transcription">транскрипция</p>
              </div>
              <div className="training-card-body-word-img">
                <img src="" alt="word" />
              </div>
            </div>
            <div className="training-card-body-examples">
              <SentenceWrapper sentence={userWords[0].textExample}
                classCss={'training-card-body-sentence-eng'}
                openTag={'<b>'}
                closeTag={'</b>'}
              />
              <SentenceWrapper sentence={userWords[0].textExample}
                classCss={'training-card-body-sentence-eng answered'}
                openTag={'<b>'}
                closeTag={'</b>'}
              />
              <p className="training-card-body-sentence-ru">{userWords[0].textExampleTranslate}</p>
              <SentenceWrapper sentence={userWords[0].textMeaning}
                classCss={'training-card-body-explanation-eng'}
                openTag={'<i>'}
                closeTag={'</i>'}
              />
              <SentenceWrapper sentence={userWords[0].textMeaning}
                classCss={'training-card-body-explanation-eng answered'}
                openTag={'<i>'}
                closeTag={'</i>'}
              />
              <p className="training-card-body-explanation-ru">{userWords[0].textMeaningTranslate}</p>
            </div>
          </div>
          <div className="training-card-footer">
            <button>Показать ответ</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShadowTrainingPage;
