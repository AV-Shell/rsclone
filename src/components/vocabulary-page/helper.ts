import { nextUTCDayTimeStamp } from '../../helpers/utils';

// eslint-disable-next-line no-unused-vars
type TgetDate = (date: number) => string;

const nextTraining: TgetDate = (date) => {
  const nextDay = nextUTCDayTimeStamp();
  if ((date - nextDay) < 0) {
    return 'today';
  }

  return new Date(date).toDateString();
};

const displayDate: TgetDate = (date) => {
  const nextDay = nextUTCDayTimeStamp();
  const msInDay = 86400000;
  const todayStart = nextDay - msInDay;
  if (((date - nextDay) < 0) && ((date - todayStart) > 0)) {
    return 'today';
  }

  return new Date(date).toDateString();
};

export {
  nextTraining,
  displayDate,
};
