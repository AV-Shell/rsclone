import React from 'react';
import './spinner.scss';
import logo from './assets/logo.png';

const Spinner = () => {
  return (
    <div className="main-app-sp">
      <div className="spinner">
        <div className="circle-1"></div>
        <div className="countdown">
          <img className="img-fluid" src={logo} alt="RS Lang" />
        </div>
          <div className="circle-2"></div>
        </div>
    </div>
  )
}

export default Spinner;
