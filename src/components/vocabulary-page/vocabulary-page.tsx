import React from 'react';
import './vocabulary-page.scss';
import { vocabularyProps } from '../../constants/interfaces';
import { FILE_URL } from '../../constants/constants';

function VocabularyPage(props: vocabularyProps) {
  // const DEFAULT_USER_WORD: userWordReq = {
  //   difficulty: 'new',
  //   optional: {
  //     firstAppearance: 0,
  //     lastRepeat: 0,
  //     nextRepeat: 0,
  //     counter: 0,
  //     success: 0,
  //     progress: 0,
  //     status: 'active',   //'active', 'deleted', 'difficult'
  //     level: 0,
  //     userWord: true,
  //   },
  // }
  // Component code start
  console.log(props);
  const { userWords } = props;
  if (userWords === null) {
    console.log('null');
    return <div></div>;
  }

  const Vocabulary = () => {
    return (
      <table className="table">
        <thead>
          <tr className="table-row">
            <th className="table-h"></th>
            <th className="table-h"></th>
            <th className="table-h"><span>слово-перевод</span></th>
            <th className="table-h"><span>транскрипция</span></th>
            <th className="table-h"><span>следующая тренировка</span></th>
            <th className="table-h"><span>группа</span></th>
            <th className="table-h"><span>прогресс</span></th>
            <th className="table-h"><span>действие</span></th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            <td className="table-data">
              <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-caret-right-fill icon svg-color-primary" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
              </svg></td>
            <td className="table-data table-text-primary">1440</td>
            <td className="table-data table-text-primary">
              <div className="cell-wrapper">
                <div className="cell-img">
                  <img src={`${FILE_URL}/${userWords[5].image}`} alt="" />
                </div>
                <div className="cell-wrapper-right">
                  <div className="text-primary">{userWords[5].word}</div>
                  <div>{userWords[5].wordTranslate}</div>
                </div>
              </div>
            </td>
            <td className="table-data">
              <div className="cell-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-volume-up icon icon-left svg-color-info" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
                  <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
                  <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39L6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z" />
                </svg>
                <span className="table-text-primary">{userWords[5].transcription}</span>
              </div>
            </td>
            <td className="table-data table-text-primary">2/3/2021</td>
            <td className="table-data"><i className="bi bi-exclamation-diamond"></i><i className="bi bi-exclamation-diamond"></i><i className="bi bi-exclamation-diamond"></i><i className="bi bi-exclamation-diamond"></i><i className="bi bi-exclamation-diamond"></i></td>
            <td className="table-data">прогресс</td>
            <td className="table-data">
              <div className="cell-wrapper">
                <button className="table-change-status table-change-status_difficult">
                  <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-exclamation-diamond" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                  </svg></button>
                <button className="table-change-status table-change-status_delete"><svg xmlns="http://www.w3.org/2000/svg" className="bi bi-dash-square-dotted" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834 0h.916v-1h-.916v1zm1.833 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table >
    );
  }

  const content = userWords === null ? 'there are no words' : <Vocabulary />;
  return (
    <div className="vocabulary">
      <header className="subheader">
        <div className="subheader-left-side">
          <h2 className="subheader-title heading2">Vocabulary</h2>
          <nav>
            <ul className="subheader-menu">
              <li className="subheader-menu_link active">Изучаемые</li>
              <li className="subheader-menu_link">Сложные</li>
              <li className="subheader-menu_link">Удаленные</li>
            </ul>
          </nav>
        </div>
        <div className="subheader-search search__form">

          <div className="search__group">
            <input className="search__box" type="text" placeholder="Search..." />
            <svg className="search__icon bi bi-search" xmlns="http://www.w3.org/2000/svg" width="20" height="38" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <span className="search__additional">
              <svg className="bi bi-x icon__clicable" xmlns="http://www.w3.org/2000/svg" width="20" height="38" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
              <svg className="bi bi-keyboard icon__clicable" id="switchKeyboardButton" xmlns="http://www.w3.org/2000/svg" width="24" height="38" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M14 5H2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2z" />
                <path d="M13 10.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm0-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5 0A.25.25 0 0 1 8.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 8 8.75v-.5zm2 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-.5zm1 2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5-2A.25.25 0 0 1 6.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 6 8.75v-.5zm-2 0A.25.25 0 0 1 4.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 4 8.75v-.5zm-2 0A.25.25 0 0 1 2.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2 8.75v-.5zm11-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0A.25.25 0 0 1 9.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 9 6.75v-.5zm-2 0A.25.25 0 0 1 7.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 7 6.75v-.5zm-2 0A.25.25 0 0 1 5.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 5 6.75v-.5zm-3 0A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 6.75v-.5zm0 4a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm2 0a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5.5a.25.25 0 0 1-.25-.25v-.5z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="subheader-right-side">
          <div className="subheader-dropdown filter"><span className="btn-icon"><i className="bi bi-filter"></i></span>FILTERS<i className="bi bi-chevron-down"></i></div>
          <div className="subheader-dropdown sort"><div className="btn-icon"><i className="bi bi-sort-down-alt"></i></div>A-Z<i className="bi bi-chevron-down"></i></div>
        </div>
      </header>
      <div className="container">
        {content}

      </div>
    </div>

  );
}

export default VocabularyPage;