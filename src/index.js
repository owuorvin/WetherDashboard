import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import './styles/style.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Appearance} from "./constants";

const theme = Appearance.theme;
switch (theme) {
    case "black":
        require(`./styles/theme/black.scss`);
        break;
    case "white":
        require(`./styles/theme/white.scss`);
        break;
    case "blue":
    default:
        require(`./styles/theme/blue.scss`);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
