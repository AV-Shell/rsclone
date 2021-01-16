import React from 'react';
import './header.scss';
import BurgerMenu from '../burger-menu';

import { headerProps } from '../../constants/interfaces';

function Header(props: headerProps) {
  console.log('header props:', props);

  return (
    <header className="header">
      <BurgerMenu />
      <h2>Header component</h2>
      <div className="header-theme">
        <div className="base-text-label">Light theme</div>
        {/* <Base.TextLabel value={setThemeTextLabel()} /> */}
        <div className="header-toggle click" onClick={props.toggleTheme}>
          <span></span>
        </div>
      </div>
    </header>
  );
}

export default Header;
