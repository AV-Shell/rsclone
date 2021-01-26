import {
  userStatistics,
  IStatGraphItem,
  IstatisticMainLong,
} from '../../../constants/interfaces';
import {
  ONE_DAY,
  DEFAULT_USER_STATISTIC,
  DEFAULT_STAT_ITEM,
  DEFAULT_MAIN_GAME_LONG_STATISTIC,
} from '../../../constants/constants'
import {
  someUTCDayTimeStamp,
  currentUTCDayTimeStamp,
} from '../../../helpers/utils'


//   {[key: string]: number,}
function checkMainGameLongStatistic(stat: IstatisticMainLong): boolean {
  const keys = Object.keys(DEFAULT_MAIN_GAME_LONG_STATISTIC);
  return keys.every((key) => (key in stat));
}


function getMainGameStatistic(stat: string): IstatisticMainLong {
  let mainGameLong: IstatisticMainLong = JSON.parse(stat);
  if (!mainGameLong || !checkMainGameLongStatistic(mainGameLong)) {
    console.log('mainGameLong failed. SetDefault.')
    mainGameLong = {
      ...DEFAULT_MAIN_GAME_LONG_STATISTIC,
      rightPerDay: [],
      userWordsPerDay: [],
      currentRightPerDay: { ...DEFAULT_STAT_ITEM },
      currentUserWordPerDay: { ...DEFAULT_STAT_ITEM },
    }
  }
  return mainGameLong;
}


function addToStatArray(array: IStatGraphItem[], item: IStatGraphItem, isRepeatLast: boolean): IStatGraphItem[] {
  if (array.length === 0) {
    const tmp: IStatGraphItem = {
      date: item.value,
      value: item.value,
    }
    return [tmp];
  } else {
    let newArray: IStatGraphItem[] = [...array];
    const len = array.length;
    const repeatValue: number = isRepeatLast ? array[len - 1].value : 0;
    const lastDate: number = someUTCDayTimeStamp(array[len - 1].date);
    const currentDate: number = currentUTCDayTimeStamp();
    if (lastDate < currentDate) {
      //TODO:
      let startDate: number = ((lastDate + (30 * ONE_DAY)) < currentDate) ? (currentDate - (30 * ONE_DAY)) : lastDate;
      let i = 0;
      while (startDate < currentDate) {
        const tmp: IStatGraphItem = {
          date: startDate,
          value: repeatValue,
        }
        newArray.push(tmp);
        //TODO: DELETE I part after testing
        i++;
        if (i > 31) {
          console.log('infinity loop, impossible!!!');
          break;
        }
      }
      const tmp: IStatGraphItem = {
        date: item.value,
        value: item.value,
      }
      newArray.push(tmp);
      return newArray.slice(-30);
    } else if (lastDate === currentDate) {
      const tmp: IStatGraphItem = {
        date: item.value,
        value: item.value,
      }
      newArray[len - 1] = tmp;
      return newArray.slice(-30);
    } else {
      const tmp: IStatGraphItem = {
        date: item.value,
        value: item.value,
      }
      return [tmp];
    }
  }
}



export {
  checkMainGameLongStatistic,
  addToStatArray,
  getMainGameStatistic,
};
