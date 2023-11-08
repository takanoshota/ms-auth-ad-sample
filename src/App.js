import logo from './logo.svg';
import './App.css';

import * as msal from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: '6367da79-4045-4a91-8ccc-495eef9744c5', // Azure ADでのアプリ登録から取得
    authority: 'https://login.microsoftonline.com/43c18f2d-9bbd-4dfa-971a-8ab0d9b85039', // テナント情報
    redirectUri: 'https://proud-rock-0aa656700.4.azurestaticapps.net' // リダイレクトURI
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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          [v5]Edit <code>src/App.js</code> and save to reload.
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
