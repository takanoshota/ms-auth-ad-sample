import logo from './logo.svg';
import './App.css';

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


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
