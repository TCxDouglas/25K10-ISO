import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';



@Injectable()
export class AuthService {

    public usuario: any ={};

    constructor(private afAuth : AngularFireAuth, private _router: Router){
         /*
        this.afAuth.authState.subscribe(user =>{
            console.log('Estado: ', user);
            
            if(!user){
                return;
            }else{
                this.usuario = user;
            }
        })
        */
    }

    
    login(provider: string) {
        console.log(provider);
        
        if (provider =='google'){
            return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        } else if(provider=='github'){
            return this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
        }else{
            return;
        }
      }
      logout() {
       this.usuario = {};
       return this.afAuth.auth.signOut();
      }
}