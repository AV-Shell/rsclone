/* eslint-disable @typescript-eslint/no-empty-interface */
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

export interface userData extends signInRequestBody {
  name: string,
}

export interface userResponce {
  id: string,
  name: string,
  email: string,
}

export interface userWordOptional {
  firstAppearance: number,
  lastRepeat: number,
  nextRepeat: number,
  counter: number,
  success: number,
  progress: number,
  status: 'active' | 'deleted' | 'difficult', // string,   //'active', 'deleted', 'difficult'
  level: number,
  userWord: true,
}

export interface userWordReq {
  difficulty: string,
  optional: userWordOptional,
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
  id?: string,
  learnedWords: number,
  optional: {
    mainGameShort: string,
    mainGameLong: string,
    savannahLong: string,
    savannahMain: string,
    sprintLong: string,
    sprintMain: string,
    magicButtonLong: string,
    magicButtonMain: string,
  }
}

export interface areThereStillWordsOnGroups {
  [group: number]: boolean,
}

export interface userSettingsOptional {
  newWordsPerDay: number,
  repeatWordsPerDay: number,
  userLanguageLevel: number,
  cardsPerDay: number, // deprecated.  use newWordsPerDay  + repeatWordsPerDay
  mixedCards: number, // depricated.
  isSoundOn: boolean,
  cardWordPronunciation: boolean, // new
  cardTranslation: boolean,
  cardExplanation: boolean,
  cardExample: boolean,
  cardTranscription: boolean,
  cardImage: boolean,
  cardTranslationAfterSuccess: boolean,
  cardExplanationTranslation: boolean, // before answer
  cardExampleTranslation: boolean, // before answer
  cardExplanationTranslationAfter: boolean, // after answer new
  cardExampleTranslationAfter: boolean, // after answer new
  autoSound: boolean,
  answerButton: boolean,
  deleteButton: boolean, // deprecated.  use statusButtons
  difficultWordsButton: boolean, // deprecated.  use statusButtons
  statusButtons: boolean, // new
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
  stillWordsOnGroup: string, // new/ for prepare training
  avatarID: number, // zero - take ava from link;
  avatarLink: string, // link to avatar, if avatarID === 0
  avatarSettings: string, // JSON.stingify(ava.settings.obj  null if we don't need it)
  createSettingsTimestamp : number,
}

export interface userSettings {
  id?: string,
  wordsPerDay: number,
  optional: userSettingsOptional,
}

export interface ISaveTrainingPart {
  startTrainingTimestamp: number,
  totalWordsCount: number,
  trainingCountPerDay: number,
  trueAnswerCount: number,
  // isTrainingFinish: boolean,
}

export interface userCardAnswer extends userWordReq {
  isRepeat: boolean,
  points: number,
}

export interface currentTraining extends ISaveTrainingPart {
  wordsForTraining: paginatedWord[]
}

export interface ISaveTraining extends ISaveTrainingPart {
  wordsForTraining: string[]
}

export interface darkThemeProps {
  isDarkTheme: boolean,
}
// export type Tlangeage =  'EN' | 'RU';

export interface IlanguageThemeProps {
  isLanguageRU: boolean,
}

export interface IsoundMuteProps {
  isMute: boolean,
}

export interface IlocalProps extends darkThemeProps, IlanguageThemeProps, IsoundMuteProps{

}

export interface loginStatusProps {
  isAuthorizated: boolean,
}

export interface cardAnswer {
  difficulty: string,
  optional: userWordOptional,
  isRepeat: boolean,
  points: number,
  _id: string,
}

export interface trainingCardProps extends IlocalProps {
  word: paginatedWord,
  wordNumber: number,
  totalWords: number,
  settings: userSettings,
  // eslint-disable-next-line no-unused-vars
  getAnswer: (res: cardAnswer) => void,
}

export interface headerProps extends loginStatusProps, IlocalProps {
  toggleTheme: () => void,
  setIsMute: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLanguageRU: React.Dispatch<React.SetStateAction<boolean>>,
  settings: userSettings,
  setIsModalWindow: React.Dispatch<React.SetStateAction<boolean>>,
}

interface defaultLoginedProps extends IlocalProps {
  settings: userSettings,
  updateSettings: React.Dispatch<React.SetStateAction<userSettings>>,
  statistic: userStatistics | null,
  updateStatistic: React.Dispatch<React.SetStateAction<userStatistics>>,
  userWords: paginatedWord[] | null,
  updateUserWords: React.Dispatch<React.SetStateAction<Array<paginatedWord> | null>>,
  apiService: ApiService,
}

export interface IDailyGoalProps extends defaultLoginedProps { }

export interface IDashboardProps extends defaultLoginedProps { }

export interface magicButtonProps extends defaultLoginedProps, loginStatusProps { }

export interface settingsPageProps extends defaultLoginedProps { }

export interface IlogOutProps extends IlocalProps {
  logoutUser: () => void,
  setIsModalWindow: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface trainingProps extends defaultLoginedProps { }

export interface shadowTrainingProps extends defaultLoginedProps {
  currentTrainingState: currentTraining,
  setCurrentTrainingState: React.Dispatch<React.SetStateAction<currentTraining>>,
}

export interface ICreateSettingsProps {
  apiService: ApiService,
  // eslint-disable-next-line no-unused-vars
  getSettingsCallback: (isReady: IgetSettingsPageResponce) => void,
}

export interface vocabularyProps extends defaultLoginedProps { }

export type TTrainingType = 'mixed' | 'new' | 'repeat' | 'difficult';
export interface IStartTrainingParams {
  trainingType: TTrainingType,
  newWords: number,
  repeatWords: number,
}

export interface errorPath {
  path: string[],
  message: string,
}

export interface IcreateUserError422Field {
  error: {
    status: string,
    errors: errorPath[]
  }
}

export interface IgetSettingsPageResponce{
  isSuccess:boolean,
  userSettings: userSettings,
  userStatistics: userStatistics,
}

export interface IStatGraphItem {
  date: number,
  value: number,
}

export interface IstatisticMainLong {
  bestAll: number,
  bestAllData: number,
  bestForTraining: number,
  bestForTrainingData: number,
  currentAll: number,
  currentForTraining: number,
  totalCorrectCards: number,
  totalCards:number,
  totalPoints: number,
  rightPerDay: IStatGraphItem[],
  userWordsPerDay: IStatGraphItem[],
  currentRightPerDay:IStatGraphItem,
  currentUserWordPerDay:IStatGraphItem,
}
