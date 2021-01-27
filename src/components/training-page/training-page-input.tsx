import React from 'react';
import { IforInput } from './training-page-interfaces';
import { soundControl } from './training-simple-functions';
import { MAX_REPEAT_LEVEL, MIN_REPEAT_LEVEL } from './training-consts';

export default function InputControl(props: IforInput) {
  const {
    value, updateValue, theWord, isAnswerSet, updateAnswerSet, isTrue, updateAnswer, isSoundOn,
    isAutoPlayOn,  counter, success, wordURL, playExample, playMeaning,
    updateCounter, updateSuccess, isSoundBtnShown, intervalLevel, updateIntervalLevel, isIntervalUsed
  } = props;
  
  const audioIcon: string = isSoundOn ? "bi bi-volume-up-fill" : "bi bi-volume-mute-fill";

  const playAll = async () => {
    soundControl();
    const wordSound: any = document.querySelector('.audio-word');
    const exampleSound: any = document.querySelector('.audio-example');
    const meaningSound: any = document.querySelector('.audio-meaning');
    wordSound!.play();
    if (playExample && playMeaning) {
      wordSound!.onended = () => {
        exampleSound!.play();
        exampleSound!.onended = () => {
          meaningSound!.play();
        }
      }
    } else if (playExample) {
      wordSound!.onended = () => {
        exampleSound!.play();
      }
    } else if (playMeaning) {
      wordSound!.onended = () => {
        meaningSound!.play();
      }
    }
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
        };
        if (isAutoPlayOn && isSoundOn) {
          playAll().catch(() => true);
          soundControl();
        }
      }
  };

  if (isAnswerSet) {
    console.log('isAnswerSet true');
    const cssStyle: string = isTrue ? "training-card-body-word-details-field-input green"
      : "training-card-body-word-details-field-input red";
    return (
    <div className="training-card-body-word-details-field">
      <audio className="audio-all audio-word" src={wordURL} preload={wordURL}></audio>
      <SoundButton isShown={isSoundBtnShown} isSoundOn={isSoundOn}
        classCss={audioIcon}/>
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
    <audio className="audio-all audio-word" src={wordURL} preload={wordURL}></audio>
    <SoundButton isShown={isSoundBtnShown} isSoundOn={isSoundOn}
        classCss={audioIcon}/>
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
  classCss: string
}

function SoundButton(props: SoundProps) {
  const { isShown, isSoundOn, classCss } = props;

  const stopAndPlay = async () => {
    const wordSound: any = document.querySelector('.audio-word');
    soundControl();
    wordSound!.play()
  };
  
  if (!isShown) {
    return null;
  };

  const SoundHandler =() => {
    if (isSoundOn) {
      stopAndPlay().catch(() => true);
    }
  }

  return (<i className={classCss} onClick={SoundHandler}></i>)
}
