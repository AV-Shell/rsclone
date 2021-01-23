import {
  paginatedWord,
  areThereStillWordsOnGroups,
} from '../constants/interfaces';
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
const wordGroup:areThereStillWordsOnGroups = { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true };

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
    for (let i = startLvl; i <= maxWordsGroup; i++ ) {
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

function shuffleArrayInPlace(arr:any[]) {
  let randomIndex:number;
  let tmpVar;
  for (let i = arr.length - 1; i > 0; i--) {
    randomIndex = Math.floor(Math.random() * (i));
    tmpVar = arr[randomIndex];
    arr[randomIndex] = arr[i];
    arr[i] = tmpVar;
  }
}

export {
  storage,
  loadNewWords,
  nextUTCDayTimeStamp,
  shuffleArrayInPlace,
  currentUTCDayTimeStamp,
};
