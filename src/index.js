import React from 'react';
import ReactDOM from 'react-dom/client';
import { cssTransition, ToastContainer } from 'react-toastify';
import "animate.css/animate.min.css";
import App from './App';
import './index.css';


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
