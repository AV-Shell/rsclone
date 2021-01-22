import React, {
  useRef, useEffect, useState, ReactNode,
} from 'react';
import './header.scss';
import BurgerMenu from '../burger-menu';
import { Link } from "react-router-dom";
import { headerProps } from '../../constants/interfaces';
import logo from './assets/Logo.svg'
import userImg from './assets/1.png'
import langImg from './assets/flag-en.png'

function Header(props: headerProps) {
  const [isMute, setIsMute] = useState<boolean>(true);
  const [isLunguageRU, setisLunguageRU] = useState<boolean>(false);
  const [isUserSetUp, setisUserSetUp] = useState<boolean>(false);
  const [isLangUp, setisLangUp] = useState<boolean>(false);
  console.log('header props:', props);
  const {
    isDarkTheme, isAuthorizated
  } = props;
  const toggleCurrentLang = () => {
    setisLunguageRU((value) => !value);
  }
  const toggleCurrentMute = () => {
    setIsMute((value) => !value);
    console.log(isMute);

  }
  const toggleUserSetUp = () => {
    setisUserSetUp((value) => !value);
  }
  const toggleLangUp = () => {
    setisLangUp((value) => !value);
  }
  const loginMenu = <div className='header-login'>
    <Link to='/login ' className='header-login-link'> Login</Link>
    <Link to='/registration' className='header-login-link'> Registration</Link>
  </div>;

  const styleTheme = isDarkTheme ? 'Dark theme' : 'Light theme';
  const styleLangDawnMenu = isLangUp ? 'header-lang isActive' : 'header-lang';

  const switchLangMenu = <div className={styleLangDawnMenu} onClick={toggleLangUp}>
    <img src={langImg} alt="en" />
    <span>English</span>
    <i className="bi bi-chevron-down"></i>
    <div className='header-lang-dropdawn'><div>English</div> <div> Русский
  </div></div>
  </div>

  const avtorizationHeader = <div className='header-switch-menu'>
    <div className='header-userInfo'>
      <div className='header-userInfo-userImg'>
        <img src={userImg} alt="" />
        <i className="bi bi-chevron-down"></i>
      </div>
    </div>
    <div className="header-theme">
      <div className="header-theme-label">{styleTheme}</div>
      <div className="header-toggle click" onClick={props.toggleTheme}>
        <span></span>
      </div>
    </div>
  </div>;

  const muteImg = isMute ? <div className='header-mute' onClick={toggleCurrentMute}><i className="bi bi-volume-up"></i> </div> : <div className='header-mute' onClick={toggleCurrentMute}><i className="bi bi-volume-mute"></i></div>;
  const headerSwitchMenu = isAuthorizated ? <BurgerMenu /> : null;
  const headerSwitch = isAuthorizated ? avtorizationHeader : loginMenu;


  return (
    <header className="header">
      {headerSwitchMenu}
      <div className='header-logoimg' id='logoImgID'><img src={logo} alt="" /></div>
      <div className='header-switch-menu'>
        {muteImg}
        {switchLangMenu}
        {headerSwitch}
      </div>


    </header>
  );
}

export default Header;
