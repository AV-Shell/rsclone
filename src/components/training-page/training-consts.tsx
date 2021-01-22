import React from 'react';
import {ONE_DAY} from '../../constants/constants';

type IntervalTime = {
  [days: number]: number 
};

const DAY_IN_SECONDS : number = ONE_DAY;
const levelsOfRepeat: IntervalTime = {
  0: 0,
  1: DAY_IN_SECONDS,
  2: DAY_IN_SECONDS * 2,
  3: DAY_IN_SECONDS * 4,
  4: DAY_IN_SECONDS * 8,
  5: DAY_IN_SECONDS * 16,
  6: DAY_IN_SECONDS * 32,
  7: DAY_IN_SECONDS * 64,
  8: DAY_IN_SECONDS * 128,
  9: DAY_IN_SECONDS * 256,
  10: DAY_IN_SECONDS * 512,
};

const MAX_REPEAT_LEVEL: number = 10;

export { levelsOfRepeat, MAX_REPEAT_LEVEL };
