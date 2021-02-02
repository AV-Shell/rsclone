import React, { useState } from 'react';
import './training-configure.scss';
import {
  shadowTrainingProps,
  startTrainingParams,
  trainingType,
} from '../../../../constants/interfaces';

import {
  MIN_NEW_WORDS_PER_DAY,
  MAX_NEW_WORDS_PER_DAY,
  MIN_REPEAT_WORDS_PER_DAY,
  MAX_REPEAT_WORDS_PER_DAY,
} from '../../../../constants/constants';
import { RU, EN } from './languages';

interface ITrainingSettings {
  title: string,
  trainingCount: string,
  wordsHard: string,
  wordsLeft: string,
  newWords: string,
  repeatWords: string,
  trainingNew: string,
  trainingWithout: string,
  trainingNewOnly: string,
  trainingDifficult: string,
}

interface IWordsSetting {
  new: number,
  repeat: number,
}

interface Iprops extends shadowTrainingProps {
  dailyTrainingCount: number,
  startTraining: (typeOfTraining: startTrainingParams) => void
}

const TrainingConfigure: React.FC<Iprops> = (props: Iprops) => {
  console.log(props);

  const {
    userWords, statistic, settings, startTraining, dailyTrainingCount,
  } = props;
  const [wordsSetting, setWordsSetting] = useState<IWordsSetting>({
    new: settings.optional.newWordsPerDay,
    repeat: settings.optional.repeatWordsPerDay,
  });

  // заменить с приходом языка в пропсы
  const language: ITrainingSettings = EN;

  const changeTrainingWordsSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    let value = +event.target.value;

    if ((name === 'new') && (value > MAX_NEW_WORDS_PER_DAY)) {
      value = MAX_NEW_WORDS_PER_DAY;
    } else if ((name === 'new') && (value < MIN_NEW_WORDS_PER_DAY)) {
      value = MIN_NEW_WORDS_PER_DAY;
    } else if ((name === 'repeat') && (value > MAX_REPEAT_WORDS_PER_DAY)) {
      value = MAX_REPEAT_WORDS_PER_DAY;
    } else if ((name === 'repeat') && (value < MIN_REPEAT_WORDS_PER_DAY)) {
      value = MIN_REPEAT_WORDS_PER_DAY;
    }

    setWordsSetting((old) => {
      console.log('');
      return {
        ...old,
        [name]: value,
      };
    });
  };

  console.log('wordsSetting', wordsSetting);

  const startTrainingWithWords = (trainingType: trainingType) => {
    const startTrainingParams: startTrainingParams = {
      trainingType,
      newWords: wordsSetting.new,
      repeatWords: wordsSetting.repeat,
    };
    startTraining(startTrainingParams);
  };

  if ((settings === null) || (statistic === null) || (userWords === null)) {
    return <div className="No props Shadow Traning Page" />;
  }
  console.log('wordsSetting', wordsSetting);
  return (
    <div className="training-configure">
      <div className="wrapper">
        <h2 className="training-configure-title">
          <svg
            width="28"
            height="28"
            viewBox="0 0 34 34"
            fill="#181C32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.4337 16.2929L24.0833 20.6433L13.3567 9.91671L17.7071 5.56631L18.4142 4.85921L17.7071
              4.1521L15.6813 2.12627L14.9741 1.41916L14.267 2.12627L12.9483 3.44499L11.6296 2.12627L10.9225
              1.41916L10.2154 2.12627L7.89081 4.45083L6.57209 3.1321L5.86498 2.42499L5.15787 3.1321L3.13204
              5.15793L2.42493 5.86504L3.13204 6.57215L4.45077 7.89087L2.12621 10.2154L1.4191 10.9225L2.12621
              11.6296L3.44493 12.9484L2.12621 14.2671L1.4191 14.9742L2.12621 15.6813L4.15204 17.7071L4.85915
              18.4143L5.56625 17.7071L9.91665 13.3568L20.6433 24.0834L16.2929 28.4338L15.5858 29.1409L16.2929
              29.848L18.3187 31.8738L19.0258 32.5809L19.7329 31.8738L21.0516 30.5551L22.3704 31.8738L23.0775
              32.5809L23.7846 31.8738L26.1091 29.5493L27.4279 30.868L28.135 31.5751L28.8421 30.868L30.8679
              28.8421L31.575 28.135L30.8679 27.4279L29.5492 26.1092L31.8738 23.7847L32.5809 23.0775L31.8738
              22.3704L30.555 21.0517L31.8738 19.733L32.5809 19.0259L31.8738 18.3188L29.8479 16.2929L29.1408
              15.5858L28.4337 16.2929Z" stroke="none" strokeWidth="0"
            />
          </svg>
          &nbsp;
          {language.title}
        </h2>
        <div className="training-template">
          <div className="training-template-header">
            <div className="training-template-header-count">
              {language.trainingCount}
              &nbsp;
              {dailyTrainingCount}
            </div>
            <div className="training-template-header-hard-words">
              {language.wordsHard}
            </div>
            <div className="training-template-header-left-words">
              {language.wordsLeft}
            </div>
          </div>
          <div className="training-template-body">
            <label htmlFor="newWordsSelector" className="label-for-new">
              {language.newWords}
              &nbsp;
              <input
                onChange={changeTrainingWordsSettings}
                type="number" id="newWordsSelector" name="new"
                min="3" max="15" value={wordsSetting.new}
              />
            </label>
            <label htmlFor="repeatWordsSelector" className="label-for-repeat">
              {language.repeatWords}
              &nbsp;
              <input
                onChange={changeTrainingWordsSettings}
                type="number" id="repeatWordsSelector" name="repeat"
                min="10" max="35" value={wordsSetting.repeat}
              />
            </label>
          </div>
          <div className="training-template-footer">
            <button
              type="button"
              className="training-template-footer-btn-whole template-btn"
              onClick={() => startTrainingWithWords('mixed')}
            >
              {language.trainingNew}
            </button>
            <button
              type="button"
              className="training-template-footer-btn-without-new template-btn"
              onClick={() => startTrainingWithWords('repeat')}
            >
              {language.trainingWithout}
            </button>
            <button
              type="button"
              className="training-template-footer-btn-new template-btn"
              onClick={() => startTrainingWithWords('new')}
            >
              {language.trainingNewOnly}
            </button>
            <button
              type="button"
              className="training-template-footer-btn-difficult template-btn"
              onClick={() => startTrainingWithWords('difficult')}
            >
              {language.trainingDifficult}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingConfigure;
