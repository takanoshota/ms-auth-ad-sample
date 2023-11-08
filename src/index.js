import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as msal from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: 'YOUR_CLIENT_ID', // Azure ADでのアプリ登録から取得
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // テナント情報
    redirectUri: 'YOUR_REDIRECT_URI' // リダイレクトURI
  },
  cache: {
    cacheLocation: "localStorage", // キャッシュをlocalStorageに設定
    storeAuthStateInCookie: true // クロスサイトのシナリオで必要な場合
  }
};

const myMSALObj = new msal.PublicClientApplication(msalConfig);

function getAccount() {
  // アカウント情報をキャッシュから取得
  const accounts = myMSALObj.getAllAccounts();
  if (accounts.length > 0) {
    return accounts[0];
  } else {
    return null;
  }
}

function signIn() {
  // ログイン処理（ユーザーがまだログインしていない場合）
  myMSALObj.loginPopup()
    .then(loginResponse => {
      console.log('id_token acquired at: ' + new Date().toString());
      if (myMSALObj.getAccount()) {
        console.log('ログイン成功');
        // 認証情報を取得
        const account = getAccount();
        // accountオブジェクトには、ユーザーの名前やIDなどの情報が含まれます
        console.log(`User's name: ${account.name}`);
      }
    }).catch(error => {
      console.log(error);
    });
}

// 認証情報がキャッシュにあるか確認し、あれば取得
const account = getAccount();
if (!account) {
  // アカウントが見つからない場合、サインイン関数を呼び出す
  signIn();
} else {
  // アカウントが存在する場合、必要な操作を行う
  console.log(`User's name: ${account.name}`);
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
