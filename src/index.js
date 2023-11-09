import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import * as msal from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: '6367da79-4045-4a91-8ccc-495eef9744c5', // Azure ADでのアプリ登録から取得
    authority: 'https://login.microsoftonline.com/bdagile.onmicrosoft.com/', // テナント情報
    //redirectUri: 'https://proud-rock-0aa656700.4.azurestaticapps.net' // リダイレクトURI
    redirectUri: 'http://localhost:3000' // リダイレクトURI
  },
  cache: {
    cacheLocation: "localStorage", // キャッシュをlocalStorageに設定
    // cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true // クロスサイトのシナリオで必要な場合
  }
};

const myMSALObj = new msal.PublicClientApplication(msalConfig);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MsalProvider instance={myMSALObj}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

