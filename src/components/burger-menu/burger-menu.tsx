import React, { useRef, useEffect, useState } from 'react';
import './burger-menu.scss';
import { Link } from 'react-router-dom';
import book from './assets/book.svg';
import fitness from './assets/fitness.svg';
import gear from './assets/gear.svg';
import magicButton from './assets/magicButton.svg';
import speedometer from './assets/speedometer.svg';
import { RU, EN } from "./langs";

// import { IBurgerHeaderProps } from '../../constants/interfaces';
interface IBurgerHeaderProps {
  setIsModalWindow: React.Dispatch<React.SetStateAction<boolean>>, isLanguageRU: boolean,

}
function BurgerMenu(props: IBurgerHeaderProps) {
  const { setIsModalWindow, isLanguageRU, } = props;
  const [isBurgerUp, setisBurgerUp] = useState<boolean>(false);

  console.log(props);
  function handleClick() {
    setisBurgerUp((value: boolean) => !value);
    document
      .getElementById('burgerMenuID')!
      .classList.toggle('burger-menu_active');
    document.getElementById('c-hamburgerID')!.classList.toggle('is-active');
    document.getElementById('logoImgID')!.classList.toggle('is-active');
    if (!isBurgerUp) {
      setIsModalWindow(true);
    } else setIsModalWindow(false);
  }
  let currentLang = isLanguageRU ? RU : EN;
  useEffect(() => {
    currentLang = isLanguageRU ? RU : EN;
  }, [isLanguageRU]);
  return (
    <div className="burger-menu" id="burgerMenuID">
      <button
        className="burger-menu-c-hamburger burger-menu-c-hamburger--htx"
        id="c-hamburgerID"
        onClick={handleClick}
      >
        <span>toggle menu</span>
      </button>
      <nav className="burger-menu__nav">
        <ul className="list">
          <li className="list__item">
            <Link
              to="/dashboard"
              className="list__link list__link"
              onClick={handleClick}
            >
              <img src={speedometer} alt="" />
              <span>{currentLang.dashboard}</span>
            </Link>
          </li>
          <li className="list__item">
            <Link
              to="/training"
              className="list__link list__link"
              onClick={handleClick}
            >
              <img src={fitness} alt="" />
              <span>{currentLang.training}</span>
            </Link>
          </li>
          <li className="list__item">
            <Link
              to="/vocabulary"
              className="list__link list__link"
              onClick={handleClick}
            >
              <img src={book} alt="" />
              <span>{currentLang.vocabulary}</span>
            </Link>
          </li>
          <li className="list__item">
            <Link
              to="/settings"
              className="list__link list__link"
              onClick={handleClick}
            >
              <img src={gear} alt="" />
              <span>{currentLang.settings}</span>
            </Link>
          </li>
          <li className="list__item">
            <Link
              to="/magicButton"
              className="list__link list__link"
              onClick={handleClick}
            >
              <img src={magicButton} alt="" />
              <span>{currentLang.magicButton}</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="burger-menu__overlay" onClick={handleClick} />
    </div>
  );
}

export default BurgerMenu;
