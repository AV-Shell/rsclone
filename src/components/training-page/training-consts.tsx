import React from 'react';

type IntervalTime = {
  [days: number]: number
};

const DAY_IN_SECONDS : number = 24 * 60 * 60 * 1000;
const levelsOfRepeat: IntervalTime = {
  0: 0,
  1: DAY_IN_SECONDS,
  2: DAY_IN_SECONDS,
  3: DAY_IN_SECONDS * 2,
  4: DAY_IN_SECONDS * 3,
  5: DAY_IN_SECONDS * 4,
  6: DAY_IN_SECONDS * 5,
  7: DAY_IN_SECONDS * 6,
  8: DAY_IN_SECONDS * 8,
  9: DAY_IN_SECONDS * 10,
  10: DAY_IN_SECONDS * 12,
  11: DAY_IN_SECONDS * 15,
  12: DAY_IN_SECONDS * 18,
  13: DAY_IN_SECONDS * 22,
  14: DAY_IN_SECONDS * 27,
  15: DAY_IN_SECONDS * 33,
  16: DAY_IN_SECONDS * 40,
  17: DAY_IN_SECONDS * 48,
  18: DAY_IN_SECONDS * 58,
  19: DAY_IN_SECONDS * 70,
  20: DAY_IN_SECONDS * 84,
  21: DAY_IN_SECONDS * 101,
  22: DAY_IN_SECONDS * 122,
  23: DAY_IN_SECONDS * 147,
  24: DAY_IN_SECONDS * 177,
  25: DAY_IN_SECONDS * 213,
  26: DAY_IN_SECONDS * 256,
  27: DAY_IN_SECONDS * 308,
  28: DAY_IN_SECONDS * 370,
};

const MAX_REPEAT_LEVEL: number = 28;
const MIN_REPEAT_LEVEL: number = 0;

export { levelsOfRepeat, MAX_REPEAT_LEVEL, MIN_REPEAT_LEVEL };
