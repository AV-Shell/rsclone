import React from 'react';
import {
  IconForSound, ForCardExamples, TranslationProps, LineWrapperProps,
} from '../training-page-interfaces';
import { soundControl, playSingleSound } from './training-simple-functions';

export default function TrainingCardExamples(props: ForCardExamples) {
  const {
    isExampleShown, isExampleTranslationShown, isMeaningShown, isMeaningTranslationShown,
    isSoundOn, isAnswered, exampleString, meaningString, soundsObject,
    exampleTranslationString, meaningTranslationString, isExampleTranslationAfter, isMeaningTranslationAfter,
  } = props;

  const meaningPlaying: HTMLAudioElement = soundsObject.meaningSound;
  const examplePlaying: HTMLAudioElement = soundsObject.exampleSound;

  const objForExample: LineWrapperProps = {
    isShown: isExampleShown,
    hasAnswer: isAnswered,
    line: exampleString,
    classCSS: 'sentence-eng',
    openTag: '<b>',
    closingTag: '</b>',
  };
  const objForMeaning: LineWrapperProps = {
    isShown: isMeaningShown,
    hasAnswer: isAnswered,
    line: meaningString,
    classCSS: 'meaning-eng',
    openTag: '<i>',
    closingTag: '</i>',
  };

  const objForExampleTranslation: TranslationProps = {
    isShown: isExampleTranslationShown,
    isShownAfter: isExampleTranslationAfter,
    hasAnswer: isAnswered,
    line: exampleTranslationString,
    classCSS: 'sentence-ru',
  };
  const objForMeaningTranslation: TranslationProps = {
    isShown: isMeaningTranslationShown,
    isShownAfter: isMeaningTranslationAfter,
    hasAnswer: isAnswered,
    line: meaningTranslationString,
    classCSS: 'meaning-ru',
  };

  return (
    <div className="training-card-body-examples">
      <SoundOnSentences
        isSoundOn={isSoundOn}
        forCSS="example-sound"
        isShown={isExampleShown}
        soundSelector=".audio-example"
        soundToPlay={examplePlaying}
        soundObject={soundsObject}
      />
      <SoundOnSentences
        isSoundOn={isSoundOn}
        forCSS="meaning-sound"
        isShown={isMeaningShown}
        soundSelector=".audio-meaning"
        soundToPlay={meaningPlaying}
        soundObject={soundsObject}
      />
      <SentenceWithBlancs {...objForMeaning} />
      <TranslationSentence {...objForMeaningTranslation} />
      <SentenceWithBlancs {...objForExample} />
      <TranslationSentence {...objForExampleTranslation} />
    </div>
  );
}

function SoundOnSentences(props: IconForSound) {
  const {
    isSoundOn, forCSS, isShown, soundToPlay, soundObject,
  } = props;
  if (!isShown) {
    return null;
  }

  const classCSS: string = isSoundOn ? `bi bi-volume-up-fill ${forCSS}` : `bi bi-volume-mute-fill ${forCSS}`;

  const SoundHandler = () => {
    soundControl(soundObject).catch((e) => true);
    if (isSoundOn) {
      playSingleSound(soundToPlay).catch((e) => true);
    }
  };
  return (
    <i role="presentation" className={classCSS} onClick={SoundHandler} />
  );
}

function SentenceWithBlancs(props: LineWrapperProps) {
  const {
    isShown, hasAnswer, line, classCSS, openTag, closingTag,
  } = props;
  if (!isShown) {
    return null;
  }
  const pos1:number = line.indexOf(openTag);
  const pos2:number = line.indexOf(closingTag);
  const dash:string = line.slice(pos1 + 3, pos2);
  const dashFill:string = ('_').repeat(dash.length);

  if (hasAnswer) {
    if (openTag === '<b>' && closingTag === '</b>') {
      return (
        <p
          className={classCSS}
        >
          {line.slice(0, pos1)}
          <strong>
            {dash}
          </strong>
          {line.slice(pos2 + 4)}
        </p>
      );
    }
    return (
      <p className={classCSS}>
        {line.slice(0, pos1)}
        <em>
          {dash}
        </em>
        {line.slice(pos2 + 4)}
      </p>
    );
  }
  if (openTag === '<b>' && closingTag === '</b>') {
    return (
      <p className={classCSS}>
        {line.slice(0, pos1)}
        {dashFill}
        {line.slice(pos2 + 4)}
      </p>
    );
  }
  return (
    <p className={classCSS}>
      {line.slice(0, pos1)}
      {dashFill}
      {line.slice(pos2 + 4)}
    </p>
  );
}

function TranslationSentence(props: TranslationProps) {
  const {
    isShown, isShownAfter, hasAnswer, line, classCSS,
  } = props;
  if (isShown) {
    return (<p className={classCSS}>{line}</p>);
  }
  if (isShownAfter && hasAnswer) {
    return (<p className={classCSS}>{line}</p>);
  }
  return null;
}
