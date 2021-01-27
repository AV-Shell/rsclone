import React, { useRef, useEffect, useState } from "react";
import "./header.scss";
import BurgerMenu from "../burger-menu";
import { Link } from "react-router-dom";
import { headerProps } from "../../constants/interfaces";
import logo from "./assets/Logo.svg";
import { AVA_URL } from "../../constants/constants";
import { FLAG_URL } from "../../constants/constants";

function Header(props: headerProps) {
  const {
    isDarkTheme,
    isAuthorizated,
    isMute,
    setIsMute,
    isLanguageRU,
    setIsLanguageRU,
    settings,
  } = props;
  const [isLangVisible, setisLangVisible] = useState<boolean>(true);
  const [isUserSetUp, setisUserSetUp] = useState<boolean>(false);
  const [isLangUp, setisLangUp] = useState<boolean>(false);
  const [isUserVisible, setisUserVisible] = useState<boolean>(true);
  const refLang: any = useRef(null);
  const refUser: any = useRef(null);

  function handleClickOutsideLang(event: Event) {
    if (refLang.current && !refLang.current.contains(event.target)) {
      setisLangVisible(false);
      setisLangUp(false);
    }
  }
  function handleClickOutsideUser(event: Event) {
    if (refUser.current && !refUser.current.contains(event.target)) {
      setisUserVisible(false);
      setisUserSetUp(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideLang, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideLang, true);
    };
  });

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideUser, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideUser, true);
    };
  });
  const toggleCurrentLang = () => {
    setIsLanguageRU((value) => !value);
  };
  const toggleCurrentMute = () => {
    setIsMute((value) => !value);
  };
  const toggleUserSetUp = () => {
    setisUserSetUp((value) => !value);
    setisUserVisible(true);
  };
  const toggleLangUp = () => {
    setisLangUp((value) => !value);
    setisLangVisible(true);
  };

  const loginMenu = (
    <div className='header-login'>
      <Link to='/login' className='header-login-link'>
        Login
      </Link>
      <Link to='/registration' className='header-login-link'>
        Registration
      </Link>
    </div>
  );

  const styleTheme = isDarkTheme ? "Dark theme" : "Light theme";
  const styleLangDownMenu =
    isLangUp && isLangVisible ? "header-lang isActive" : "header-lang";
  const styleLangIcon =
    isLangUp && isLangVisible
      ? "bi bi-chevron-down rotate"
      : "bi bi-chevron-down";
  const styleUserDownMenu =
    isUserSetUp && isUserVisible
      ? "header-userInfo isActive"
      : "header-userInfo";
  const styleUserIcon =
    isUserSetUp && isUserVisible
      ? "bi bi-chevron-down rotate"
      : "bi bi-chevron-down";
  const setLang = isLanguageRU ? <div> English</div> : <div>Русский</div>;
  const avatarUrl = `${AVA_URL}ava_${settings.optional.avatarID}.png`;
  const flagUrl = isLanguageRU
    ? `${FLAG_URL}flag_ru.svg`
    : `${FLAG_URL}flag_usa.svg`;

  const switchLangMenu = (
    <div className={styleLangDownMenu} onClick={toggleLangUp} ref={refLang}>
      <img src={flagUrl} alt='flag' />
      {!isLanguageRU && <span>English</span>}
      {isLanguageRU && <span>Русский</span>}
      <i className={styleLangIcon}></i>
      <div
        className='header-lang-dropdown'
        ref={refLang}
        onClick={toggleCurrentLang}
      >
        {setLang}
      </div>
    </div>
  );

  const authorizationHeader = (
    <div className='header-switch-menu'>
      <div
        className={styleUserDownMenu}
        onClick={toggleUserSetUp}
        ref={refUser}
      >
        <div className='header-userInfo-userImg'>
          <img src={avatarUrl} alt='avatar' />
        </div>
        <i className={styleUserIcon}></i>
        <div className='header-userInfo-dropdown' ref={refUser}>
          <div>
            <Link to='/'>Setting</Link>
          </div>
          <div>
            <Link to='/logout'>Logout</Link>
          </div>
        </div>
      </div>

      <div className='header-theme'>
        <div className='header-theme-label'>{styleTheme}</div>
        <div className='header-toggle click' onClick={props.toggleTheme}>
          <span></span>
        </div>
      </div>
    </div>
  );

  const muteImgSet = isMute ? (
     'bi bi-volume-mute'
  ) : (
      'bi bi-volume-up'
  );
  const headerSwitchMenu = isAuthorizated ? <BurgerMenu /> : null;
  const headerSwitch = isAuthorizated ? authorizationHeader : loginMenu;

  return (
    <header className='header'>
      {headerSwitchMenu}
      <div className='header-logoimg' id='logoImgID'>
        <img src={logo} alt='' />
      </div>
      <div className='header-switch-menu'>
      <div className='header-mute' onClick={toggleCurrentMute}>
      <i className= {muteImgSet}></i>
       
        </div>
        {switchLangMenu}
        {headerSwitch}
      </div>
    </header>
  );
}

export default Header;
