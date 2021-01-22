import React from 'react';
import './logout-page.scss';
import { logOutProps } from '../../constants/interfaces';
import { Link } from "react-router-dom";

function LogoutPage(props: logOutProps) {
  const { logoutUser } = props;
  // Component code start
  return (
    <div className="logout-page">
      <h2>Вы уверены что хотите выйти?</h2>
      <div className="buttons-container">
        <span className="buttons button-quit" onClick={logoutUser}>Выйти</span>
        <Link to='/dashboard' className="buttons" >На главную</Link>
      </div>

    </div>
  );
}

export default LogoutPage;
