import React from 'react';
import './burger-menu.scss';
import { Link } from "react-router-dom";

function burgerMenu() {
  return (
    <div className="burger-menu" id='burgerMenuID'>
      {/* <a  className="burger-menu__button" onClick = {handleClick}>
<span className="burger-menu__lines"></span>
</a> */}
      <button className="c-hamburger c-hamburger--htx" id='c-hamburgerID' onClick={handleClick}>
        <span>toggle menu</span>
      </button>
      <nav className="burger-menu__nav">
        <ul className="list">
          <li className="list__item" ><Link to='/dailygoal' className="list__link list__link" onClick={handleClick}>Daily goal</Link>
          </li>
          <li className="list__item" ><Link to='/dashboard' className="list__link list__link_active" onClick={handleClick}>Dashboard</Link>
          </li>
          <li className="list__item" ><Link to='/training' className="list__link list__link_active" onClick={handleClick} >Training</Link>
          </li>
          <li className="list__item" ><Link to='/vocabulary' className="list__link list__link_active" onClick={handleClick}>Vocabulary</Link>
          </li>
          <li className="list__item" ><Link to='/settings' className="list__link list__link_active" onClick={handleClick}>Settings</Link>
          </li>
          <li className="list__item" ><Link to='/magicButton' className="list__link list__link_active" onClick={handleClick}>Magic Button</Link>
          </li>
        </ul>
        <Link to='/' className='burger_logout'>logout</Link>
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
