import React from 'react';
import './header.scss';
import BurgerMenu from '../burger-menu';
import { Link } from "react-router-dom";
import { headerProps } from '../../constants/interfaces';

function Header(props: headerProps) {
  console.log('header props:', props);
  const {
    isDarkTheme, isAuthorizated
  } = props;
  const loginMenu = <div className='header-login-menu'>
    <Link to='/login ' className='header-login'> Login</Link>
    <Link to='/registration' className='header-login'> Login</Link>
  </div>;
  const styleTheme = isDarkTheme ? 'Dark theme' : 'Light theme';
  let headerSwitchMenu = isAuthorizated ? <BurgerMenu /> : loginMenu;
  console.log(headerSwitchMenu);

  return (
    <header className="header">
      {headerSwitchMenu}
      <h2>Header component</h2>
      <div className="header-theme">
        <div className="base-text-label">{styleTheme}</div>
        <div className="header-toggle click" onClick={props.toggleTheme}>
          <span></span>
        </div>
      </div>
    </header>
  );
}

export default Header;
