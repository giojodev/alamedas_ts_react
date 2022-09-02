import React from 'react';
import  {ReactDOM}  from 'react';
import {createRoot} from 'react-dom/client'
import App from './App';
import './assets/css/index.css';
import 'antd/dist/antd.variable.css';
import { ConfigProvider } from 'antd';
import { authReducer } from './reducers';
import { combineReducers,createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';

const reducers=combineReducers({
    auth:authReducer
});

const store=createStore(reducers);

ConfigProvider.config({
    theme:{
        primaryColor:"#003658",
        errorColor:"#D43c37",
        infoColor:"#00ABEC",
        processingColor:"#33BA75",
        successColor:"#008866",
        warningColor:"#F4AD3D"
    }
});

const container= document.getElementById('root') as HTMLElement

const root=createRoot(container);

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)