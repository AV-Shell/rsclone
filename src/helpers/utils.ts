import {
  paginatedWord,
  areThereStillWordsOnGroups,
  userSettings,
  userStatistics,
} from '../constants/interfaces';
import {
  USER_HAS_ENTITY,
  USER_NO_ENTITY,
  USER_NOT_LOGGED,
  USER_SERVER_ERROR,
  DEFAULT_USER_SETTINGS,
  DEFAULT_USER_STATISTIC,
} from '../constants/constants'
import ApiService from '../services/api-service';

function storage(key: string, data?: any) {
  if (arguments.length === 1) {
    const storedData = localStorage.getItem(key);
    if (storedData !== null) {
      return JSON.parse(storedData);
    }
    return false;
  }
  if (data === null) {
    localStorage.removeItem(key);
    return true;
  }
  localStorage.setItem(key, JSON.stringify(data));
  return true;
}


interface querySettings {
  maxWordsGroup: number,
  userLevel: number,
  newWordsCount: number,
  levelsWord: areThereStillWordsOnGroups,
  apiService: ApiService,
}
const wordGroup: areThereStillWordsOnGroups = { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true };

const loadNewWords = async ({ maxWordsGroup, userLevel,
  newWordsCount, levelsWord,
  apiService }: querySettings) => {
  const isWordsOnGroups = levelsWord ? { ...levelsWord } : { ...wordGroup };
  let startLvl = userLevel;
  const constWordArray: paginatedWord[] = [];
  let highLvlWordsCount = Math.ceil(newWordsCount / 2);
  let lowLvlWordsCount = newWordsCount - highLvlWordsCount;
  let hasLowLvlWords = false;
  let hasHiLvlWords = false;
  for (let i: number = 0; i < startLvl; i++) {
    hasLowLvlWords = hasLowLvlWords || isWordsOnGroups[i];
  }
  for (let i: number = startLvl; i <= maxWordsGroup; i++) {
    hasHiLvlWords = hasHiLvlWords || isWordsOnGroups[i];
  }
  if (hasLowLvlWords === false) {
    highLvlWordsCount = newWordsCount;
  }
  if (hasHiLvlWords === false) {
    lowLvlWordsCount = newWordsCount;
  }
  console.log('lowLvlWordsCount', lowLvlWordsCount);
  console.log('highLvlWordsCount', highLvlWordsCount);
  console.log('hasLowLvlWords', hasLowLvlWords);
  console.log('hasHiLvlWords', hasHiLvlWords);
  if (hasLowLvlWords) {
    let totalGotWords = 0;
    for (let i = 0; i < startLvl; i++) {
      if (isWordsOnGroups[i] !== false) {
        const requestWordsCount = Math.ceil((lowLvlWordsCount - totalGotWords) / (startLvl - i));
        console.log('ilow', i, 'requestWordsCount', requestWordsCount, 'totalGotWords', totalGotWords);
        const response = await apiService.getAggregatedNewWordsFromGroup(requestWordsCount, i);
        console.log('response', response);
        if (response.paginatedResults.length === 0) {
          isWordsOnGroups[i] = false;
        } else {
          response.paginatedResults.forEach((word) => constWordArray.push(word));
          totalGotWords += response.paginatedResults.length;
        }
      }
    }
  }
  if (hasHiLvlWords) {
    let totalGotWords = 0;
    for (let i = startLvl; i <= maxWordsGroup; i++) {
      if (isWordsOnGroups[i] !== false) {
        const requestWordsCount = highLvlWordsCount - totalGotWords;
        console.log('i hi', i, 'requestWordsCount', requestWordsCount, 'totalGotWords', totalGotWords);
        const response = await apiService.getAggregatedNewWordsFromGroup(requestWordsCount, i);
        console.log('response', response);
        if (response.paginatedResults.length === 0) {
          isWordsOnGroups[i] = false;
        } else {
          response.paginatedResults.forEach((word) => constWordArray.push(word));
          totalGotWords += response.paginatedResults.length;
          if (highLvlWordsCount === totalGotWords) {
            break;
          }
        }
      }
    }
  }
  return { constWordArray, isWordsOnGroups };
}

interface getSettings {
  apiService: ApiService,
}
interface getSettingsResponce {
  settings: userSettings,
  result: number,
}
interface getStatisticResponce {
  statistic: userStatistics,
  result: number,
}



async function loadSettings({ apiService }: getSettings) {
  let isHasSettings: number = USER_NO_ENTITY;
  //settings
  let userSettings = {
    wordsPerDay: DEFAULT_USER_SETTINGS.wordsPerDay,
    optional: {
      ...DEFAULT_USER_SETTINGS.optional,
    }
  }
  try {
    const userSettings = await apiService.getSettings()
    console.log(userSettings);
    if (userSettings.optional) {
      isHasSettings = USER_HAS_ENTITY;
    }
    else {
      console.log('throw error settings');
      throw new Error('404');
    }
  }
  catch (err) {
    //need to set Settings
    if (err.message === '401') {
      // console.log('token expired');
      isHasSettings = USER_NOT_LOGGED;
    } else if (err.message === '404') {
      // TODO: check  enother errors, may be need to compare message
      console.log('settings not found');
      isHasSettings = USER_NO_ENTITY;
    } else {
      isHasSettings = USER_SERVER_ERROR;
    }
    userSettings = {
      wordsPerDay: DEFAULT_USER_SETTINGS.wordsPerDay,
      optional: {
        ...DEFAULT_USER_SETTINGS.optional,
      }
    }
  }
  const res: getSettingsResponce = {
    settings: userSettings,
    result: isHasSettings,
  }
  return res;
}

async function loadStatistic({ apiService }: getSettings) {
  let isHasStatistic: number = USER_NO_ENTITY;
  //settings
  let userStatistic: userStatistics = {
    learnedWords: DEFAULT_USER_STATISTIC.learnedWords,
    optional: {
      ...DEFAULT_USER_STATISTIC.optional,
    }
  }
  try {
    const userStatistic = await apiService.getStatistics()
    console.log(userStatistic);
    if (userStatistic.optional) {
      isHasStatistic = USER_HAS_ENTITY;
      const res: getStatisticResponce = {
        statistic: userStatistic,
        result: isHasStatistic,
      }
      return res;

    }
    else {
      console.log('throw error settings');
      throw new Error('404');
    }
  }
  catch (err) {
    //need to set Settings
    if (err.message === '401') {
      // console.log('token expired');
      isHasStatistic = USER_NOT_LOGGED;
    } else if (err.message === '404') {
      // TODO: check  enother errors, may be need to compare message
      console.log('settings not found');
      isHasStatistic = USER_NO_ENTITY;
      try {
        userStatistic = {
          learnedWords: DEFAULT_USER_STATISTIC.learnedWords,
          optional: {
            ...DEFAULT_USER_STATISTIC.optional,
          }
        }
        userStatistic = await apiService.updateStatistics(userStatistic)
        if (userStatistic.optional) {
          isHasStatistic = USER_HAS_ENTITY;
          const res: getStatisticResponce = {
            statistic: userStatistic,
            result: isHasStatistic,
          }
          return res;
        }
        else {
          console.log('throw error settings');
          throw new Error('404');
        }
      } 
      catch(err) {
        isHasStatistic = USER_SERVER_ERROR;
      }
    } else {
      isHasStatistic = USER_SERVER_ERROR;
    }

    userStatistic = {
      learnedWords: DEFAULT_USER_STATISTIC.learnedWords,
      optional: {
        ...DEFAULT_USER_STATISTIC.optional,
      }
    }
  }
  const res: getStatisticResponce = {
    statistic: userStatistic,
    result: isHasStatistic,
  }
  return res;
}



const nextUTCDayTimeStamp = () => {
  const now = new Date();

  const timestamp: number = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
  )
  return timestamp;
}
const currentUTCDayTimeStamp = () => {
  const now = new Date();
  const timestamp: number = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  )
  return timestamp;
}

function shuffleArrayInPlace(arr: any[]) {
  let randomIndex: number;
  let tmpVar;
  for (let i = arr.length - 1; i > 0; i--) {
    randomIndex = Math.floor(Math.random() * (i));
    tmpVar = arr[randomIndex];
    arr[randomIndex] = arr[i];
    arr[i] = tmpVar;
  }
}

function limitMinMax(value:number, MinLimit:number, MaxLimit:number){
  let result = value;
  if (result > MaxLimit) {
    result = MaxLimit;
  } else if (result < MinLimit ) {
    result = MinLimit;
  }
  return result;
}

export {
  storage,
  loadNewWords,
  nextUTCDayTimeStamp,
  shuffleArrayInPlace,
  currentUTCDayTimeStamp,
  loadSettings,
  loadStatistic,
  limitMinMax,
};
