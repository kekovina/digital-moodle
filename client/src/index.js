import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './store.js';
import 'antd/dist/antd.css';
import App from './App'
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react'



ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
