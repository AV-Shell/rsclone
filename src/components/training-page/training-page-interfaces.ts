import React from 'react';
import { cardAnswer } from '../../constants/interfaces';

export interface upperButtonProps {
  id: 'active' | 'deleted' | 'difficult',
  isShown:boolean,
  isAnswerRight: boolean,
  isWordNew: boolean,
  status: 'active' | 'deleted' | 'difficult';
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

export interface IlinePropsTranslation {
  isTrue:boolean,
  isShownAfter: boolean,
  isAnswered: boolean,
  line:string,
  classCss: string,
}
export interface IforInput {
  value: string,
  updateValue: React.Dispatch<React.SetStateAction<string>>,
  theWord: string,
  isAnswerSet: boolean,
  updateAnswerSet: React.Dispatch<React.SetStateAction<boolean>>,
  isTrue: boolean,
  updateAnswer: React.Dispatch<React.SetStateAction<boolean>>,
  isSoundOn: boolean,
  wordURL: string;
  isAutoPlayOn: boolean,  
  playExample: boolean,
  playMeaning: boolean,
  counter: number,
  success: number,
  updateCounter: React.Dispatch<React.SetStateAction<number>>,
  updateSuccess: React.Dispatch<React.SetStateAction<number>>,
  isSoundBtnShown: boolean,
  intervalLevel: number,
  updateIntervalLevel: React.Dispatch<React.SetStateAction<number>>,
  isIntervalUsed: boolean
}

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
  isAnswerTrue: boolean,
  language: Tlanguages
}

export interface footerBtns {
  id: string,
  line:string,
  classCss: string,
  intervalLvl: string,
  updateIntervalLvl: React.Dispatch<React.SetStateAction<string>>,
  isAnswerTrue: boolean
}

export interface IconForSound {
  isSoundOn: boolean;
  forCSS: string,
  isShown: boolean,
  soundSelector: string
}

export interface ForCardExamples {
  isExampleShown: boolean,
  isExampleTranslationShown: boolean,
  isExampleTranslationAfter: boolean,
  isMeaningShown: boolean,
  isMeaningTranslationShown: boolean,
  isMeaningTranslationAfter: boolean,
  isSoundOn: boolean,
  isAnswered: boolean,
  exampleURL: string,
  meaningURL: string,
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

export interface NextButtonProps {
  isShown: boolean,
  isAnswerTrue: boolean,
  levelForRepeat: number,
  levelStatus: string,
  wordStatus: 'active' | 'deleted' | 'difficult',
  wordID: string,
  getAnswer: (res: cardAnswer) => void,
  firstAppearance: number,
  counter: number,
  success: number,
  language: Tlanguages,
  nextTrainingDay: number,
  isIntervalUsed: boolean
}

export interface WordProgressProps {
  level: number
  language: Tlanguages
}

export type Tlanguages = {
  [variable: string]: string 
}

