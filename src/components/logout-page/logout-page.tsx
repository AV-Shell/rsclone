/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './logout-page.scss';
import { logOutProps } from '../../constants/interfaces';

interface Ilanguages {
  title: string,
  logout: string,
  escape: string,
  sure: string,
  yes: string,
  no: string,
}

const EN: Ilanguages = {
  title: 'Are you sure you want to exit',
  logout: 'Logout',
  escape: 'Dashboard',
  sure: 'Sure?',
  yes: 'Yes!',
  no: 'No',
};

const RU: Ilanguages = {
  title: 'Вы уверены что хотите выйти?',
  logout: 'Выйти',
  escape: 'На главную',
  sure: 'Уверены?',
  yes: 'Да',
  no: 'Нет',
};

const LogoutPage: React.FC<logOutProps> = (props: logOutProps) => {
  const { isLanguageRU, isDarkTheme, logoutUser } = props;
  // Component code start
  const [isModal, setIsModal] = useState(false);
  const showModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };
  const lang = isLanguageRU ? RU : EN;
  const modal = isModal ?
    (
      <div className="modal-window">
        <div className="modal-form" id="modal_form">
          <div className="title-container">
            <h3 className="title heading">
              {lang.sure}
            </h3>
          </div>
          <div className="buttons-container">
            <div className="button" onClick={logoutUser} role="presentation">{lang.yes}</div>
            <div className="button button-quit" onClick={closeModal} role="presentation">{lang.no}</div>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div className="logout-page">
      <div className="logout-form" id="logout_form">
        <div className="title-container">
          <h3 className="title heading">
            {lang.title}
          </h3>
        </div>
        <div className="buttons-container">
          <div
            className="button" id="logoutPageButton"
            onClick={showModal} role="presentation"
          >
            {lang.logout}
          </div>
          <Link to="/dashboard" className="button button-quit">{lang.escape}</Link>
        </div>
      </div>
      { modal}
    </div>
  );
};

export default LogoutPage;
