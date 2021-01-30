import React, { useState, useEffect } from 'react';
import './create-settings.scss';
import Spinner from '../slave-components/spinner';

import {
  loadSettings,
  loadStatistic,
  limitMinMax,
} from '../../helpers/utils';

import {
  IgetSettingsPageResponce,
  userStatistics,
  userSettings,
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

function CreateSettings(props: ICreateSettingsProps) {
  const { apiService, getSettingsCallback } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNeedToCreateSettings, setIsNeedToCreateSettings] = useState<boolean>(false);
  const [englishWordsLevel, setEnglishWordsLevel] = useState<number>(0);
  const [avatarNumber, setAvatarNumber] = useState<number>(1); // TODO: create a random num from 1 to maxAvas

  const onChangeEnglishWordsLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = limitMinMax(+event.target.value, 0, TOTAL_DIFFICULTY_GROUPS - 1);
    setEnglishWordsLevel(value);
  };
  const onChangeAvatarNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = limitMinMax(+event.target.value, MIN_AVATAR_NUM, MAX_AVATAR_NUM);
    setAvatarNumber(value);
  };
  const onClick = () => {
    setIsLoading(true);
    const defaultSettings: userSettings = {
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
    apiService.updateSettings(defaultSettings)
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
    const defaultSettings: userSettings = {
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
    let success = false;
    loadSettings({ apiService })
      .then((settingsReso) => {
        if (settingsReso.result === USER_HAS_ENTITY) {
          loadStatistic({ apiService })
            .then((statisticResp) => {
              if (statisticResp.result === USER_HAS_ENTITY) {
                success = true;
                // TODO: something
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
          setIsNeedToCreateSettings(true);
          setIsLoading(false);
        }
        console.log(settingsReso);
      })
      .catch((err) => {
        getSettingsCallback(falseResponse);
        console.log('Create Settings: something went wrong', err.message);
      });
  }, []);

  // Component code start
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="create-settings">
      <h2>Вы больше не сможете поменять эти настройки</h2>
      <label >Введите ваш уровень знания слов(0-5):
        <input
          onChange={onChangeEnglishWordsLevel}
          type="number" id="englishWordsLevel" name="englishWordsLevel"
          min="0" max={TOTAL_DIFFICULTY_GROUPS - 1} value={englishWordsLevel}>
        </input>
      </label>
      <label >Выберите Аватарку({MIN_AVATAR_NUM}-{MAX_AVATAR_NUM}):
        <input
          onChange={onChangeAvatarNumber}
          type="number" id="avatarNumber" name="avatarNumber"
          min={MIN_AVATAR_NUM} max={MAX_AVATAR_NUM} value={avatarNumber}>
        </input>
      </label>
      <div className='image-container'>
        <img src={`${AVA_URL}ava_${avatarNumber}.png`} alt="Avatar" />
      </div>

      <span className="save-settings-button" onClick={onClick}>
        <span className="text-container">Принять</span>
      </span>
    </div>
  );
}

export default CreateSettings;
