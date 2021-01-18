import React from 'react';
import { userSettings, paginatedWord } from '../../constants/interfaces';

export interface upperButtonProps {
  id: string,
  isShown:boolean,
  isAnswerRight: boolean,
  isWordNew: boolean,
  status: string|undefined;
  line:string,
  classCss: string,
  iClass: string
}
export interface lineProps {
  isTrue:boolean,
  line:string,
  classCss: string,
}
export interface forInput {
  theWord: string,
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
