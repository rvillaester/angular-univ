import { Injectable } from '@angular/core';
import { CognitoUser, AuthenticationDetails, CognitoUserSession, CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoUtils } from '../shared/cognito.utils';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  session: CognitoUserSession;
  userPool: CognitoUserPool;

  constructor(private router: Router) {
    this.userPool = CognitoUtils.getUserPool();
  }

  private getUserData(username: string) {
    return {
        Username: username,
        Pool: this.userPool
    };
  }

  signup(newUser: User, password: string) {
    const attrs = CognitoUtils.createNewUserAttributes(newUser);
    new Promise((resolve, reject) => {
      this.userPool.signUp(
        newUser.username,
        password,
        attrs, null, (err, result) => {
          if (err) {
            console.log(err);
            reject(err)
          } else {
            resolve(result.user)
          }
        }
      )
    }).then(user => {
      console.log('Successful signup')
      console.log(user);
      this.router.navigate(['/']);
    }).catch(err => {
      console.log(err)
    })
  }

  signin(username: string, password: string) {
    const cognitoUser = new CognitoUser(this.getUserData(username));
    const authenticationDetails = new AuthenticationDetails(CognitoUtils.getAuthDetails(username, password));
    let success = false;
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
          console.log(result);
          this.router.navigate(['']);
      },
      onFailure: err => {
        console.error('error');
        console.error(err);
        alert('Invalid username or password');
      }
    });
    return success;
  }

  logout() {
    let currentUser = CognitoUtils.getCurrentUser()
    if (currentUser !== null){
      console.log('logging out');
      currentUser.signOut();
    } 
  }

  getAccessToken() {
    return CognitoUtils.getAccessToken();
  }

  getIdToken() {
    return CognitoUtils.getIdToken();
  }

  isAuthenticated() {
    return this.getIdToken() != null;
  }
}
