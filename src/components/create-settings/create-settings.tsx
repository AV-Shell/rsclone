import React, { useState, useEffect } from 'react';
import './create-settings.scss';
import Spinner from '../slave-components/spinner';
import { switchUserLvl } from '../dashboard-page/utils';
import { RU, EN } from './langs';

import { loadSettings, loadStatistic, limitMinMax } from '../../helpers/utils';

import {
  IgetSettingsPageResponce,
  userStatistics,
  IUserSettings,
  ICreateSettingsProps,
} from '../../constants/interfaces';

import {
  USER_HAS_ENTITY,
  USER_NO_ENTITY,
  DEFAULT_USER_SETTINGS,
  DEFAULT_USER_STATISTIC,
  TOTAL_DIFFICULTY_GROUPS,
  MIN_AVATAR_NUM,
  MAX_AVATAR_NUM,
  AVA_URL,
} from '../../constants/constants';

const CreateSettings: React.FC<ICreateSettingsProps> = (
  props: ICreateSettingsProps,
) => {
  const { apiService, getSettingsCallback, isLanguageRU } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [englishWordsLevel, setEnglishWordsLevel] = useState<number>(0);
  const [avatarNumber, setAvatarNumber] = useState<number>(1);

  const onChangeEnglishWordsLevel = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = limitMinMax(
      +event.target.value,
      0,
      TOTAL_DIFFICULTY_GROUPS - 1,
    );
    setEnglishWordsLevel(value);
  };
  const onChangeAvatarNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = limitMinMax(
      +event.target.value,
      MIN_AVATAR_NUM,
      MAX_AVATAR_NUM,
    );
    setAvatarNumber(value);
  };
  const onClick = () => {
    setIsLoading(true);
    const defaultSettings: IUserSettings = {
      wordsPerDay: DEFAULT_USER_SETTINGS.wordsPerDay,
      optional: {
        ...DEFAULT_USER_SETTINGS.optional,
        avatarID: avatarNumber,
        userLanguageLevel: englishWordsLevel,
        createSettingsTimestamp: Date.now(),
      },
    };
    const defaultStatistic: userStatistics = {
      learnedWords: DEFAULT_USER_STATISTIC.learnedWords,
      optional: { ...DEFAULT_USER_STATISTIC.optional },
    };
    apiService
      .updateSettings(defaultSettings)
      .then(() => apiService.updateStatistics(defaultStatistic))
      .then(() => {
        getSettingsCallback({
          isSuccess: true,
          userSettings: defaultSettings,
          userStatistics: defaultStatistic,
        });
      })
      .catch(() => {
        getSettingsCallback({
          isSuccess: false,
          userSettings: defaultSettings,
          userStatistics: defaultStatistic,
        });
      });
  };

  useEffect(() => {
    const defaultSettings: IUserSettings = {
      wordsPerDay: DEFAULT_USER_SETTINGS.wordsPerDay,
      optional: { ...DEFAULT_USER_SETTINGS.optional },
    };
    const defaultStatistic: userStatistics = {
      learnedWords: DEFAULT_USER_STATISTIC.learnedWords,
      optional: { ...DEFAULT_USER_STATISTIC.optional },
    };
    const falseResponse: IgetSettingsPageResponce = {
      isSuccess: false,
      userSettings: defaultSettings,
      userStatistics: defaultStatistic,
    };
    loadSettings({ apiService })
      .then((settingsReso) => {
        if (settingsReso.result === USER_HAS_ENTITY) {
          loadStatistic({ apiService })
            .then((statisticResp) => {
              if (statisticResp.result === USER_HAS_ENTITY) {
                const response: IgetSettingsPageResponce = {
                  isSuccess: true,
                  userSettings: settingsReso.settings,
                  userStatistics: statisticResp.statistic,
                };
                getSettingsCallback(response);
              } else {
                getSettingsCallback(falseResponse);
              }
            })
            .catch((err) => {
              getSettingsCallback(falseResponse);
              console.log('Create Settings: something went wrong', err.message);
            });
        } else if (settingsReso.result === USER_NO_ENTITY) {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        getSettingsCallback(falseResponse);
        console.log('Create Settings: something went wrong', err.message);
      });
  }, []);
  let currentLang = isLanguageRU ? RU : EN;
  useEffect(() => {
    currentLang = isLanguageRU ? RU : EN;
  }, [isLanguageRU]);
  const userLvl = switchUserLvl(englishWordsLevel);
  // Component code start
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="create-settings">
      <div className="create-settings-wrapper">
        <h2>{currentLang.choseSetting}</h2>
        <div className="content-container">
          <div className="image-container">
            <img src={`${AVA_URL}ava_${avatarNumber}.png`} alt="Avatar" />
          </div>
          <div className="settings-container">
            <label htmlFor="englishWordsLevel">
              {currentLang.choseWords}
              <input
                onChange={onChangeEnglishWordsLevel}
                type="number"
                id="englishWordsLevel"
                name="englishWordsLevel"
                min="0"
                max={TOTAL_DIFFICULTY_GROUPS - 1}
                value={englishWordsLevel}
              />
            </label>
            <span>{userLvl}</span>
            <label htmlFor="avatarNumber">
              {`${currentLang.choseAvatar}${MIN_AVATAR_NUM}-${MAX_AVATAR_NUM}:`}
              <input
                onChange={onChangeAvatarNumber}
                type="number"
                id="avatarNumber"
                name="avatarNumber"
                min={MIN_AVATAR_NUM}
                max={MAX_AVATAR_NUM}
                value={avatarNumber}
              />
            </label>
            <span
              role="presentation"
              className="save-settings-button"
              onClick={onClick}
            >
              <span className="text-container">{currentLang.submit}</span>
            </span>
          </div>
        </div>
        <span className="attention">{currentLang.attention}</span>
      </div>
    </div>
  );
};

export default CreateSettings;
