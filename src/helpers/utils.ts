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


const loadNewWords = async ({maxWordsGroup, userLevel, newWordsCount, levelsWord, apiService}:querySettings) => {
  let isWordsOnGroups = {...levelsWord};
  let startLvl = userLevel;
  const constWordArray: paginatedWord[] = [];
  let hiLvlWordsCount = Math.ceil(newWordsCount / 2);
  let lowLvlWordsCount = newWordsCount - hiLvlWordsCount;
  let hasLowLvlWords = false;
  let hasHiLvlWords = false;
  for (let i: number = 0; i < startLvl; i++) {
    hasLowLvlWords = hasLowLvlWords || isWordsOnGroups[i];
  }
  for (let i: number = startLvl; i <= maxWordsGroup; i++) {
    hasHiLvlWords = hasHiLvlWords || isWordsOnGroups[i];
  }
  if (hasLowLvlWords === false) {
    hiLvlWordsCount = newWordsCount;
  }
  if (hasHiLvlWords === false) {
    lowLvlWordsCount = newWordsCount;
  }
  console.log('lowLvlWordsCount', lowLvlWordsCount);
  console.log('hiLvlWordsCount', hiLvlWordsCount);
  console.log('hasLowLvlWords', hasLowLvlWords);
  console.log('hasHiLvlWords', hasHiLvlWords);
  if (hasLowLvlWords) {
    let totalGotWords = 0;
    for (let i = 0; i < startLvl; i += 1) {
      if (isWordsOnGroups[i] !== false) {
        const requestWordsCount = Math.ceil((lowLvlWordsCount - totalGotWords) / (startLvl - i));
        console.log('ilow', i, 'requestWordsCount', requestWordsCount, 'totalGotWords', totalGotWords);
        let responce = await apiService.getAggregatedNewWordsFromGroup(requestWordsCount, i);
        console.log('responce', responce);
        if (responce.paginatedResults.length === 0) {
          isWordsOnGroups[i] = false;
        } else {
          responce.paginatedResults.forEach((word) => constWordArray.push(word));
          totalGotWords += responce.paginatedResults.length;
        }
      }
    }
  }
  if (hasHiLvlWords) {
    let totalGotWords = 0;
    for (let i = startLvl; i <= maxWordsGroup; i += 1) {
      if (isWordsOnGroups[i] !== false) {
        const requestWordsCount = hiLvlWordsCount - totalGotWords;
        console.log('i hi', i, 'requestWordsCount', requestWordsCount, 'totalGotWords', totalGotWords);
        let responce = await apiService.getAggregatedNewWordsFromGroup(requestWordsCount, i);
        console.log('responce', responce);
        if (responce.paginatedResults.length === 0) {
          isWordsOnGroups[i] = false;
        } else {
          responce.paginatedResults.forEach((word) => constWordArray.push(word));
          totalGotWords += responce.paginatedResults.length;
          if (hiLvlWordsCount === totalGotWords) {
            break;
          }
        }
      }
    }
  }
  return {constWordArray, isWordsOnGroups} ;
}


export {
  storage,
  loadNewWords,
};
