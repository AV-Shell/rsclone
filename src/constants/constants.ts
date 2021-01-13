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
  WORD_PARAM,
};
