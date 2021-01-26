import React from 'react';
import { IforInput, ISoundFunctionProps } from './training-page-interfaces';
import { soundControl } from './training-simple-functions';
import { MAX_REPEAT_LEVEL, MIN_REPEAT_LEVEL } from './training-consts';

export default function InputControl(props: IforInput) {
  const {
    value, updateValue, theWord, isAnswerSet, updateAnswerSet, isTrue, updateAnswer, isSoundOn, sounds,
    isAutoPlayOn, playExample, playMeaning, counter, success,
    updateCounter, updateSuccess, isSoundBtnShown, intervalLevel, updateIntervalLevel, isIntervalUsed
  } = props;
  
  const audioIcon: string = isSoundOn ? "bi bi-volume-up-fill" : "bi bi-volume-mute-fill";

  const soundObjectWord = sounds.soundWord;
  const soundObjectExample = sounds.soundExample;
  const soundObjectMeaning = sounds.soundMeaning;
  const playAll = async () => {
    soundObjectWord.load();
    soundObjectWord.play();
    if (playExample && playMeaning) {
      soundObjectExample.load();
      soundObjectMeaning.load();
      soundObjectWord.onended = () => {
      soundObjectExample.play();
      soundObjectExample.onended = () => {
        soundObjectMeaning.play();
        }
      }
    } else if (playExample) {
      soundObjectExample.load();
      soundObjectWord.onended = () => {
        soundObjectExample.play();
      }
    } else if (playMeaning) {
      soundObjectMeaning.load();
      soundObjectWord.onended = () => {
        soundObjectMeaning.play();
      }
    }
  };

  const wordSound = async () => {
    soundObjectWord.load();
    soundObjectWord.play();
  };

  const InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    updateValue(event.target.value);
  };

  const KeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateCounter(counter + 1);
      updateAnswerSet(true);
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
        };             
        } else {
          updateValue(theWord);
          updateAnswer(false);
          updateAnswerSet(true);
          if ((intervalLevel !== MIN_REPEAT_LEVEL) && isIntervalUsed) {
            updateIntervalLevel(1);
          }
        }
        if (isAutoPlayOn && isSoundOn) {
          playAll().catch(() => true);
        }
      }
  };

  if (isAnswerSet) {
    console.log('isAnswerSet true');
    const cssStyle: string = isTrue ? "training-card-body-word-details-field-input green"
      : "training-card-body-word-details-field-input red";
    return (
    <div className="training-card-body-word-details-field">
      <SoundButton isShown={isSoundBtnShown} isSoundOn={isSoundOn}
        wordSound={wordSound} classCss={audioIcon}/>
      <input 
        className={cssStyle} 
        type="text" 
        size={theWord.length}
        autoFocus={false} 
        spellCheck={false}
        value={value}
        disabled={true}/>
    </div>)
  } 
  console.log('isAnswerSet false');
  return (
  <div className="training-card-body-word-details-field">
    <SoundButton isShown={isSoundBtnShown} isSoundOn={isSoundOn}
        wordSound={wordSound} classCss={audioIcon}/>
    <input 
      className="training-card-body-word-details-field-input" 
      type="text" 
      size={theWord.length}
      autoFocus={true}
      maxLength={theWord.length} 
      spellCheck={false}
      onKeyPress={KeyPressHandler}
      value={value} 
      onChange={InputChangeHandler}
      />
  </div>)
}

interface SoundProps {
  isShown: boolean,
  isSoundOn: boolean,
  wordSound: ()=>Promise<void>,
  classCss: string
}

function SoundButton(props: SoundProps) {
  const { isShown, isSoundOn, wordSound, classCss } = props;
  
  if (!isShown) {
    return null;
  };

  const SoundHandler =() => {
    if (isSoundOn) {
      wordSound().catch(() => true);  
    }
  }

  return (<i className={classCss} onClick={SoundHandler}></i>)
}
