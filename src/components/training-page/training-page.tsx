import React from 'react';
import './training-page.scss';

function TrainingPage() {

  // Component code start
  return (
    <div className="training-page">
      <div className="wrapper">
        <h2>Training</h2>
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
              <p className="training-card-body-sentence-eng">Some English text.</p>
              <p className="training-card-body-sentence-ru">Перевод предложения.</p>
              <p className="training-card-body-explanation-eng">What it means.</p>
              <p className="training-card-body-explanation-ru">Перевод определения.</p>
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

export default TrainingPage;
