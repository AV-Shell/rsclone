import React from 'react';
import { useState, useEffect } from 'react';
import './testing-card.scss';
import { FILE_URL, DEFAULT_USER_WORD } from '../../../../constants/constants';
import {
  cardAnswer,
  trainingCardProps,
} from '../../../../constants/interfaces';

import SentenceWrapper from '../../../slave-components/sentence-wrapper'




function TestingCard(props: trainingCardProps) {
  const { word, wordNumber, totalWords, getAnswer } = props

  function answer(a: number) {
    let res: cardAnswer;
    if (word.userWord) {
      res = {
        difficulty: word.userWord.difficulty,
        optional: {
          ...word.userWord.optional,
        },
        isRepeat: false,
        points: 0,
        _id: word._id,
      }
    } else {
      res = {
        difficulty: DEFAULT_USER_WORD.difficulty,
        optional: {
          ...DEFAULT_USER_WORD.optional,
        },
        isRepeat: false,
        points: 0,
        _id: word._id,
      }
    }
    if (a === 0) {
      res.isRepeat = true;
    } else if (a === 1) {
      res.points = 1;
    }
    getAnswer(res);
  }
  // Component code start
  return (
    <div className="shadow-training-page">
      <div className="wrapper">
        <h2>Training
          <i className="bi bi-stoplights-fill"></i>
        </h2>
        <div className="training-progress">
          progress-bar {`${wordNumber}/${totalWords}`}
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
                <p className="training-card-body-word-details-translation">перевод: {word.wordTranslate}</p>
                <p className="training-card-body-word-details-transcription">транскрипция: {word.transcription}</p>
              </div>
              <div className="training-card-body-word-img">
                <img src={`${FILE_URL}/${word.image}`} alt="word" />
              </div>
            </div>
            <div className="training-card-body-examples">
              <SentenceWrapper sentence={word.textExample}
                classCss={'training-card-body-sentence-eng'}
                openTag={'<b>'}
                closeTag={'</b>'}
              />
              <SentenceWrapper sentence={word.textExample}
                classCss={'training-card-body-sentence-eng answered'}
                openTag={'<b>'}
                closeTag={'</b>'}
              />
              <p className="training-card-body-sentence-ru">{word.textExampleTranslate}</p>
              <SentenceWrapper sentence={word.textMeaning}
                classCss={'training-card-body-explanation-eng'}
                openTag={'<i>'}
                closeTag={'</i>'}
              />
              <SentenceWrapper sentence={word.textMeaning}
                classCss={'training-card-body-explanation-eng answered'}
                openTag={'<i>'}
                closeTag={'</i>'}
              />
              <p className="training-card-body-explanation-ru">{word.textMeaningTranslate}</p>
            </div>
          </div>
          <div className="training-card-footer">
            <button onClick={()=>answer(0)}>Показать Снова</button>
            <button onClick={()=>answer(1)}>Ответить правильно</button>
            <button onClick={()=>answer(2)}>Ответить неправильно</button>
          </div>
        </div>
      </div>
    </div>
  );


}

export default TestingCard;
