import React from 'react';
import { TOTAL_DIFFICULTY_GROUPS } from '../../../constants/constants';


interface forStars {
  level: number
}

function WordStarsLevel(props:forStars) {
  const {level} = props;

  const elements = Array(TOTAL_DIFFICULTY_GROUPS).fill(0)
  .map((el,index,arr) => <i key={index} className={index < (arr.length - 1 - level) ? "bi bi-star" : "bi bi-star-fill"}> 
  </i>);
  return <span className="word-progress-stars">{elements}</span>;
}

export default WordStarsLevel;
