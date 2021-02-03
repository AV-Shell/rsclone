// import { paginatedWord } from '../../constants/interfaces';
import { MAX_REPEAT_LEVEL } from '../../constants/constants';
import { paginatedWord } from '../../constants/interfaces';
import { nextUTCDayTimeStamp } from '../../helpers/utils';

// eslint-disable-next-line no-unused-vars
type TgetDate = (date: number, langConfig: string, todayConfig: string) => string;

const nextTraining: TgetDate = (date, langConfig, todayConfig) => {
  const nextDay = nextUTCDayTimeStamp();
  if ((date - nextDay) < 0) {
    return todayConfig;
  }

  return new Date(date).toLocaleString(langConfig, { year: 'numeric', month: 'short', day: 'numeric' });
};

const displayDate: TgetDate = (date, langConfig, todayConfig) => {
  const nextDay = nextUTCDayTimeStamp();
  const msInDay = 86400000;
  const todayStart = nextDay - msInDay;
  if (((date - nextDay) < 0) && ((date - todayStart) > 0)) {
    return todayConfig;
  }

  return new Date(date).toLocaleString(langConfig, { year: 'numeric', month: 'short', day: 'numeric' });
};

function sortByWords(arr: paginatedWord[], reverse = false): paginatedWord[] {
  let result: paginatedWord[];
  if (reverse === true) {
    result = arr.sort((a, b) => {
      if (b.word.toLowerCase() < a.word.toLowerCase()) {
        return -1;
      }
      if (b.word.toLowerCase() > a.word.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    return result;
  }
  result = arr.sort((a, b) => {
    if (b.word.toLowerCase() < a.word.toLowerCase()) {
      return 1;
    }
    if (b.word.toLowerCase() > a.word.toLowerCase()) {
      return -1;
    }
    return 0;
  });
  return result;
}

function sortByTranslation(arr: paginatedWord[], reverse = false): paginatedWord[] {
  let result: paginatedWord[];
  if (reverse === true) {
    result = arr.sort((a, b) => {
      if (b.wordTranslate.toLowerCase() < a.wordTranslate.toLowerCase()) {
        return -1;
      }
      if (b.wordTranslate.toLowerCase() > a.wordTranslate.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    return result;
  }
  result = arr.sort((a, b) => {
    if (b.wordTranslate.toLowerCase() < a.wordTranslate.toLowerCase()) {
      return 1;
    }
    if (b.wordTranslate.toLowerCase() > a.wordTranslate.toLowerCase()) {
      return -1;
    }
    return 0;
  });
  return result;
}

function sortByGroup(arr: paginatedWord[], reverse = false): paginatedWord[] {
  let result: paginatedWord[];
  if (reverse === true) {
    result = arr.sort((a, b) => {
      if (b.group < a.group) {
        return -1;
      }
      if (b.group > a.group) {
        return 1;
      }
      return 0;
    });
    return result;
  }
  result = arr.sort((a, b) => {
    if (b.group < a.group) {
      return 1;
    }
    if (b.group > a.group) {
      return -1;
    }
    return 0;
  });
  return result;
}

function sortByNextTraining(arr: paginatedWord[], reverse = false): paginatedWord[] {
  let result: paginatedWord[];
  if (reverse === true) {
    result = arr.sort((a, b) => {
      if (b.userWord.optional.nextRepeat < a.userWord.optional.nextRepeat) {
        return -1;
      }
      if (b.userWord.optional.nextRepeat > a.userWord.optional.nextRepeat) {
        return 1;
      }
      return 0;
    });
    return result;
  }
  result = arr.sort((a, b) => {
    if (b.userWord.optional.nextRepeat < a.userWord.optional.nextRepeat) {
      return 1;
    }
    if (b.userWord.optional.nextRepeat > a.userWord.optional.nextRepeat) {
      return -1;
    }
    return 0;
  });
  return result;
}

function sortByProgress(arr: paginatedWord[], reverse = false): paginatedWord[] {
  let result: paginatedWord[];

  function progress(obj: paginatedWord) : number {
    return ((obj.userWord.optional.level / MAX_REPEAT_LEVEL) * 100);
  }

  if (reverse === true) {
    result = arr.sort((a, b) => {
      if (progress(b) < progress(a)) {
        return -1;
      }
      if (progress(b) > progress(a)) {
        return 1;
      }
      return 0;
    });
    return result;
  }
  result = arr.sort((a, b) => {
    if (progress(b) < progress(a)) {
      return 1;
    }
    if (progress(b) > progress(a)) {
      return -1;
    }
    return 0;
  });
  return result;
}

export {
  nextTraining,
  displayDate,
  sortByWords,
  sortByTranslation,
  sortByGroup,
  sortByNextTraining,
  sortByProgress,
};
