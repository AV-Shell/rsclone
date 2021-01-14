import React from 'react';

type IntervalTime = {
  [days: number]: number 
};

const DAY_IN_SECONDS : number = 86400;
const levelsOfRepeat: IntervalTime = {
  1: DAY_IN_SECONDS,
  2: DAY_IN_SECONDS * 3,
  3: DAY_IN_SECONDS * 7,
  4: DAY_IN_SECONDS * 14,
  5: DAY_IN_SECONDS * 30,
  6: DAY_IN_SECONDS * 90,
  7: DAY_IN_SECONDS * 180,
  8: DAY_IN_SECONDS * 365,
};
