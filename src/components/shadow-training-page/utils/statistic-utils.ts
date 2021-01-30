import {
  IStatGraphItem,
  IstatisticMainLong,
} from '../../../constants/interfaces';
import {
  ONE_DAY,
  DEFAULT_STAT_ITEM,
  DEFAULT_MAIN_GAME_LONG_STATISTIC,
  MAX_STATISTIC_LIMIT_DAYS,
} from '../../../constants/constants';
import {
  someUTCDayTimeStamp,
  currentUTCDayTimeStamp,
} from '../../../helpers/utils';

//   {[key: string]: number,}
function checkMainGameLongStatistic(stat: IstatisticMainLong): boolean {
  const keys = Object.keys(DEFAULT_MAIN_GAME_LONG_STATISTIC);
  return keys.every((key) => (key in stat));
}

function getMainGameStatistic(stat: string): IstatisticMainLong {
  let mainGameLong: IstatisticMainLong = JSON.parse(stat);
  if (!mainGameLong || !checkMainGameLongStatistic(mainGameLong)) {
    console.log('mainGameLong failed. SetDefault.');
    mainGameLong = {
      ...DEFAULT_MAIN_GAME_LONG_STATISTIC,
      rightPerDay: [],
      userWordsPerDay: [],
      currentRightPerDay: { ...DEFAULT_STAT_ITEM },
      currentUserWordPerDay: { ...DEFAULT_STAT_ITEM },
    };
  }
  return mainGameLong;
}

function addToStatArray(array: IStatGraphItem[], item: IStatGraphItem, isRepeatLast: boolean): IStatGraphItem[] {
  if (array.length === 0) {
    const tmp: IStatGraphItem = {
      date: item.date,
      value: item.value,
    };
    return [tmp];
  }
  const newArray: IStatGraphItem[] = [...array];
  const len = array.length;
  const repeatValue: number = isRepeatLast ? array[len - 1].value : 0;
  const lastDate: number = someUTCDayTimeStamp(array[len - 1].date);
  const currentDate: number = currentUTCDayTimeStamp();
  if (lastDate < currentDate) {
    console.log('lastDate < currentDate', lastDate, currentDate, len);
    let startDate: number = ((lastDate + (MAX_STATISTIC_LIMIT_DAYS * ONE_DAY)) < currentDate) ?
      (currentDate - (MAX_STATISTIC_LIMIT_DAYS * ONE_DAY)) : lastDate;
    let i = 0;
    console.log('startDate', startDate);
    while (startDate < currentDate) {
      const tmp: IStatGraphItem = {
        date: startDate,
        value: repeatValue,
      };
      newArray.push(tmp);
      startDate += ONE_DAY;
      // TODO: DELETE I part after testing
      i += 1;
      if (i > (MAX_STATISTIC_LIMIT_DAYS + 1)) {
        console.log('infinity loop, impossible!!!');
        break;
      }
    }
    const tmp: IStatGraphItem = {
      date: item.date,
      value: item.value,
    };
    newArray.push(tmp);
    return newArray.slice(-30);
  }
  if (lastDate === currentDate) {
    const tmp: IStatGraphItem = {
      date: item.date,
      value: item.value,
    };
    newArray[len - 1] = tmp;
    return newArray.slice(-30);
  }

  const tmp: IStatGraphItem = {
    date: item.date,
    value: item.value,
  };
  return [tmp];
}

export {
  checkMainGameLongStatistic,
  addToStatArray,
  getMainGameStatistic,
};
