/* eslint-disable max-len */
import React from 'react';
import { FILE_URL } from '../../../constants/constants';
import { paginatedWord } from '../../../constants/interfaces';

interface IRowProps {
  obj: paginatedWord,
}

const TableRow: React.FC<IRowProps> = (props: IRowProps) => {
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
      <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
      <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
      <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
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
          <button className="table-change-status table-change-status_difficult" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg" className="bi bi-exclamation-diamond" width="16"
              height="16" fill="currentColor" viewBox="0 0 16 16"
            >
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435
                   9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495
                   0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"
              />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
          </button>
          <button className="table-change-status table-change-status_delete" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg" className="bi bi-dash-square-dotted" width="16"
              height="16" fill="currentColor" viewBox="0 0 16 16"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" className="bi bi-dash-square-dotted" viewBox="0 0 16 16"
              >
                <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1
                    2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834
                    0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51
                    0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0
                    0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16
                    2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0
                    2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16
                    .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16
                    .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16
                    .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51
                    1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1
                    0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833
                    0h.917v-1h-.917v1zm1.834 0h.916v-1h-.916v1zm1.833 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
                />
              </svg>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
