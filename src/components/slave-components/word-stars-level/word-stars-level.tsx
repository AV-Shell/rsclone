import React from 'react';
import { TOTAL_DIFFICULTY_GROUPS } from '../../../constants/constants';

interface forStars {
  level: number
}

const WordStarsLevel: React.FC<forStars> = (props: forStars) => {
  const { level } = props;

  const elements = Array(TOTAL_DIFFICULTY_GROUPS).fill(0)
    .map((el, index, arr) => (
      <i key={`${index + 1}star`} className={index < (arr.length - 1 - level) ? 'bi bi-star' : 'bi bi-star-fill'} />
    ));
  return <span className="word-progress-stars">{elements}</span>;
};

export default WordStarsLevel;
