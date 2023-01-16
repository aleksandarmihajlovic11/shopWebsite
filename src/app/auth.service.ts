import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public angularFirestore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.angularFireAuth.authState.subscribe((user)=>{
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }
      else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  signUp(email: string, pass: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, pass)
    .then((result)=>{
      this.sendVerificationEmail();
      this.setUserData(result.user);
    })
    .catch((error)=>{
      window.alert(error.message);
    })
  }

  sendVerificationEmail(){
    return this.angularFireAuth.currentUser
    .then((u: any)=> u.sendEmailVerification())
    .then(()=>{
      this.router.navigate(['verify-email-address']);
    })
  }

  setUserData(user: any){
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  singIn(email: string, pass: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, pass)
    .then((result)=>{
      this.router.navigate(['/']);
      this.setUserData(result.user)
    })
    .catch((error)=>{
      window.alert(error.message);
    })
  }

  get isLoggedIn(): boolean {
    let localUser = localStorage.getItem('user');
    if(localUser)
    {
      const user = JSON.parse(localUser);
      return user != null && user.emailVerified != false ? true: false;
    }
    else 
    {
      return false;
    }
  }

  getToken(){
    let localUser = localStorage.getItem('user');
    if(localUser)
    {
      const user = JSON.parse(localUser);
      const token = user.stsTokenManager.accessToken;
      return token;
    }
    else
    {
      return null;
    }
  }

  signOut(){
    return this.angularFireAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }
}
