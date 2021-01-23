import React, { useState } from 'react';
import './settings-page.scss';
import {
  settingsPageProps,
  userSettings,
} from '../../constants/interfaces';


interface IndependentCardSettings {
  cardTranscription: boolean,
  cardImage: boolean,
  autoSound: boolean,
  answerButton: boolean,
  statusButtons: boolean,
  feedbackButtons: boolean,
}
interface CardSettings {
  cardWordPronunciation: boolean,
  cardTranslation: boolean,
  cardExplanation: boolean,
  cardExample: boolean,
  cardTranslationAfterSuccess: boolean,
  cardExplanationTranslation: boolean,
  cardExampleTranslation: boolean,
  cardExplanationTranslationAfter: boolean,
  cardExampleTranslationAfter: boolean,
}

const getSet1 = ({ optional }: userSettings) => {
  const result: IndependentCardSettings = {
    cardTranscription: optional.cardTranscription,
    cardImage: optional.cardImage,
    autoSound: optional.autoSound,
    answerButton: optional.answerButton,
    statusButtons: optional.statusButtons,
    feedbackButtons: optional.feedbackButtons,
  }
  return result;
}
const getSet2 = ({ optional }: userSettings) => {
  const result: CardSettings = {
    cardWordPronunciation: optional.cardWordPronunciation,
    cardTranslation: optional.cardTranslation,
    cardExplanation: optional.cardExplanation,
    cardExample: optional.cardExample,
    cardTranslationAfterSuccess: optional.cardTranslationAfterSuccess,
    cardExplanationTranslation: optional.cardExplanationTranslation,
    cardExampleTranslation: optional.cardExampleTranslation,
    cardExplanationTranslationAfter: optional.cardExplanationTranslationAfter,
    cardExampleTranslationAfter: optional.cardExampleTranslationAfter,
  }
  return result;
}


function SettingsPage(props: settingsPageProps) {
  let basicSettingsAtention: string = '';
  let acceptButtonState: boolean = true;
  const { settings } = props;
  const [set1, setSet1] = useState<IndependentCardSettings>(getSet1(settings));
  const [set2, setSet2] = useState<CardSettings>(getSet2(settings));

  const onChangeSet1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    setSet1((previousState: IndependentCardSettings) => {
      return {
        ...previousState,
        [name]: value,
      }
    });
  }

  const onChangeSet2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    setSet2((previousState: CardSettings) => {
      return {
        ...previousState,
        [name]: value,
      }
    });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('onsubmit');
  }

  if (!(set2.cardWordPronunciation || set2.cardExample || set2.cardExplanation || set2.cardTranslation)) {
    acceptButtonState = false;
    basicSettingsAtention = 'выберите минимум 1 пункт'
  }

  const acceptButton = acceptButtonState ? <input type="submit" value="Принять" /> : null;

  return (
    <div className="settings-page">
      <h2>Settings page</h2>
      <h3>Карточка</h3>

      <form
        onSubmit={onSubmit} >
        <p>Выберите минимум 1 из 4</p>
        <div className="attention-message">{basicSettingsAtention}</div>
        <label>
          <input
            type="checkbox"
            name='cardTranslation'
            checked={set2.cardTranslation}
            onChange={onChangeSet2}
          />
          показывать перевод
          </label>
        <label>
          <input
            type="checkbox"
            name='cardExample'
            checked={set2.cardExample}
            onChange={onChangeSet2}
          />
         показывать пример
          </label>
        <label>
          <input
            type="checkbox"
            name='cardExplanation'
            checked={set2.cardExplanation}
            onChange={onChangeSet2}
          />
         показывать объяснение
          </label>
        <label>
          <input
            type="checkbox"
            name='cardWordPronunciation'
            checked={set2.cardWordPronunciation}
            onChange={onChangeSet2}
          />
          воспроизводить слово
          </label>
        <hr />

        <label>
          <input
            type="checkbox"
            name='cardTranscription'
            checked={set1.cardTranscription}
            onChange={onChangeSet1}
          />
          транскрипция
          </label>
        <label>
          <input
            type="checkbox"
            name='cardImage'
            checked={set1.cardImage}
            onChange={onChangeSet1}
          />
          картинка
          </label>
        <label>
          <input
            type="checkbox"
            name='autoSound'
            checked={set1.autoSound}
            onChange={onChangeSet1}
          />
          воспроизводить после ответа
          </label>
        <label>
          <input
            type="checkbox"
            name='cardTranslationAfterSuccess'
            checked={set2.cardTranslationAfterSuccess}
            onChange={onChangeSet2}
          />
          показывать перевод слова после ответа
          </label>
        <label>
          <input
            type="checkbox"
            name='cardExampleTranslation'
            checked={set2.cardExampleTranslation}
            onChange={onChangeSet2}
          />
          перевод примера
          </label>
        <label>
          <input
            type="checkbox"
            name='cardExplanationTranslation'
            checked={set2.cardExplanationTranslation}
            onChange={onChangeSet2}
          />
          перевод объяснения
          </label>
        <label>
          <input
            type="checkbox"
            name='cardExplanationTranslationAfter'
            checked={set2.cardExplanationTranslationAfter}
            onChange={onChangeSet2}
          />
          перевод объяснения после ответа
          </label>
        <label>
          <input
            type="checkbox"
            name='cardExampleTranslationAfter'
            checked={set2.cardExampleTranslationAfter}
            onChange={onChangeSet2}
          />
          перевод примера после ответа
          </label>
        <label>
          <input
            type="checkbox"
            name='answerButton'
            checked={set1.answerButton}
            onChange={onChangeSet1}
          />
          кнопка "Показать ответ"
          </label>
        <label>
          <input
            type="checkbox"
            name='statusButtons'
            checked={set1.statusButtons}
            onChange={onChangeSet1}
          />
          кнопки статуса слова
          </label>
        <label>
          <input
            type="checkbox"
            name='feedbackButtons'
            checked={set1.feedbackButtons}
            onChange={onChangeSet1}
          />
          кнопки интервального повторения
          </label>
        {acceptButton}
      </form>
    </div>
  );
}

export default SettingsPage;
