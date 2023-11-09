import logo from './logo.svg';
import './App.css';
import Login from './Login'
import * as msal from '@azure/msal-browser';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";



/*
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
  console.log(`no name`);
} else {
  // アカウントが存在する場合、必要な操作を行う
  console.log(`User's name: ${account.name}`);
}

*/


const msalConfig = {
  auth: {
    clientId: '6367da79-4045-4a91-8ccc-495eef9744c5', // Azure ADでのアプリ登録から取得
    authority: 'https://login.microsoftonline.com/bdagile.onmicrosoft.com/', // テナント情報
    //redirectUri: 'https://proud-rock-0aa656700.4.azurestaticapps.net' // リダイレクトURI
    redirectUri: 'http://localhost:3000' // リダイレクトURI
  },
  cache: {
    cacheLocation: "sessionStorage", // キャッシュをlocalStorageに設定
    storeAuthStateInCookie: true // クロスサイトのシナリオで必要な場合
  }
};


const msalInstance = new msal.PublicClientApplication(msalConfig);


/*
const myMSALObj = useMsal();

console.log(myMSALObj.getActiveAccount());

// トークン要求パラメータ
const tokenRequest = {
  //scopes: ["User.Read.All"], // 必要なスコープを指定
  scopes: ["https://graph.microsoft.com/User.Read.All"],
  account: myMSALObj.getActiveAccount() // アクティブなアカウント
};
//const accounts = myMSALObj.getAllAccounts();
// アクセストークンを取得
//const response = myMSALObj.acquireTokenSilent(tokenRequest)
//console.log(response);

//const roles = response.idTokenClaims['roles'];
//console.log(roles);



myMSALObj.acquireTokenSilent(tokenRequest).then(tokenResponse => {
  // Do something with the tokenResponse
}).catch(async (error) => {
  //if (error instanceof InteractionRequiredAuthError) {
  // fallback to interaction when silent call fails
  return myMSALObj.acquireTokenPopup(tokenRequest);
  //}

  // handle other errors
})

*/
const account = msalInstance.getAllAccounts()[0];

//const tokenResponse = await msalInstance.acquireTokenByCode(authCodeRequest, req.body);
//let groups = tokenResponse.idTokenClaims.groups;

//const { instance, accounts } = msal.useMsal();




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          [v7] Azure AD x React Static Web App.
        </p>
        <AuthenticatedTemplate>
          ログインしている
          <p> ユーザID： {account.name}</p>
          <p> ユーザメールアドレス： {account.username} </p>
          <p> ローカルアカウントID： {account.localAccountId} </p>
          <Login></Login>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          ログインしていない
          <Login></Login>
        </UnauthenticatedTemplate>
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
