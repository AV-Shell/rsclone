import {userSettings, userStatistics, userWordReq} from '../constants/interfaces'
const MB_STORAGE_KEY = 'magicButtonLocal';

const MB_ROUTES = {
  greetingPage: '/',
  settings: '/settings',
}

const BASE_URL = 'https://afternoon-falls-25894.herokuapp.com';
const FILE_URL = 'https://raw.githubusercontent.com/av-shell/rslang-data/master';

const ONE_MINUTE = (60 * 1000);
const TEN_MINUTES = (10 * 60 * 1000);
const ONE_DAY = (24 * 60 * 60 * 1000);
const FOUR_DAYS = (4 * 24 * 60 * 60 * 1000);
const RESET_HOUR = 4;
const MULTIPLIER_GOOD = 2.5;
const MULTIPLIER_EASY = 4;
const ALL_WORDS = 3600;
const TOTAL_DIFFICULTY_GROUPS = 6;

const WORD_PARAM = {
  again: 'again',
  hard: 'hard',
  good: 'good',
  easy: 'easy',
  new: 'new',
  active: 'active',
  deleted: 'deleted',
  difficult: 'difficult',
};

const DEFAULT_USER_SETTINGS: userSettings = {
  wordsPerDay: 10,
  optional: {
    newWordsPerDay: 5,
    repeatWordsPerDay: 10,
    userLanguageLevel: 0,
    cardsPerDay: 15,  //calculated from  new + repeat. 
    mixedCards: 0,
    isSoundOn: true,
    cardWordPronunciation: true,
    cardTranslation: true,
    cardExplanation: true,
    cardExample: true,
    cardTranscription: true,
    cardImage: true,
    cardTranslationAfterSuccess: false,
    cardExplanationTranslation: true,
    cardExampleTranslation: true,
    cardExplanationTranslationAfter: false, //after answer 
    cardExampleTranslationAfter: false,   //after answer
    autoSound: true,
    answerButton: true,
    deleteButton: true,
    difficultWordsButton: true,
    statusButtons: true,
    feedbackButtons: true,
    vocabularyExplanation: true,
    vocabularyExample: true,
    vocabularyTranscription: true,
    vocabularyImage: true,
    mainGameShort: 'null',
    mainGameLong: 'null',
    commonProgress: 0,
    savannaSettings: 'null',
    magicButtonSettings: 'null',
    stillWordsOnGroup: '{"0":true,"1":true,"2":true,"3":true,"4":true,"5":true}',
    avatarID: 1, // zero - take ava from link;
    avatarLink: '', // link to avatar, if avatarID === 0
    avatarSettings: 'null', // JSON.stingify(ava.settings.obj  null if we don't need it)
  },
}


const DEFAULT_USER_STATISTIC: userStatistics =  {
  learnedWords: 0,
  optional: {
    mainGameShort: 'null',
    mainGameLong: 'null',
    savannahLong: 'null',
    savannahMain: 'null',
    sprintLong: 'null',
    sprintMain: 'null',
    magicButtonLong: 'null',
    magicButtonMain: 'null',
  }
}

const DEFAULT_USER_WORD: userWordReq = {
  difficulty: 'new',
  optional: {
    firstAppearance: 0,
    lastRepeat: 0,
    nextRepeat: 0,
    counter: 0,
    success: 0,
    progress: 0,
    status: 'active',   //'active', 'deleted', 'difficult'
    level: 0,
    userWord: true,
  },
}
const newWordsFilter = '{"userWord":null}';
const userWordsFilter = '{"userWord":{"$ne":null}}';

const DARK_THEME_CLASSNAME = 'dark-theme';


export { 
  MB_STORAGE_KEY,
  MB_ROUTES,
  BASE_URL,
  FILE_URL,
  ONE_MINUTE,
  TEN_MINUTES,
  ONE_DAY,
  FOUR_DAYS,
  RESET_HOUR,
  MULTIPLIER_GOOD,
  MULTIPLIER_EASY,
  ALL_WORDS,
  TOTAL_DIFFICULTY_GROUPS,
  WORD_PARAM,
  DEFAULT_USER_SETTINGS,
  DEFAULT_USER_STATISTIC,
  DEFAULT_USER_WORD,
  newWordsFilter,
  userWordsFilter,
  DARK_THEME_CLASSNAME,
};
