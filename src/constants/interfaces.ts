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
  name: string,
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

export interface userData {
  name: string,
  email: string,
  password: string,
}

export interface userResponce {
  id: string,
  name: string,
  email: string,
}

export interface userWordReq {
  difficulty: string,
  optional: {
    timeAgain: number,
    timeHard: number,
    timeGood: number,
    timeEasy: number,
    lastRepeat: number,
    nextRepeat: number,
    counter: number,
    success: number,
    progress: number,
    status: string,
    gameError: boolean,
    level: number,
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
      mainGameShort?: string,
      mainGameLong?: string,
      savannahLong?: string,
      savannahMain?:  string,
      sprintLong?: string,
      sprintMain?: string,
      magicButtonLong?: string,
      magicButtonMain?:  string,
    }
}

export interface userSettings{
  id?:  string,
  wordsPerDay: number,
  optional: {
    userLanguageLevel?:number,
    cardsPerDay?: number,
    mixedCards?: number,
    cardTranslation?: boolean,
    cardExplanation?: boolean,
    cardExample?: boolean,
    cardTranscription?: boolean,
    cardImage?: boolean,
    cardTranslationAfterSuccess?: boolean,
    cardExplanationTranslation?: boolean,
    cardExampleTranslation?: boolean,
    autoSound?: boolean,
    answerButton?: boolean,
    deleteButton?: boolean,
    difficultWordsButton?: boolean,
    feedbackButtons?: boolean,
    vocabularyExplanation?: boolean,
    vocabularyExample?: boolean,
    vocabularyTranscription?: boolean,
    vocabularyImage?: boolean,
    mainGameShort?: string,
    mainGameLong?: string,
    commonProgress?: number,
    savannaSettings?: string,
  },
}
