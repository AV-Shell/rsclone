import React from 'react';
import './spinner.scss';
import logo from './assets/logo.png';

const Spinner: React.FC = () => (
  <div className="main-app-sp">
    <div className="spinner">
      <div className="circle-1" />
      <div className="countdown">
        <img className="img-fluid" src={logo} alt="RS Lang" />
      </div>
      <div className="circle-2" />
    </div>
  </div>
);

export default Spinner;
