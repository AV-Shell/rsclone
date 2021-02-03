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
      <div className="magic-button-container">
        <img className="magic-button-img" src={logo} alt="Magic Button" />
      </div>
      {/* <div className="magic-buttons-container">
        <div className="magic-button btn1">
          MAGIC
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="magic-button btn2">
          BUTTONS
          <span />
          <span />
          <span />
          <span />
        </div>
      </div> */}
    </div>
  );
};

export default MagicButton;
