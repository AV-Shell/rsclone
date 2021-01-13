import React from 'react';
import './header.scss';
import { Link } from "react-router-dom"; 

const burgerMeny =  <div className="burger-menu" id ='burgerMenuID'> <a  className="burger-menu__button" onClick = {handleClick}>
<span className="burger-menu__lines"></span>
</a>
<nav className="burger-menu__nav">
  {/* <div className="logo" id="logo_burger">

</div> */}
<ul className="list">
<li className="list__item" ><Link to ='/dailygoal' className="list__link list__link" >Daily goal</Link>
  </li>
  <li className="list__item" ><Link to ='/dashboard' className="list__link list__link_active" >Dashboard</Link>
  </li>
  <li className="list__item" ><Link to ='/training' className="list__link list__link_active" >Training</Link>
  </li>
  <li className="list__item" ><Link to ='/vocabulary' className="list__link list__link_active" >Vocabulary</Link>
  </li>
  <li className="list__item" ><Link to ='/settings' className="list__link list__link_active" >Settings</Link>
  </li>
  <li className="list__item" ><Link to ='/magicButton' className="list__link list__link_active" >Magic Button</Link>
  </li>
  </ul>
</nav>
<div className="burger-menu__overlay"></div></div>

function handleClick(e:any) {
  e.preventDefault();
  console.log('По ссылке кликнули.');
  document.getElementById('burgerMenuID')!.classList.toggle('burger-menu_active');
}
function Header() {

 
   return (
    <header className="header">
   
      
        {burgerMeny}
         <h2>Header component</h2>
    </header>
  );
 

}

export default Header;
