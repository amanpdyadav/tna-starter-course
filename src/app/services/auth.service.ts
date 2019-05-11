import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

export class Credentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private _fb:any;
  private _db: any;
  private _auth: any;

  private _firebaseConfig = {
    apiKey: 'AIzaSyD2hChUJB6N75nT2hxDYaCR4JpEA75J4js',
    authDomain: 'tna-angular-july-2017.firebaseapp.com',
    databaseURL: 'https://tna-angular-july-2017.firebaseio.com',
    projectId: 'tna-angular-july-2017',
    storageBucket: 'tna-angular-july-2017.appspot.com',
    messagingSenderId: '21902715174'
  }
  constructor() {
    if (!firebase.apps.length) {
        this._fb = firebase.initializeApp(this._firebaseConfig)
        this._auth = this._fb.auth();
  }
  }

  getEvents() {
    return this._fb.database().ref('/event')
  }

  loginWithGoogle() {
    this._auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  emailSignUp(credentials: Credentials): Promise<any> {
    return this._auth.createUserWithEmailAndPassword(credentials.email, credentials.password).catch(error => {
      return {
        type: 'error',
        msg: error.message
      };
    });
  }

  emailLogin(credentials: Credentials): Promise<any> {
    return this._auth.signInWithEmailAndPassword(credentials.email, credentials.password).catch(error => {
      if (error) {
        return {
          type: 'error',
          msg: error.message
        };
      }
    });
  }

  canActivate() {
    return !this.currentUser ? false : true;
  }

  currentUser() {
    return this._auth ? this._auth.currentUser : null;
  }

  resetPassword(email: string): Promise<any> {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log('Email sent.'))
      .catch((error) => {
        if (error) {
          return {
            type: 'error',
            msg: error.message
          };
        }
      })
  }

  logout() {
    firebase.auth().signOut();
  }
}
