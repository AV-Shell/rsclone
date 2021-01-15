import React from 'react';
import ApiService from '../services/api-service';
export interface tokenResponce {
  token: string,
  refreshToken: string,
}

export interface loginResponseData extends tokenResponce {
  message: string,
  userId: string,
  name: string,
}

export interface signInRequestBody {
  email: string,
  password: string,
}

export interface wordDataWithoutId {
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  textExampleTranslate: string,
  textMeaningTranslate: string,
  wordTranslate: string,
  wordsPerExampleSentence: number,
}

export interface wordData extends wordDataWithoutId {
  id: string,
}

export interface wordsCount {
  count: number,
}

export interface userData extends signInRequestBody{
  name: string,
}

export interface userResponce {
  id: string,
  name: string,
  email: string,
}

export interface userWordReq {
  difficulty: string,
  optional: {
    firstAppearance: number,
    lastRepeat: number,
    nextRepeat: number,
    counter: number,
    success: number,
    progress: number,
    status: string,   //'active', 'deleted', 'difficult'
    level: number,
    userWord: true,
  },
}

export interface userWordRes extends userWordReq {
  id: string,
  wordId: string,
}

export interface paginatedWord extends wordDataWithoutId {
  _id: string,
  userWord?: userWordReq,
}

interface aggregatedCount {
  count: number,
}

export interface aggregatedWordsResult {
    paginatedResults: paginatedWord[],
    totalCount: aggregatedCount[],
}

export interface userStatistics {
    id?:  string,
    learnedWords: number,
    optional: {
      mainGameShort: string,
      mainGameLong: string,
      savannahLong: string,
      savannahMain:  string,
      sprintLong: string,
      sprintMain: string,
      magicButtonLong: string,
      magicButtonMain:  string,
    }
}

export interface userSettings{
  id?:  string,
  wordsPerDay: number,
  optional: {
    newWordsPerDay: number,
    repeatWordsPerDay: number,
    userLanguageLevel:number,
    cardsPerDay: number,
    mixedCards: number,
    isSoundOn:boolean,
    cardTranslation: boolean,
    cardExplanation: boolean,
    cardExample: boolean,
    cardTranscription: boolean,
    cardImage: boolean,
    cardTranslationAfterSuccess: boolean,
    cardExplanationTranslation: boolean,
    cardExampleTranslation: boolean,
    autoSound: boolean,
    answerButton: boolean,
    deleteButton: boolean,
    difficultWordsButton: boolean,
    feedbackButtons: boolean,
    vocabularyExplanation: boolean,
    vocabularyExample: boolean,
    vocabularyTranscription: boolean,
    vocabularyImage: boolean,
    mainGameShort: string,
    mainGameLong: string,
    commonProgress: number,
    savannaSettings: string,
    magicButtonSettings: string,
  },
}

export interface darkThemeProps {
  isDarkTheme: boolean,
}

export interface loginStatusProps {
  isAuthorizated: boolean,
}

export interface headerProps extends darkThemeProps, loginStatusProps {
  toggleTheme: () => void,
}


export interface dailyGoalProps extends darkThemeProps {
  settings: userSettings | null,
  updateSettings: React.Dispatch<React.SetStateAction<userSettings | null>>,
  statistic: userStatistics | null,
  updateStatistic: React.Dispatch<React.SetStateAction<userStatistics | null>>,
  userWords: paginatedWord[] | null,
  updateUserWords: React.Dispatch<React.SetStateAction<Array<paginatedWord> | null>>,
  apiService: ApiService,
}

export interface dashboardProps extends darkThemeProps  {
  settings: userSettings | null,
  updateSettings: React.Dispatch<React.SetStateAction<userSettings | null>>,
  statistic: userStatistics | null,
  updateStatistic: React.Dispatch<React.SetStateAction<userStatistics | null>>,
  userWords: paginatedWord[] | null,
  updateUserWords: React.Dispatch<React.SetStateAction<Array<paginatedWord> | null>>,
  apiService: ApiService,
}

export interface magicButtonProps extends darkThemeProps, loginStatusProps {
  settings: userSettings | null,
  updateSettings: React.Dispatch<React.SetStateAction<userSettings | null>>,
  statistic: userStatistics | null,
  updateStatistic: React.Dispatch<React.SetStateAction<userStatistics | null>>,
  userWords: paginatedWord[] | null,
  updateUserWords: React.Dispatch<React.SetStateAction<Array<paginatedWord> | null>>,
  apiService: ApiService,
}

export interface settingsPageProps extends darkThemeProps  {
  settings: userSettings | null,
  updateSettings: React.Dispatch<React.SetStateAction<userSettings | null>>,
  statistic: userStatistics | null,
  updateStatistic: React.Dispatch<React.SetStateAction<userStatistics | null>>,
  userWords: paginatedWord[] | null,
  updateUserWords: React.Dispatch<React.SetStateAction<Array<paginatedWord> | null>>,
  apiService: ApiService,
}

export interface logOutProps extends darkThemeProps  {
  settings: userSettings | null,
  updateSettings: React.Dispatch<React.SetStateAction<userSettings | null>>,
  statistic: userStatistics | null,
  updateStatistic: React.Dispatch<React.SetStateAction<userStatistics | null>>,
  userWords: paginatedWord[] | null,
  updateUserWords: React.Dispatch<React.SetStateAction<Array<paginatedWord> | null>>,
  apiService: ApiService,
}

export interface trainingProps extends darkThemeProps  {
  settings: userSettings | null,
  updateSettings: React.Dispatch<React.SetStateAction<userSettings | null>>,
  statistic: userStatistics | null,
  updateStatistic: React.Dispatch<React.SetStateAction<userStatistics | null>>,
  userWords: paginatedWord[] | null,
  updateUserWords: React.Dispatch<React.SetStateAction<Array<paginatedWord> | null>>,
  apiService: ApiService,
}

export interface vocabularyProps extends darkThemeProps  {
  settings: userSettings | null,
  updateSettings: React.Dispatch<React.SetStateAction<userSettings | null>>,
  statistic: userStatistics | null,
  updateStatistic: React.Dispatch<React.SetStateAction<userStatistics | null>>,
  userWords: paginatedWord[] | null,
  updateUserWords: React.Dispatch<React.SetStateAction<Array<paginatedWord> | null>>,
  apiService: ApiService,
}
