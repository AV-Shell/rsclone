/* eslint-disable max-len */
import React from 'react';
import './vocabulary-page.scss';
import { vocabularyProps } from '../../constants/interfaces';
import TableRow from './table-row';
import WordCard from './word-card';

const VocabularyPage: React.FC<vocabularyProps> = (props: vocabularyProps) => {
  console.log(props);
  const { userWords } = props;
  if (userWords === null) {
    return <div />;
  }

  const wordList = userWords.map((el) => <TableRow obj={el} />);

  const Vocabulary = () => (
    <div className="card">
      <table className="table">
        <thead>
          <tr className="table-row">
            <th className="table-h"><span>слово-перевод</span></th>
            <th className="table-h"><span>транскрипция</span></th>
            <th className="table-h"><span>группа</span></th>
            <th className="table-h">
              <div>следующая</div>
              <div>тренировка</div>
            </th>
            <th className="table-h"><span>прогресс</span></th>
            <th className="table-h"><span>действие</span></th>
          </tr>
        </thead>
        <tbody>
          {
            ...wordList
          }
        </tbody>
      </table>
    </div>
  );

  const content = userWords.length === 0 ? 'there are no words' : <Vocabulary />;

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
            <svg
              className="search__icon bi bi-search" xmlns="http://www.w3.org/2000/svg" width="20"
              height="38" fill="currentColor" viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0
               0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
            <span className="search__additional">
              <svg
                className="bi bi-x icon__clicable" xmlns="http://www.w3.org/2000/svg" width="20"
                height="38" fill="currentColor" viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0
                 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
              <svg
                className="bi bi-keyboard icon__clicable" id="switchKeyboardButton" xmlns="http://www.w3.org/2000/svg"
                width="24" height="38" fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path fillRule="evenodd" d="M14 5H2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2z" />
                <path d="M13 10.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm0-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5 0A.25.25 0 0 1 8.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 8 8.75v-.5zm2 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-.5zm1 2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5-2A.25.25 0 0 1 6.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 6 8.75v-.5zm-2 0A.25.25 0 0 1 4.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 4 8.75v-.5zm-2 0A.25.25 0 0 1 2.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2 8.75v-.5zm11-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0A.25.25 0 0 1 9.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 9 6.75v-.5zm-2 0A.25.25 0 0 1 7.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 7 6.75v-.5zm-2 0A.25.25 0 0 1 5.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 5 6.75v-.5zm-3 0A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 6.75v-.5zm0 4a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm2 0a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5.5a.25.25 0 0 1-.25-.25v-.5z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="subheader-right-side">
          <div className="subheader-dropdown filter">
            <span className="btn-icon"><i className="bi bi-filter" /></span>
                FILTERS
                <i className="bi bi-chevron-down" />
          </div>
          <div className="subheader-dropdown sort">
            <div className="btn-icon"><i className="bi bi-sort-down-alt" /></div>
            A-Z
            <i className="bi bi-chevron-down" />
          </div>
        </div>
      </header>
      <WordCard obj={userWords[0]} />
      <div className="container">
        {content}
      </div>
    </div>

  );
};

export default VocabularyPage;
