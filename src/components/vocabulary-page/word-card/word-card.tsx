import React from 'react';
import './word-card.scss';
import IwordProps from '../word-props-interface';
import { FILE_URL, MAX_REPEAT_LEVEL } from '../../../constants/constants';
import WordStarsLevel from '../../slave-components/word-stars-level';

const WordCard: React.FC<IwordProps> = (props: IwordProps) => {
  const {
    obj: {
      image, word, wordTranslate, transcription, textMeaning, textMeaningTranslate, textExample, textExampleTranslate, group,
      userWord: {
        optional: {
          level,
        },
      },
    },
  } = props;
  const progressString = `${Math.round((level / MAX_REPEAT_LEVEL) * 100)}%`;
  const volumeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg" width="30" height="30"
      fill="currentColor" className="bi bi-volume-up-fill icon icon-left svg-color-info" viewBox="0 0 16 16"
    >
      <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476
      7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
      />
      <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0
      1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
      />
      <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0
       1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825
        10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
      />
    </svg>
  );

  return (
    <li className="card">
      <div className="card-header">
        <div className="star-container">
          <WordStarsLevel level={group} />
        </div>
        <div className="buttons-container">
          <button className="table-change-status table-change-status_difficult  btn-icon-small" type="button">
            <i className="bi bi-exclamation-diamond" />
          </button>
          <button className="table-change-status table-change-status_delete btn-icon-small" type="button">
            <i className="bi bi-dash-square-dotted" />
          </button>
        </div>
      </div>
      <div className="separator" />
      <div className="card-content">
        <div className="column">
          <img className="card-img" src={`${FILE_URL}/${image}`} alt="" />
        </div>
        <div className="column">
          <div className="card-text-primary text-primary">{word}</div>
          <div className="card-text-primary text-secondary">{wordTranslate}</div>
          <div className="card-transcription">
            {volumeIcon}
            <span className="card-text">{transcription}</span>
          </div>
          <div>
            <div className="card-example">
              {volumeIcon}
              <div>
                <p className="card-text card-text-eng">{textMeaning}</p>
                <p className="card-text">{textMeaningTranslate}</p>
              </div>
            </div>
            <div className="flex">
              {volumeIcon}
              <div>
                <p className="card-text card-text-eng">{textExample}</p>
                <p className="card-text">{textExampleTranslate}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="separator" />
      <div className="card-footer">
        <div className="card-footer-column">
          <div className="card-footer-heading">appeared</div>
          <div className="card-footer-text">10</div>
        </div>
        <div className="card-footer-column">
          <div className="card-footer-heading">answered correct</div>
          <div className="card-footer-text">10</div>
        </div>
        <div className="card-footer-column">
          <div className="card-footer-heading">first appearance</div>
          <div className="card-footer-text">1</div>
        </div>
        <div className="card-footer-column">
          <div className="card-footer-heading">last appearance</div>
          <div className="card-footer-text">1</div>
        </div>
        <div className="card-footer-column">
          <div className="card-footer-heading">next appearance</div>
          <div className="card-footer-text">1</div>
        </div>
        <div className="card-footer-column">
          <div className="card-footer-heading">progress</div>
          <div className="card-footer-text">{progressString}</div>
        </div>

      </div>
    </li>
  );
};

export default WordCard;
