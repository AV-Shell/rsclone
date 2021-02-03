import React, { useRef, useEffect, useState } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import BurgerMenu from '../burger-menu';
import { headerProps } from '../../constants/interfaces';
import { AVA_URL, FLAG_URL_4X3 } from '../../constants/constants';

import { RU, EN } from './langs';

function Header(props: headerProps) {
  const {
    isDarkTheme,
    isAuthorizated,
    isMute,
    setIsMute,
    isLanguageRU,
    setIsLanguageRU,
    settings,
    setIsModalWindow,
    toggleTheme,
  } = props;
  const [isLangVisible, setisLangVisible] = useState<boolean>(true);
  const [isUserSetUp, setisUserSetUp] = useState<boolean>(false);
  const [isLangUp, setisLangUp] = useState<boolean>(false);
  const [isUserVisible, setisUserVisible] = useState<boolean>(true);
  const [isToggleMenu, setisToggleMenu] = useState<boolean>(true);
  const refLang: any = useRef(null);
  const refUser: any = useRef(null);
  const userName: any = localStorage.getItem('userName')?.slice(1, -1);
  let currentLang = isLanguageRU ? RU : EN;
  useEffect(() => {
    currentLang = isLanguageRU ? RU : EN;
  }, [isLanguageRU]);
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
    document.addEventListener('click', handleClickOutsideLang, true);
    return () => {
      document.removeEventListener('click', handleClickOutsideLang, true);
    };
  });

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideUser, true);
    return () => {
      document.removeEventListener('click', handleClickOutsideUser, true);
    };
  });
  const toggleCurrentLang = () => {
    setIsLanguageRU((value: boolean) => !value);
  };
  const toggleCurrentMute = () => {
    setIsMute((value: boolean) => !value);
  };
  const toggleHeaderMobile = () => {
    console.log(123);

    setisToggleMenu((value) => !value);
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
    <div className="header-login">
      <Link to="/login" className="header-login-link">
        {currentLang.logIn}
      </Link>
      <Link to="/registration" className="header-login-link">
        {currentLang.registration}
      </Link>
    </div>
  );

  const styleTheme = isDarkTheme
    ? currentLang.darkTheme
    : currentLang.lightTheme;
  const styleLangDownMenu =
    isLangUp && isLangVisible ? 'header-lang isActive' : 'header-lang';
  const styleLangIcon =
    isLangUp && isLangVisible
      ? 'bi bi-chevron-down rotate'
      : 'bi bi-chevron-down';
  const styleUserDownMenu =
    isUserSetUp && isUserVisible
      ? 'header-userInfo isActive'
      : 'header-userInfo';
  const styleUserIcon =
    isUserSetUp && isUserVisible
      ? 'bi bi-chevron-down rotate'
      : 'bi bi-chevron-down';
  const setLang = isLanguageRU ? <div> English</div> : <div>Русский</div>;
  let avatarUrl: string = `${AVA_URL}ava_${settings.optional.avatarID}.png`;
  useEffect(() => {
    avatarUrl = `${AVA_URL}ava_${settings.optional.avatarID}.png`;
  }, [settings.optional.avatarID]);

  const flagUrl = isLanguageRU
    ? `${FLAG_URL_4X3}ru.svg`
    : `${FLAG_URL_4X3}us.svg`;
  const flagDropUrl = !isLanguageRU
    ? `${FLAG_URL_4X3}ru.svg`
    : `${FLAG_URL_4X3}us.svg`;

  const switchLangMenu = (
    <div
      className={styleLangDownMenu} onClick={toggleLangUp} ref={refLang}
      role="presentation"
    >
      <img src={flagUrl} alt="flag" />
      {!isLanguageRU && <span>English</span>}
      {isLanguageRU && <span>Русский</span>}

      <i className={styleLangIcon} />
      <div
        className="header-lang-dropdown"
        ref={refLang}
        onClick={toggleCurrentLang}
        role="presentation"
      >
        <div className="header-lang-dropdown-content">
          <img src={flagDropUrl} alt="flag" />
          {setLang}
        </div>
      </div>
    </div>
  );

  const authorizationHeader = (
    <div className="header-switch-menu-toggle">
      <div
        className={styleUserDownMenu}
        onClick={toggleUserSetUp}
        ref={refUser}
        role="presentation"
      >
        <div className="header-userInfo-userImg">
          <img src={avatarUrl} alt="avatar" />
        </div>
        <i className={styleUserIcon} />
        <div className="header-userInfo-dropdown" ref={refUser}>
          <div>
            <i className="bi bi-person" />
            {userName}
          </div>
          <Link to="/settings">
            <i className="bi bi-file-earmark-person" />
            <div>{currentLang.profileSetting}</div>
          </Link>
          <hr className="separator" />
          <Link to="/logout">
            <i className="bi bi-box-arrow-left" />
            <div>{currentLang.logOut}</div>
          </Link>
        </div>
      </div>

      <div className="header-theme">
        <div className="header-theme-label">{styleTheme}</div>
        <div
          className="header-toggle click" onClick={toggleTheme}
          role="presentation"
        >
          <span />
        </div>
      </div>
    </div>
  );

  const muteImgSet = isMute ? 'bi bi-volume-mute' : 'bi bi-volume-up';
  const headerSwitchMenu = isAuthorizated ? <BurgerMenu setIsModalWindow={setIsModalWindow} isLanguageRU={isLanguageRU} /> : null;
  const headerSwitch = isAuthorizated ? authorizationHeader : loginMenu;
  const headerToggleMenu = isToggleMenu ? 'header' : 'header isToggle';

  return (
    <header className={headerToggleMenu}>
      {headerSwitchMenu}
      <div className="header-logoimg" id="logoImgID" />
      <div className="header-switch-menu">
        <div className="header-mute" onClick={toggleCurrentMute} role="presentation">
          <i className={muteImgSet} />
        </div>
        {switchLangMenu}
        {headerSwitch}
        <span className="close" onClick={toggleHeaderMobile} role="presentation" />
      </div>

      <div className="header-toggle-menu " onClick={toggleHeaderMobile} role="presentation">
        <div className="dot" />
      </div>
    </header>
  );
}

export default Header;
