import { IAuthenticationDetailsData, CognitoUserPool, CognitoUserAttribute, CognitoUserSession } from "amazon-cognito-identity-js";

export class CognitoUtils{
    
    public static getAuthDetails(username: string, password: string): IAuthenticationDetailsData {
        return {
            Username: username,
            Password: password,
        };
    }

    public static getUserPool() {
        const cognitoSettings = {
          UserPoolId: 'ap-southeast-1_8aQkNdVF9',
          ClientId: 'qsue4av0se4d70rf21d3m5vh8'
        }
        return new CognitoUserPool(cognitoSettings);
    }

    public static getCurrentUser() {
        return this.getUserPool().getCurrentUser();
    }

    public static getAttribute(attrs: CognitoUserAttribute[], name: string): CognitoUserAttribute {
        return attrs.find(atr => atr.getName() === name);
    }

    public static createNewUserAttributes(request): CognitoUserAttribute[] {
        const emailAttribute = new CognitoUserAttribute({Name : 'email', Value : request.email });
        const nameAttribute = new CognitoUserAttribute({Name : 'name', Value : (request.name ? 1 : 0).toString() });
        return [
            emailAttribute, nameAttribute
        ];
    }

    public static getIdToken(): string {
        let token = null;
        if (this.getCurrentUser() != null){
            let session: CognitoUserSession = this.getSession();
            token = session.getIdToken().getJwtToken();
        }
        return token;
        // let idToken = null;
        // if (this.getCurrentUser() != null)
        //     this.getCurrentUser().getSession(function (err, session) {
        //         if (err) {
        //             console.log("CognitoUtil: Can't set the credentials:" + err);
        //         }
        //         else {
        //             if (session.isValid()) {
        //                 idToken = session.getIdToken().getJwtToken();
        //             } else {
        //                 console.log("CognitoUtil: Got the id token, but the session isn't valid");
        //             }
        //         }
        //     });
        // return idToken;
    }

    public static getAccessToken(): string {
        let token = null;
        if (this.getCurrentUser() != null){
            let session: CognitoUserSession = this.getSession();
            token = session.getAccessToken().getJwtToken();
        }
        return token;
        //     this.getCurrentUser().getSession(function (err, session) {
        //         if (err) {
        //             console.log("CognitoUtil: Can't set the credentials:" + err);
        //         }
        //         else {
        //             if (session.isValid()) {
        //                 token = session.getAccessToken().getJwtToken();
        //             } else {
        //                 console.log("CognitoUtil: Got the access token, but the session isn't valid");
        //             }
        //         }
        //     });
        // return token;
    }

    private static getSession(): CognitoUserSession{
        let activeSession: CognitoUserSession = null;
        if (this.getCurrentUser() != null)
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log("CognitoUtil: Can't set the credentials:" + err);
                }
                else {
                    activeSession = session;
                }
            });
        return activeSession;
    }

}