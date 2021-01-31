import React from 'react';
import './magic-button.scss';
import logo from './assets/magicButton.png';
import { magicButtonProps } from '../../constants/interfaces';

type IMBProps = magicButtonProps | { isAuthorizated: false };

const MagicButton: React.FC<IMBProps> = (props: IMBProps) => {
  console.log('magic button props', props);
  // Component code start
  return (
    <div className="magic-button">
      <img src={logo} alt="Magic Button" />
    </div>
  );
};

export default MagicButton;
