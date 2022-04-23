<script>
    import * as msal from '@azure/msal-browser';

    const myMSALObj = new msal.PublicClientApplication({
        auth: {
            clientId: "328b81e6-2b4b-4860-84d9-192ec822a927",
            redirectUri: "https://mcoauth.dungeons.guide/",
            authority: "https://login.microsoftonline.com/consumers"
        }, cache: {
            cacheLocation: "sessionStorage",
            storeAuthStateInCookie: false
        },
        system :{
            loggerOptions: {
                loggerCallback: (level, message, containsPii) => {
                    console.log(message);
                }
            }
        }
    })

    const loginRequest = {
        scopes: ["XboxLive.signin"]
    }
    export let callback;
    export let enabled;
    export let XBLToken, XSTSToken;

    const authorize = () => (async () => {
        callback(0);
        const resp = await myMSALObj.loginPopup(loginRequest)
        const accessToken = resp.accessToken;
        console.log(resp);
        callback(1);
        const XBL = await (await fetch("https://user.auth.xboxlive.com/user/authenticate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        "Properties": {
                            "AuthMethod": "RPS",
                            "SiteName": "user.auth.xboxlive.com",
                            "RpsTicket": "d="+accessToken
                        },
                        "RelyingParty": "http://auth.xboxlive.com",
                        "TokenType": "JWT"
                    })
                })).json();

        console.log(XBL);
        XBLToken = XBL.Token;
        const userhash = XBL.DisplayClaims.xui[0].uhs;

        callback(2)
        const XSTS = await (await fetch("https://xsts.auth.xboxlive.com/xsts/authorize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "Properties": {
                    "SandboxId": "RETAIL",
                    "UserTokens": [
                        XBLToken
                    ]
                },
                "RelyingParty": "rp://api.minecraftservices.com/",
                "TokenType": "JWT"
            })
        })).json();
        console.log(XSTS);

        XSTSToken = XSTS.Token;

        callback(100, `XBL3.0 x=${userhash};${XSTSToken}`)
    })().catch(err => {
        console.error(err);
        callback(-1, err);
    })

</script>


<button on:click={authorize} disabled={!enabled}>Login Using Microsoft Account</button>

<style>
    button {
        display: flex;
        background-color: lightgray;
        border-color: black;
        border-radius: 0.5em;
        border-style: solid;
        padding: 1em;
    }
</style>