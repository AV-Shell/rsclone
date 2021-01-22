import React from 'react';
import { userSettings, paginatedWord } from '../../constants/interfaces';

export interface upperButtonProps {
  id: string,
  isShown:boolean,
  isAnswerRight: boolean,
  isWordNew: boolean,
  status: string;
  line:string,
  classCss: string,
  iClass: string
  setStatusForObj: React.Dispatch<React.SetStateAction<string>>
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
  updateAnswer: React.Dispatch<React.SetStateAction<boolean>>
}

type IntervalTime = {
  [days: number]: number 
};

export interface cardBodyProps {
  words: paginatedWord[],
  settings: userSettings | null,
  levelsOfRepeat: IntervalTime,
  updateWords: React.Dispatch<React.SetStateAction<paginatedWord[]>>,
  updateSettings: React.Dispatch<React.SetStateAction<userSettings | null>>,
  updateUserWords: React.Dispatch<React.SetStateAction<Array<paginatedWord> | null>>,
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