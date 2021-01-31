import React from 'react';
import './burger-menu.scss';
import { Link } from "react-router-dom";
import book from './assets/book.svg';
import fitness from './assets/fitness.svg';
import gear from './assets/gear.svg';
import magicButton from './assets/magicButton.svg';
import speedometer from './assets/speedometer.svg';

function burgerMenu() {
  return (
    <div className="burger-menu" id='burgerMenuID'>
    
      <button className="burger-menu-c-hamburger burger-menu-c-hamburger--htx" id='c-hamburgerID' onClick={handleClick}>
        <span>toggle menu</span>
      </button>
      <nav className="burger-menu__nav">
        <ul className="list">
          
          <li className="list__item" ><Link to='/dashboard' className="list__link list__link" onClick={handleClick}>
            <img src={speedometer} alt=""/>
            <span>Dashboard</span>  </Link>
          </li>
          <li className="list__item" ><Link to='/training' className="list__link list__link" onClick={handleClick} >
          <img src={fitness} alt=""/>
           <span>Training</span> </Link>
          </li>
          <li className="list__item" ><Link to='/vocabulary' className="list__link list__link" onClick={handleClick}><img src={book} alt=""/>
            <span>Vocabulary</span> </Link>
          </li>
          <li className="list__item" ><Link to='/settings' className="list__link list__link" onClick={handleClick}><img src={gear} alt=""/>
            <span>Settings</span> </Link>
          </li>
          <li className="list__item" ><Link to='/magicButton' className="list__link list__link" onClick={handleClick}><img src={magicButton} alt=""/>
            <span>Magic Button</span> </Link>
          </li>
        </ul>

        
      </nav>
      <div className="burger-menu__overlay" onClick={handleClick}></div></div>
  )

}
function handleClick() {
  document.getElementById('burgerMenuID')!.classList.toggle('burger-menu_active');
  document.getElementById('c-hamburgerID')!.classList.toggle('is-active');
  document.getElementById('logoImgID')!.classList.toggle('is-active');
}
export default burgerMenu;
