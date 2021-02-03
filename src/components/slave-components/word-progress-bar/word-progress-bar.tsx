import React from 'react';
import { MAX_REPEAT_LEVEL } from '../../../constants/constants';

interface IWordProgressProps {
  level: number
}

const WordProgressBar: React.FC<IWordProgressProps> = (props: IWordProgressProps) => {
  const { level } = props;

  const rightNum: number = MAX_REPEAT_LEVEL;
  const progressString: string = `${(level / rightNum) * 100}%`;

  return (
    <div className="progress">
      <div
        className="progress-bar progress-bar-striped"
        style={{ width: progressString }}
      />
    </div>
  );
};

export default WordProgressBar;
