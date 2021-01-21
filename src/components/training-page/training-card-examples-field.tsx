import React, { useState } from 'react';
import {
  IconForSound, ForCardExamples, TranslationProps, LineWrapperProps
} from './training-page-interfaces';

export default function TrainingCardExamples(props: ForCardExamples) {
  const {
    isExampleShown, isExampleTranslationShown, isMeaningShown, isMeaningTranslationShown, showTranslationAfter,
    isSoundOn, isAnswered, soundExample, soundMeaning, exampleString, meaningString,
    exampleTranslationString, meaningTranslationString
  } = props;
  
  const objForExample: LineWrapperProps = {
    isShown: isExampleShown,
    hasAnswer: isAnswered,
    line: exampleString,
    classCSS: "sentence-eng",
    openTag:'<b>', 
    closingTag:'</b>'    
  }
  const objForMeaning: LineWrapperProps = {
    isShown: isMeaningShown,
    hasAnswer: isAnswered,
    line: meaningString,
    classCSS: "meaning-eng",
    openTag:'<i>', 
    closingTag:'</i>'  
  }
  
  const objForExampleTranslation: TranslationProps = {
    isShown: isExampleTranslationShown,
    isShownAfter: showTranslationAfter,
    hasAnswer: isAnswered,
    line: exampleTranslationString,
    classCSS: 'sentence-ru'
  }
  const objForMeaningTranslation: TranslationProps = {
    isShown: isMeaningTranslationShown,
    isShownAfter: showTranslationAfter,
    hasAnswer: isAnswered,
    line: meaningTranslationString,
    classCSS: 'meaning-ru'
  }

  return (
    <div className="training-card-body-examples">
      <SoundOnSentences isSoundOn={isSoundOn}
                sound={soundExample}
                forCSS="example-sound" />
      <SoundOnSentences isSoundOn={isSoundOn}
                sound={soundMeaning}
                forCSS="meaning-sound" />
      <SentenceWithBlancs {...objForExample}/>
      <TranslationSentence {...objForExampleTranslation}/>
      <SentenceWithBlancs {...objForMeaning}/>
      <TranslationSentence {...objForMeaningTranslation}/>
    </div>
  )
}

function SoundOnSentences(props: IconForSound) {
  const {isSoundOn, sound, forCSS} = props;

  const classCSS: string = isSoundOn ? `bi bi-volume-up-fill ${forCSS}` : `bi bi-volume-mute-fill ${forCSS}`;

  const SoundHandler = () => {
    if (isSoundOn) {
      sound().catch(() => true);  
    }
  }
  return (
    <i className={classCSS} onClick={SoundHandler}></i>
  )
}

function SentenceWithBlancs(props: LineWrapperProps) {
  const {isShown, hasAnswer, line, classCSS, openTag, closingTag} = props;
  if (!isShown) {
    return null
  };
  const pos1:number = line.indexOf(openTag);
  const pos2:number = line.indexOf(closingTag);
  const dash:string = line.slice(pos1 + 3, pos2);
  const dashFill:string = ('_').repeat(dash.length);

  if (hasAnswer) {
    if (openTag === '<b>' && closingTag === '</b>') {
      return (
      <p className={classCSS}>
      {line.slice(0, pos1)}
      <strong>
        {dash}
      </strong>
      {line.slice(pos2 + 4)}
      </p>);
    };
      return (
      <p className={classCSS}>
        {line.slice(0,pos1)}
        <em>
          {dash}
        </em>
        {line.slice(pos2 + 4)}
        </p>);
  };
  if (openTag === '<b>' && closingTag === '</b>') { 
    return (
      <p className={classCSS}>
      {line.slice(0, pos1)}
      {dashFill}
      {line.slice(pos2 + 4)}
      </p>)    
  };
  return (
    <p className={classCSS}>
      {line.slice(0,pos1)}
      {dashFill}
      {line.slice(pos2 + 4)}
    </p>);
};
  
function TranslationSentence(props: TranslationProps) {
  const {isShown, isShownAfter, hasAnswer, line, classCSS} = props;
  if (isShown && (!isShownAfter || hasAnswer)) {
    return (<p className={classCSS}>{line}</p>);
  };
  return null;  
}
