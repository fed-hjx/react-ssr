import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import App from "./app";

const store = configureStore(window.REDUX_STATE);
console.log(5555)
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
, document.getElementById('app'));