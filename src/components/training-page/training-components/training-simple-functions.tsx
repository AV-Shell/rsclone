import React from 'react';
import {
  upperButtonProps, lineProps, dayProgress, WordProgressProps, IlinePropsTranslation, TsoundsObject,
} from '../training-page-interfaces';
import WordProgressBar from '../../slave-components/word-progress-bar/word-progress-bar';

export function TrainingCardUpperBtn(props:upperButtonProps) {
  const {
    id, isShown, isAnswerRight, line, status, classCss, iClass, setStatusForObj,
  } = props;
  const classWhole: string = (id === status) ? `${classCss} active` : classCss;

  const ClickHandler = () => {
    setStatusForObj(id);
  };

  if (isShown && isAnswerRight) {
    return (
      <button
        type="button"
        onClick={ClickHandler}
        className={classWhole}
      >
        <i className={iClass} />
        &nbsp;
        <span>
          {line}
        </span>
      </button>
    );
  }
  return null;
}

export function TrainingCardLineCode(props:lineProps) {
  const {
    isTrue, line, classCss,
  } = props;
  if (isTrue) {
    return (<p className={classCss}>{line}</p>);
  }
  return null;
}

export function TrainingCardTranslationLine(props: IlinePropsTranslation) {
  const {
    isTrue, line, classCss, isShownAfter, isAnswered,
  } = props;
  if (isTrue) {
    return (<p className={classCss}>{line}</p>);
  }
  if (isShownAfter) {
    if (isAnswered) {
      return (<p className={classCss}>{line}</p>);
    }
  }
  return null;
}

export function TrainingCardImage(props:lineProps) {
  const {
    isTrue, line, classCss,
  } = props;
  if (isTrue) {
    return (
      <div className={classCss}>
        <img src={line} alt="word" />
      </div>
    );
  }
  return null;
}

export function TrainingProgressBar(props: dayProgress) {
  const { left, right } = props;
  const barWidth: number = Math.round((left / right) * 100);
  const perCent: string = `${barWidth}%`;

  return (
    <div className="training-progress-center">
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          style={{ width: perCent }}
        />
      </div>
    </div>
  );
}

export function WordProgress(props: WordProgressProps) {
  const { level, language } = props;

  return (
    <div className="word-progress">
      <WordProgressBar level={level} />
      <small>{language.intervalProgress}</small>
    </div>
  );
}

export function soundControl(soundsObject: TsoundsObject) {
  console.log(soundsObject);
  Object.values(soundsObject).forEach((sound) => {
    console.log(sound);
    sound.pause();
    // eslint-disable-next-line no-param-reassign
    sound.currentTime = 0.0;
    // eslint-disable-next-line no-param-reassign
    sound.onended = null;
  });
}
export async function playSingleSound(sound: HTMLAudioElement) {
  sound.load();
  sound.play();
}

export function playSounds(soundsObject: TsoundsObject) {
  const word: HTMLAudioElement = soundsObject.wordSound;
  const example: HTMLAudioElement | null = 'exampleSound' in soundsObject ? soundsObject.exampleSound : null;
  const meaning: HTMLAudioElement | null = 'meaningSound' in soundsObject ? soundsObject.meaningSound : null;

  soundControl(soundsObject);
  word.load();
  word.play();
  if (('exampleSound' in soundsObject) && ('meaningSound' in soundsObject)) {
    word.onended = () => {
      soundControl(soundsObject);
      meaning.load();
      meaning.play();
      meaning.onended = () => {
        soundControl(soundsObject);
        example.load();
        example.play();
      };
    };
  } else if ('exampleSound' in soundsObject) {
    word.onended = () => {
      soundControl(soundsObject);
      example.load();
      example.play();
    };
  } else if ('meaningSound' in soundsObject) {
    word.onended = () => {
      soundControl(soundsObject);
      meaning.load();
      meaning.play();
    };
  }
}
