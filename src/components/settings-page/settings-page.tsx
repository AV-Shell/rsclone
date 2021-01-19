import React, { useState } from 'react';
import './settings-page.scss';
import { settingsPageProps } from '../../constants/interfaces';


interface userSettingsOptional {
  newWordsPerDay: number,
  repeatWordsPerDay: number,
  userLanguageLevel: number,
  cardsPerDay: number,
  mixedCards: number,
  isSoundOn: boolean,
  cardTranslation: boolean,
  cardExplanation: boolean,
  cardExample: boolean,
  cardTranscription: boolean,
  cardImage: boolean,
  cardTranslationAfterSuccess: boolean,
  cardExplanationTranslation: boolean,
  cardExampleTranslation: boolean,
  autoSound: boolean,
  answerButton: boolean,
  deleteButton: boolean,
  difficultWordsButton: boolean,
  feedbackButtons: boolean,
  vocabularyExplanation: boolean,
  vocabularyExample: boolean,
  vocabularyTranscription: boolean,
  vocabularyImage: boolean,
  mainGameShort: string,
  mainGameLong: string,
  commonProgress: number,
  savannaSettings: string,
  magicButtonSettings: string,
}



function SettingsPage(props: settingsPageProps) {
  const { settings } = props;
  const { optional } = settings;
  const [state, setState] = useState<userSettingsOptional>(optional);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.checked;

    const name = target.name;
    setState((previousState: userSettingsOptional) => {
      return {
        ...previousState,
        [name]: value,
      }
    });
  }


  // Component code start
  return (
    <div className="settings-page">
      <h2>Settings page</h2>
      <h3>Карточка</h3>
      <form>
        <div>
          <p>Выберите минимум 1 из 4</p>
          <label>
            <input type="checkbox"
              name='cardTranslation'
              checked={state.cardTranslation}
              onChange={handleInputChange}
            />
          показывать перевод
          </label>
          <label>
            <input type="checkbox" />
         показывать пример
          </label>
          <label>
            <input type="checkbox" />
         показывать объяснение
          </label>
          <label>
            <input type="checkbox" />
          воспроизводить слово
          </label>
          <br />
        </div>
        <label>
          <input type="checkbox" />
          транскрипция
          </label>
        <label>
          <input type="checkbox" />
          картинка
          </label>
        <label>
          <input type="checkbox" />
          перевод примера
          </label>
        <label>
          <input type="checkbox" />
          перевод объяснения
          </label>
        <label>
          <input type="checkbox" />
          кнопка "Показать ответ"
          </label>
        <label>
          <input type="checkbox" />
          кнопки статуса слова
          </label>
        <label>
          <input type="checkbox" />
          кнопки интервального повторения
          </label>
        <input type="submit" value="Принять" />
      </form>
    </div>
  );
}

export default SettingsPage;
