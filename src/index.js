/**
=========================================================
* the Multiwallet App React - v1.1.0
=========================================================

* Copyright 2022 Akhil Choudhary

Coded by www.akhilchoudhary.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/


import React from 'react';
import ReactDOM from 'react-dom/client';
import { cssTransition, ToastContainer } from 'react-toastify';
import "animate.css/animate.min.css";
import App from './App';
import './assets/styles/index.css';


const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut",
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer transition={bounce} />
    <App />
  </React.StrictMode>
);
