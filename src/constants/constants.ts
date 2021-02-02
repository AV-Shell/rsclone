import {
  userSettings,
  userStatistics,
  userWordReq,
  IstatisticMainLong,
  IStatGraphItem,
} from './interfaces';

const MB_STORAGE_KEY = 'magicButtonLocal';

const MB_ROUTES = {
  greetingPage: '/',
  settings: '/settings',
};

const BASE_URL = 'https://afternoon-falls-25894.herokuapp.com';
const FILE_URL = 'https://raw.githubusercontent.com/av-shell/rslang-data/master';
const AVA_URL = 'https://raw.githubusercontent.com/av-shell/rslang-ava/master/avatars/';
// example https://raw.githubusercontent.com/av-shell/rslang-ava/master/avatars/ava_45.png
// example https://raw.githubusercontent.com/av-shell/rslang-ava/master/avatars/ava_1.png
const FLAG_URL = 'https://raw.githubusercontent.com/av-shell/rslang-ava/master/flags/';
const FLAG_URL_4X3 = 'https://raw.githubusercontent.com/av-shell/rslang-ava/master/flags/4x3/';
// example https://raw.githubusercontent.com/av-shell/rslang-ava/master/flags/4x3/us.svg
// example https://raw.githubusercontent.com/av-shell/rslang-ava/master/flags/4x3/ru.svg
// example https://raw.githubusercontent.com/av-shell/rslang-ava/master/flags/flag_ru.svg
// example https://raw.githubusercontent.com/av-shell/rslang-ava/master/flags/flag_usa.svg

const MIN_AVATAR_NUM = 1;
const MAX_AVATAR_NUM = 45;

const ONE_MINUTE = (60 * 1000);
const TEN_MINUTES = (10 * 60 * 1000);
const ONE_DAY = (24 * 60 * 60 * 1000);
const FOUR_DAYS = (4 * 24 * 60 * 60 * 1000);
const RESET_HOUR = 4;
const MULTIPLIER_GOOD = 2.5;
const MULTIPLIER_EASY = 4;
const ALL_WORDS = 3600;
const TOTAL_DIFFICULTY_GROUPS = 6;
const MIN_NEW_WORDS_PER_DAY = 3;
const MAX_NEW_WORDS_PER_DAY = 15;
const MIN_REPEAT_WORDS_PER_DAY = 10;
const MAX_REPEAT_WORDS_PER_DAY = 35;

const USER_HAS_ENTITY = 0;
const USER_NO_ENTITY = 1;
const USER_NOT_LOGGED = 2;
const USER_SERVER_ERROR = 3;

const MAX_STATISTIC_LIMIT_DAYS = 30;

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
    cardsPerDay: 15, // calculated from  new + repeat.
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
    cardExplanationTranslationAfter: false, // after answer
    cardExampleTranslationAfter: false, // after answer
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
    avatarLink: 'https://raw.githubusercontent.com/av-shell/rslang-ava/master/avatars/ava_1.png', // link to avatar, if avatarID === 0
    avatarSettings: 'null', // JSON.stingify(ava.settings.obj  null if we don't need it)
    createSettingsTimestamp: 0,
  },
};

const DEFAULT_USER_STATISTIC: userStatistics = {
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
  },
};

const DEFAULT_STAT_ITEM: IStatGraphItem = {
  date: 0,
  value: 0,
};

const DEFAULT_MAIN_GAME_LONG_STATISTIC: IstatisticMainLong = {
  bestAll: 0,
  bestAllData: 0,
  bestForTraining: 0,
  bestForTrainingData: 0,
  currentAll: 0,
  currentForTraining: 0,
  totalCorrectCards: 0,
  totalCards: 0,
  totalPoints: 0,
  rightPerDay: [],
  userWordsPerDay: [],
  currentRightPerDay: DEFAULT_STAT_ITEM,
  currentUserWordPerDay: DEFAULT_STAT_ITEM,
};

const DEFAULT_USER_WORD: userWordReq = {
  difficulty: 'new',
  optional: {
    firstAppearance: 0,
    lastRepeat: 0,
    nextRepeat: 0,
    counter: 0,
    success: 0,
    progress: 0,
    status: 'active', // 'active', 'deleted', 'difficult'
    level: 0,
    userWord: true,
  },
};
const newWordsFilter = '{"userWord":null}';
const userWordsFilter = '{"userWord":{"$ne":null}}';

const DARK_THEME_CLASSNAME = 'dark-theme';
const MODAL_WINDOW_CLASSNAME = 'modal-window-isopen';
const MAX_REPEAT_LEVEL: number = 28;

export {
  MB_STORAGE_KEY,
  MB_ROUTES,
  BASE_URL,
  FILE_URL,
  AVA_URL,
  FLAG_URL,
  FLAG_URL_4X3,
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
  DEFAULT_STAT_ITEM,
  DEFAULT_MAIN_GAME_LONG_STATISTIC,
  DEFAULT_USER_WORD,
  newWordsFilter,
  userWordsFilter,
  DARK_THEME_CLASSNAME,
  MODAL_WINDOW_CLASSNAME,
  MIN_NEW_WORDS_PER_DAY,
  MAX_NEW_WORDS_PER_DAY,
  MIN_REPEAT_WORDS_PER_DAY,
  MAX_REPEAT_WORDS_PER_DAY,
  MIN_AVATAR_NUM,
  MAX_AVATAR_NUM,
  USER_HAS_ENTITY,
  USER_NO_ENTITY,
  USER_NOT_LOGGED,
  USER_SERVER_ERROR,
  MAX_REPEAT_LEVEL,
  MAX_STATISTIC_LIMIT_DAYS,
};
