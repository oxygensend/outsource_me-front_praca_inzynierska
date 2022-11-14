import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Navbar} from "./Components/Navbar/Navbar";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import {Footer} from "./Components/Footer/Footer";
import moment from "moment/moment";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
]);

moment.locale('pl');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

      <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
