import React, { useState } from 'react';
import './settings-page.scss';
import {
  settingsPageProps,
  IUserSettings,
} from '../../constants/interfaces';

import {
  MIN_AVATAR_NUM,
  MAX_AVATAR_NUM,
  AVA_URL,
} from '../../constants/constants';

import {
  limitMinMax,
} from '../../helpers/utils';

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

const getSet1 = ({ optional }: IUserSettings) => {
  const result: IndependentCardSettings = {
    cardTranscription: optional.cardTranscription,
    cardImage: optional.cardImage,
    autoSound: optional.autoSound,
    answerButton: optional.answerButton,
    statusButtons: optional.statusButtons,
    feedbackButtons: optional.feedbackButtons,
  };
  return result;
};

const getSet2 = ({ optional }: IUserSettings) => {
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
  };
  return result;
};

const SettingsPage: React.FC<settingsPageProps> = (props: settingsPageProps) => {
  let basicSettingsAtention: string = '';
  let acceptButtonState: boolean = true;
  const {
    settings, apiService, isLanguageRU, updateSettings,
  } = props;
  const [set1, setSet1] = useState<IndependentCardSettings>(getSet1(settings));
  const [set2, setSet2] = useState<CardSettings>(getSet2(settings));
  const [avatarNumber, setAvatarNumber] = useState<number>(settings.optional.avatarID);
  const onChangeSet1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const value = target.checked;
    const { name } = target;
    setSet1((previousState: IndependentCardSettings) => ({ ...previousState, [name]: value }));
  };

  const onChangeSet2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const value = target.checked;
    const { name } = target;
    let iscardTranslationAfterSuccess = set2.cardTranslationAfterSuccess;
    let isCardExplanationTranslation = set2.cardExplanationTranslation;
    let isCardExplanationTranslationAfter = set2.cardExplanationTranslationAfter;
    let isCardExampleTranslation = set2.cardExampleTranslation;
    let isCardExampleTranslationAfter = set2.cardExampleTranslationAfter;

    if ((name === 'cardTranslation') && (value === true)) {
      iscardTranslationAfterSuccess = false;
    }

    if ((name === 'cardExplanation') && (value === false)) {
      isCardExplanationTranslation = false;
      isCardExplanationTranslationAfter = false;
    }

    if ((name === 'cardExample') && (value === false)) {
      isCardExampleTranslation = false;
      isCardExampleTranslationAfter = false;
    }

    if ((name === 'cardExplanationTranslation') && (value === true)) {
      isCardExplanationTranslationAfter = false;
    }

    if ((name === 'cardExplanationTranslationAfter') && (value === true)) {
      isCardExplanationTranslation = false;
    }

    if ((name === 'cardExampleTranslation') && (value === true)) {
      isCardExampleTranslationAfter = false;
    }

    if ((name === 'cardExampleTranslationAfter') && (value === true)) {
      isCardExampleTranslation = false;
    }

    setSet2((previousState: CardSettings) => ({
      ...previousState,
      cardTranslationAfterSuccess: iscardTranslationAfterSuccess,
      cardExplanationTranslation: isCardExplanationTranslation,
      cardExplanationTranslationAfter: isCardExplanationTranslationAfter,
      cardExampleTranslation: isCardExampleTranslation,
      cardExampleTranslationAfter: isCardExampleTranslationAfter,
      [name]: value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    settings.optional = {
      ...settings.optional,
      ...set1,
      ...set2,
      avatarID: avatarNumber,
    };

    apiService.updateSettings(settings)
      .then(() => {
        console.log('все хорошо');
      })
      .catch(() => {
        console.log('все плохо');
      });
    updateSettings({
      wordsPerDay: settings.wordsPerDay,
      optional: settings.optional,
    });
  };

  const onChangeAvatarNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = limitMinMax(+event.target.value, MIN_AVATAR_NUM, MAX_AVATAR_NUM);
    setAvatarNumber(value);
  };

  if (!(set2.cardWordPronunciation || set2.cardExample || set2.cardExplanation || set2.cardTranslation)) {
    acceptButtonState = false;
    basicSettingsAtention = 'выберите минимум 1 пункт';
  }

  const acceptButton = acceptButtonState ? <button type="submit" className="accept-button">Принять</button> : null;

  return (
    <div className="settings-page">
      <div className="subheader">
        <h2 className="heading2">Settings</h2>
      </div>
      <div className="container">
        <div className="avatar-settings">
          <h3>Аватарка</h3>
          <div className="avatar-settings-field">
            <label htmlFor="avatarNumber">
              {`Выберите Аватарку (${MIN_AVATAR_NUM}-${MAX_AVATAR_NUM}): `}
              <input
                className="avatar-input"
                onChange={onChangeAvatarNumber}
                type="number" id="avatarNumber" name="avatarNumber"
                min={MIN_AVATAR_NUM} max={MAX_AVATAR_NUM} value={avatarNumber}
              />
            </label>
            <div className="image-container">
              <img src={`${AVA_URL}ava_${avatarNumber}.png`} alt="Avatar" />
            </div>
          </div>
        </div>
        <div className="training-settings">
          <h3>Карточка</h3>
          <form onSubmit={onSubmit}>
            <div className="both-settings">
              <div className="main-settings">
                <p className="main-settings-info">Выберите минимум 1 из 4</p>
                <div className="attention-message">{basicSettingsAtention}</div>
                <label htmlFor="cardTranslation">
                  <input
                    type="checkbox" name="cardTranslation" id="cardTranslation"
                    checked={set2.cardTranslation} onChange={onChangeSet2}
                  />
                  показывать перевод
                </label>
                <label htmlFor="cardExample">
                  <input
                    type="checkbox" name="cardExample" id="cardExample"
                    checked={set2.cardExample} onChange={onChangeSet2}
                  />
                  показывать пример
                </label>
                <label htmlFor="cardExplanation">
                  <input
                    type="checkbox" name="cardExplanation" id="cardExplanation"
                    checked={set2.cardExplanation} onChange={onChangeSet2}
                  />
                  показывать объяснение
                </label>
                <label htmlFor="cardWordPronunciation">
                  <input
                    type="checkbox" name="cardWordPronunciation" id="cardWordPronunciation"
                    checked={set2.cardWordPronunciation} onChange={onChangeSet2}
                  />
                  воспроизводить слово
                </label>
              </div>
              <hr />
              <div className="facultative-settings">
                <label htmlFor="cardTranscription">
                  <input
                    type="checkbox" name="cardTranscription" id="cardTranscription"
                    checked={set1.cardTranscription} onChange={onChangeSet1}
                  />
                  транскрипция
                </label>
                <label htmlFor="cardImage">
                  <input
                    type="checkbox" name="cardImage" id="cardImage"
                    checked={set1.cardImage} onChange={onChangeSet1}
                  />
                  картинка
                </label>
                <label htmlFor="autoSound">
                  <input
                    type="checkbox" name="autoSound" id="autoSound"
                    checked={set1.autoSound} onChange={onChangeSet1}
                  />
                  воспроизводить после ответа
                </label>
                <label htmlFor="cardTranslationAfterSuccess">
                  <input
                    type="checkbox" name="cardTranslationAfterSuccess" id="cardTranslationAfterSuccess"
                    checked={set2.cardTranslationAfterSuccess} disabled={set2.cardTranslation}
                    onChange={onChangeSet2}
                  />
                  показывать перевод слова после ответа
                </label>
                <label htmlFor="cardExampleTranslation">
                  <input
                    type="checkbox" name="cardExampleTranslation" id="cardExampleTranslation"
                    checked={set2.cardExampleTranslation} disabled={!set2.cardExample} onChange={onChangeSet2}
                  />
                  перевод примера
                </label>
                <label htmlFor="cardExplanationTranslation">
                  <input
                    type="checkbox" name="cardExplanationTranslation" id="cardExplanationTranslation"
                    checked={set2.cardExplanationTranslation} disabled={!set2.cardExplanation} onChange={onChangeSet2}
                  />
                  перевод объяснения
                </label>
                <label htmlFor="cardExplanationTranslationAfter">
                  <input
                    type="checkbox" name="cardExplanationTranslationAfter" id="cardExplanationTranslationAfter"
                    checked={set2.cardExplanationTranslationAfter} disabled={!set2.cardExplanation} onChange={onChangeSet2}
                  />
                  перевод объяснения после ответа
                </label>
                <label htmlFor="cardExampleTranslationAfter">
                  <input
                    type="checkbox" name="cardExampleTranslationAfter" id="cardExampleTranslationAfter"
                    checked={set2.cardExampleTranslationAfter} disabled={!set2.cardExample} onChange={onChangeSet2}
                  />
                  перевод примера после ответа
                </label>
                <label htmlFor="answerButton">
                  <input
                    type="checkbox" name="answerButton" id="answerButton"
                    checked={set1.answerButton} onChange={onChangeSet1}
                  />
                  кнопка &quot;Показать ответ&quot;
                </label>
                <label htmlFor="statusButtons">
                  <input
                    type="checkbox" name="statusButtons" id="statusButtons"
                    checked={set1.statusButtons} onChange={onChangeSet1}
                  />
                  кнопки статуса слова
                </label>
                <label htmlFor="feedbackButtons">
                  <input
                    type="checkbox" name="feedbackButtons" id="feedbackButtons"
                    checked={set1.feedbackButtons} onChange={onChangeSet1}
                  />
                  кнопки интервального повторения
                </label>
              </div>
            </div>
            {acceptButton}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
