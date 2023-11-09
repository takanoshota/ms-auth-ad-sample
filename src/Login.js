import { useMsal } from "@azure/msal-react";


const Login = () => {
    const { instance, accounts, inProgress } = useMsal();

    const loginRequest = {
        //scopes: ["api://6367da79-4045-4a91-8ccc-495eef9744c5/access_as_user"],
        //scopes: ["https://graph.microsoft.com/User.Read.All"],
        scopes: ["User.Read"]
    };

    instance.acquireTokenSilent({
        ...loginRequest,
        accounts,
    })
        //取得に成功したらアクセストークンをGraph API実行関数に渡して実行
        .then((response) => {
            console.log(response)
            var headers = new Headers();
            var bearer = "Bearer " + response.accessToken;
            headers.append("Authorization", bearer);
            var options = {
                method: "GET",
                headers: headers
            };
            var graphEndpoint = "https://graph.microsoft.com/v1.0/me";

            fetch(graphEndpoint, options)
                .then(function (response) {
                    //do something with response
                })
        });



    const login = async () => {
        const loginRequest = {
            scopes: ["api://6367da79-4045-4a91-8ccc-495eef9744c5/access_as_user"],
            //scopes: ["https://graph.microsoft.com/User.Read.All"],
        };
        var response = await instance.loginPopup(loginRequest);
        instance.setActiveAccount(response.account);
        console.log(response)

        //const myAccounts: AccountInfo[] = instance.getAllAccounts();
    }


    /*
    const loginRequest2 = {
        scopes: ["api://6367da79-4045-4a91-8ccc-495eef9744c5/access_as_user"],
        //scopes: ["https://graph.microsoft.com/User.Read.All"],
    };
    
    
    instance
        .acquireTokenSilent({
            ...loginRequest2, //Graph APIに要求する権限
            account: accounts[0],//ログインユーザー情報
        })
    
    const accessTokenRequest = {
        scopes: ["user.read"],
        account: accounts[0],
    };
    
    publicClientApplication
        .acquireTokenSilent(accessTokenRequest)
        .then(function (accessTokenResponse) {
            // Acquire token silent success
            let accessToken = accessTokenResponse.accessToken;
            // Call your API with token
            callApi(accessToken);
        })
        .catch(function (error) {
            //Acquire token silent failure, and send an interactive request
            if (error instanceof InteractionRequiredAuthError) {
                publicClientApplication
                    .acquireTokenPopup(accessTokenRequest)
                    .then(function (accessTokenResponse) {
                        // Acquire token interactive success
                        let accessToken = accessTokenResponse.accessToken;
                        // Call your API with token
                        callApi(accessToken);
                    })
                    .catch(function (error) {
                        // Acquire token interactive failure
                        console.log(error);
                    });
            }
            console.log(error);
        });
    
    */

    console.log(accounts)

    if (accounts.length > 0) {
        return <span>There is currently {accounts.length}  signed in!</span>
    } else if (inProgress === "login") {
        return <span>Login is currently in progress!</span>
    } else {
        return (
            <>
                <span>There are currently no users signed in!</span>
                <button onClick={login}>Login</button>
            </>
        );
    }
}

export default Login;