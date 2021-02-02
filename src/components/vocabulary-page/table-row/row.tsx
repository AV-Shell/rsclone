import React from 'react';
import { FILE_URL } from '../../../constants/constants';
import IwordProps from '../word-props-interface';

const TableRow: React.FC<IwordProps> = (props: IwordProps) => {
  const {
    obj: {
      image, word, wordTranslate, transcription, _id,
    },
  } = props;

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

    <tr className="table-row" key={_id}>
      <td className="table-data table-text-primary">
        <div className="cell-wrapper">
          <div className="cell-img">
            <img src={`${FILE_URL}/${image}`} alt="" />
          </div>
          <div className="cell-wrapper-right">
            <div className="text-primary">{word}</div>
            <div>{wordTranslate}</div>
          </div>
        </div>
      </td>
      <td className="table-data">
        <div className="cell-wrapper">
          {volumeIcon}
          <span className="table-text-transcription">{transcription}</span>
        </div>
      </td>
      <td className="table-data table-text-primary">2/3/2021</td>
      <td className="table-data">
        <i className="bi bi-exclamation-diamond" />
        <i className="bi bi-exclamation-diamond" />
        <i className="bi bi-exclamation-diamond" />
        <i className="bi bi-exclamation-diamond" />
        <i className="bi bi-exclamation-diamond" />
      </td>
      <td className="table-data">прогресс</td>
      <td className="table-data">
        <div className="cell-wrapper">
          <button className="table-change-status table-change-status_difficult  btn-icon-small" type="button">
            <i className="bi bi-exclamation-diamond" />
          </button>
          <button className="table-change-status table-change-status_delete btn-icon-small" type="button">
            <i className="bi bi-dash-square-dotted" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;