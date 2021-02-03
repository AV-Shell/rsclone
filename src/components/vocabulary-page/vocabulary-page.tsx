/* eslint-disable max-len */
import React, { useState } from 'react';
import './vocabulary-page.scss';
import { paginatedWord, vocabularyProps } from '../../constants/interfaces';
import TableRow from './table-row';
import WordCard from './word-card';
import { EN, RU } from './localization';
import {
  sortByGroup, sortByNextTraining, sortByTranslation, sortByWords,
} from './helper';

const VocabularyPage: React.FC<vocabularyProps> = (props: vocabularyProps) => {
  console.log('vocabulary', props);
  const { userWords, isLanguageRU } = props;
  const [sortingState, setSortingState] = useState<number>(1);
  const [filterState, setFilterState] = useState<string>('active');
  // eslint-disable-next-line no-undef
  let wordList: JSX.Element[];

  const navigate = (status: string) => {
    // filteredWords = userWords.filter((el) => el.userWord.optional.status === status);
    setFilterState(status);
    console.log(status);
  };
  const filteredWords: paginatedWord[] = userWords.filter((el) => el.userWord.optional.status === filterState);
  if (sortingState === 1) {
    wordList = sortByWords(filteredWords).map((el) => <TableRow obj={el} isLanguageRU={isLanguageRU} key={el._id} />);
  } else if (sortingState === -1) {
    wordList = sortByWords(filteredWords, true).map((el) => <TableRow obj={el} isLanguageRU={isLanguageRU} key={el._id} />);
  } if (sortingState === 2) {
    wordList = sortByTranslation(filteredWords).map((el) => <TableRow obj={el} isLanguageRU={isLanguageRU} key={el._id} />);
  } else if (sortingState === -2) {
    wordList = sortByTranslation(filteredWords, true).map((el) => <TableRow obj={el} isLanguageRU={isLanguageRU} key={el._id} />);
  } if (sortingState === 3) {
    wordList = sortByGroup(filteredWords).map((el) => <TableRow obj={el} isLanguageRU={isLanguageRU} key={el._id} />);
  } else if (sortingState === -3) {
    wordList = sortByGroup(filteredWords, true).map((el) => <TableRow obj={el} isLanguageRU={isLanguageRU} key={el._id} />);
  } if (sortingState === 4) {
    wordList = sortByNextTraining(filteredWords).map((el) => <TableRow obj={el} isLanguageRU={isLanguageRU} key={el._id} />);
  } else if (sortingState === -4) {
    wordList = sortByNextTraining(filteredWords, true).map((el) => <TableRow obj={el} isLanguageRU={isLanguageRU} key={el._id} />);
  }
  if (sortingState === 5) {
    wordList = sortByNextTraining(filteredWords).map((el) => <TableRow obj={el} isLanguageRU={isLanguageRU} key={el._id} />);
  } else if (sortingState === -5) {
    wordList = sortByNextTraining(filteredWords, true).map((el) => <TableRow obj={el} isLanguageRU={isLanguageRU} key={el._id} />);
  }

  if (userWords === null) {
    return <div />;
  }

  const lang = isLanguageRU ? RU : EN;
  const sortClick = (num: number) => {
    if (sortingState === num) {
      setSortingState(-num);
    } else {
      setSortingState(num);
    }
  };

  const Vocabulary = () => (
    <div className="card">
      <table className="table">
        <thead>
          <tr className="table-row">
            <th className="table-h">
              <span
                className={sortingState === 1 || sortingState === -1 ? 'text-primary table-h-clickable' : 'table-h-clickable'}
                onClick={() => sortClick(1)} role="presentation"
              >
                <span>{lang.word}</span>
                <span className={sortingState === 1 || sortingState === -1 ? 'font-inherit' : 'hidden'}>
                  <i className={sortingState === 1 ? 'bi bi-sort-alpha-down' : 'bi bi-sort-alpha-down-alt'} />
                </span>
              </span>
              <span className="dash">&mdash;</span>
              <span
                className={sortingState === 2 || sortingState === -2 ? 'text-primary table-h-clickable' : 'table-h-clickable'}
                onClick={() => sortClick(2)} role="presentation"
              >
                <span>{lang.translation}</span>
                <span className={sortingState === 2 || sortingState === -2 ? 'font-inherit' : 'hidden'}>
                  <i className={sortingState === 2 ? 'bi bi-sort-alpha-down' : 'bi bi-sort-alpha-down-alt'} />
                </span>
              </span>
            </th>
            <th className="table-h">
              <span>
                {lang.transcription}
              </span>

            </th>
            <th className="table-h">

              <span
                className={sortingState === 3 || sortingState === -3 ? 'text-primary table-h-clickable' : 'table-h-clickable'}
                onClick={() => sortClick(3)} role="presentation"
              >
                <span>{lang.group}</span>

                <span className={sortingState === 3 || sortingState === -3 ? 'font-inherit' : 'hidden'}>
                  <i className={sortingState === 3 ? 'bi bi-sort-numeric-down' : 'bi bi-sort-numeric-down-alt'} />
                </span>

              </span>
            </th>
            <th className="table-h">
              <div
                className={sortingState === 4 || sortingState === -4 ? 'flex text-primary table-h-clickable' : 'flex table-h-clickable'}
                onClick={() => sortClick(4)} role="presentation"
              >
                <div>
                  <div>{lang.next}</div>
                  <div>{lang.training}</div>
                </div>
                <div className={sortingState === 4 || sortingState === -4 ? 'font-inherit' : 'hidden'}>
                  <i className={sortingState === 4 ? 'bi bi-sort-numeric-down' : 'bi bi-sort-numeric-down-alt'} />
                </div>
              </div>
            </th>
            <th className="table-h">
              <span
                className={sortingState === 5 || sortingState === -5 ? 'text-primary table-h-clickable' : 'table-h-clickable'}
                onClick={() => sortClick(5)} role="presentation"
              >
                <span>{lang.progress}</span>
                <span className={sortingState === 5 || sortingState === -5 ? 'font-inherit' : 'hidden'}>
                  <i className={sortingState === 5 ? 'bi bi-sort-numeric-down' : 'bi bi-sort-numeric-down-alt'} />
                </span>
              </span>
            </th>
            <th className="table-h"><span>{lang.action}</span></th>
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
          <h2 className="subheader-title heading2">{lang.pageName}</h2>
          <nav>
            <ul className="subheader-menu">
              <li
                className={filterState === 'active' ? 'subheader-menu_link active' : 'subheader-menu_link'}
                onClick={() => navigate('active')}
                role="presentation"
              >
                {lang.linkActive}
              </li>
              <li
                className={filterState === 'difficult' ? 'subheader-menu_link active' : 'subheader-menu_link'}
                onClick={() => navigate('difficult')}
                role="presentation"
              >
                {lang.linkDifficult}
              </li>
              <li
                className={filterState === 'deleted' ? 'subheader-menu_link active' : 'subheader-menu_link'}
                onClick={() => navigate('deleted')}
                role="presentation"
              >
                {lang.linkDeleted}
              </li>
            </ul>
          </nav>
        </div>
        <div className="subheader-search search__form">

          <div className="search__group">
            <input className="search__box" type="text" placeholder={lang.search} />
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
        {/* <div className="subheader-right-side">
          <div className="subheader-dropdown filter">
            <span className="btn-icon"><i className="bi bi-filter" /></span>
            {lang.filters}
            <i className="bi bi-chevron-down" />
          </div>
          <div className="subheader-dropdown sort">
            <div className="btn-icon"><i className="bi bi-sort-down-alt" /></div>
            A-Z
            <i className="bi bi-chevron-down" />
          </div>
        </div> */}
      </header>
      <WordCard obj={userWords[0]} isLanguageRU={isLanguageRU} />
      <div className="container">
        {content}
      </div>
    </div>

  );
};

export default VocabularyPage;
