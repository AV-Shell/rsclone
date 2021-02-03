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

export {
  nextTraining,
  displayDate,
};
