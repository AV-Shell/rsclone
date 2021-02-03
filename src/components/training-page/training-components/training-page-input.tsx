import React from 'react';
import { IforInput, TsoundsObject } from '../training-page-interfaces';
import { soundControl, playSounds, playSingleSound } from './training-simple-functions';
import { MAX_REPEAT_LEVEL, MIN_REPEAT_LEVEL } from '../training-consts';

export default function InputControl(props: IforInput) {
  const {
    value, updateValue, theWord, isAnswerSet, updateAnswerSet, isTrue, updateAnswer, isSoundOn,
    isAutoPlayOn, counter, success, playExample, playMeaning, soundsObject, isAutoFocus, updateAutoFocus,
    updateCounter, updateSuccess, isSoundBtnShown, intervalLevel, updateIntervalLevel, isIntervalUsed,
  } = props;

  const audioIcon: string = isSoundOn ? 'bi bi-volume-up-fill' : 'bi bi-volume-mute-fill';

  const InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    updateValue(event.target.value);
  };

  const KeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateCounter(counter + 1);
      updateAnswerSet(true);
      updateAutoFocus(false);
      console.log('enter pressed in input');
      if (value.toLocaleLowerCase() === theWord.toLocaleLowerCase()) {
        console.log('that is right');
        updateAnswer(true);
        updateAnswerSet(true);
        updateSuccess(success + 1);
        if (isIntervalUsed) {
          if (intervalLevel < (MAX_REPEAT_LEVEL - 1)) {
            updateIntervalLevel(intervalLevel + 2);
          } else {
            updateIntervalLevel(MAX_REPEAT_LEVEL);
          }
        }
      } else {
        updateValue(theWord);
        updateAnswer(false);
        updateAnswerSet(true);
        if (intervalLevel !== MIN_REPEAT_LEVEL) {
          updateIntervalLevel(1);
        }
      }
      if (isAutoPlayOn && isSoundOn) {
        soundControl(soundsObject).catch((e) => true);
        if (playExample && playMeaning) {
          playSounds(soundsObject).catch((e) => true);
        } else if (playMeaning) {
          const newSoundsObject: TsoundsObject = {
            wordSound: soundsObject.wordSound,
            meaningSound: soundsObject.meaningSound,
          };
          playSounds(newSoundsObject).catch((e) => true);
        } else if (playExample) {
          const newSoundsObject: TsoundsObject = {
            wordSound: soundsObject.wordSound,
            exampleSound: soundsObject.exampleSound,
          };
          playSounds(newSoundsObject).catch((e) => true);
        }
      }
    }
  };

  if (isAnswerSet) {
    console.log('isAnswerSet true');
    const cssStyle: string = isTrue ? 'training-card-body-word-details-field-input green'
      : 'training-card-body-word-details-field-input red';
    return (
      <div
        className="training-card-body-word-details-field"
      >
        <SoundButton
          isShown={isSoundBtnShown}
          isSoundOn={isSoundOn}
          classCss={audioIcon}
          soundObject={soundsObject}
        />
        <input
          className={cssStyle}
          type="text"
          size={theWord.length}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={false}
          spellCheck={false}
          value={value}
          disabled
        />
      </div>
    );
  }
  console.log('isAnswerSet false');
  return (
    <div
      className="training-card-body-word-details-field"
    >
      <SoundButton
        isShown={isSoundBtnShown}
        isSoundOn={isSoundOn}
        classCss={audioIcon}
        soundObject={soundsObject}
      />
      <input
        className="training-card-body-word-details-field-input"
        type="text"
        size={theWord.length}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={isAutoFocus}
        maxLength={theWord.length}
        spellCheck={false}
        onKeyPress={KeyPressHandler}
        value={value}
        onChange={InputChangeHandler}
      />
    </div>
  );
}

interface SoundProps {
  isShown: boolean,
  isSoundOn: boolean,
  classCss: string,
  soundObject: TsoundsObject
}

function SoundButton(props: SoundProps) {
  const {
    isShown, isSoundOn, classCss, soundObject,
  } = props;

  if (!isShown) {
    return null;
  }

  const SoundHandler = () => {
    soundControl(soundObject).catch((e) => true);
    if (isSoundOn) {
      playSingleSound(soundObject.wordSound).catch((e) => true);
    }
  };

  return (<i role="presentation" className={classCss} onClick={SoundHandler} />);
}
