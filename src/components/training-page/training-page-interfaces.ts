import React from 'react';

export interface upperButtonProps {
  id: 'active' | 'deleted' | 'difficult',
  isShown:boolean,
  isAnswerRight: boolean,
  isWordNew: boolean,
  status: string;
  line:string,
  classCss: string,
  iClass: string
  setStatusForObj: React.Dispatch<React.SetStateAction<'active' | 'deleted' | 'difficult'>>
}
export interface lineProps {
  isTrue:boolean,
  line:string,
  classCss: string,
}
export interface forInput {
  value: string,
  updateValue: React.Dispatch<React.SetStateAction<string>>,
  theWord: string,
  isAnswerSet: boolean,
  updateAnswerSet: React.Dispatch<React.SetStateAction<boolean>>,
  isTrue: boolean,
  updateAnswer: React.Dispatch<React.SetStateAction<boolean>>,
  isSoundOn: boolean,
  wordSound: ()=>Promise<void>,
  isAutoPlayOn: boolean,
  exampleSound: ()=>Promise<void>,
  meaningSound: ()=>Promise<void>
}

type IntervalTime = {
  [days: number]: number 
};

export interface forStars {
  level: number
}

export interface dayProgress {
  left: number,
  right: number
}


export interface forFooter {
  hasShowAnswerButton: boolean,
  hasIntervalButtons: boolean,
  currentWord: string,
  updateInput: React.Dispatch<React.SetStateAction<string>>,
  hasAnswer: boolean,
  updateHasAnswer: React.Dispatch<React.SetStateAction<boolean>>
  intervalLevel: string,
  updateIntervalLevel: React.Dispatch<React.SetStateAction<string>>,
  isAnswerTrue: boolean
}

export interface footerBtns {
  id: string,
  line:string,
  classCss: string,
  intervalLvl: string,
  updateIntervalLvl: React.Dispatch<React.SetStateAction<string>>,
  isAnswerTrue: boolean
}

export interface forNextBtn {
  isShown: boolean
}

export interface IconForSound {
  isSoundOn: boolean;
  sound: ()=>Promise<void>,
  forCSS: string
}

export interface ForCardExamples {
  isExampleShown: boolean,
  isExampleTranslationShown: boolean,
  isMeaningShown: boolean,
  isMeaningTranslationShown: boolean,
  showTranslationAfter: boolean,
  isSoundOn: boolean,
  isAnswered: boolean,
  soundExample: ()=>Promise<void>,
  soundMeaning: ()=>Promise<void>,
  exampleString: string,
  meaningString: string,
  exampleTranslationString: string,
  meaningTranslationString: string,
}

export interface LineWrapperProps{
  isShown: boolean,
  hasAnswer: boolean,
  line:string, 
  classCSS:string, 
  openTag:'<b>'|'<i>', 
  closingTag:'</b>'|'</i>',
}

export interface TranslationProps {
  isShown: boolean,
  isShownAfter: boolean,
  hasAnswer: boolean,
  line: string,
  classCSS: string
}
