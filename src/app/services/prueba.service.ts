import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { Global } from '../models/global';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable()
export class PruebaService {

    public usuario: any = {};
    constructor(private afAuth: AngularFireAuth, private _router: Router, private db: AngularFirestore) {


    }

    async login(provider: string) {
        if (provider == 'google') {
            return await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(data => {
                // console.log(data.user);
                this.createNewUser(data.user);
                this._router.navigate(['/home/dashboard']);
            });
        }

        else if (provider == 'github') {
            return await this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(data => {
                //console.log(data.user);
                this.createNewUser(data.user);
                this._router.navigate(['/home/dashboard']);
            });
        }



    }

    async getCurrentUser() { // Recoge al usuario actual si es que existe
        return this.afAuth.authState.pipe(first()).toPromise();

    }


    logout() {

        this.afAuth.auth.signOut().then(() => {
            this._router.navigate(['/auth/login']);
        });

    }

    async createNewUser(data): Promise<void> {//Crea un un nuevo usuario en el documento 'users' de firestore
        //console.log(data);
        const newData = {
            displayName: data.displayName,
            uid: data.uid,
            photoURL: data.photoURL,
            email: data.email
        }
        return this.db.collection('users').doc(data.uid).set(newData);
    }

    getUserData(uid: string) {
        return this.db.collection('users').doc(uid).valueChanges();
    }




    //PROJECTS

    getProject(creator: string, id: string){

      return  this.db.doc(`users/${creator}/projects/${id}`).ref.get();

    }

    getMyProjcts(uid:string){
      return  this.db.collection(`users/${uid}/projects/` , ref => ref.orderBy('fecha', 'desc').limit(50)).snapshotChanges().pipe(map(actions => {
      
      return actions.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id
        //console.log(data);
        return data;
      })
    }));
    }

    createProject(data) {

        return this.db.collection(`users/${data.creador}/projects`).add(data).then(resp =>
            this.db.collection(`projects/${data.creador}/projects`).add(data).then(()=>{
                setTimeout(() => { this._router.navigate(['/home/dashboard'])}, 2500);

            })

        ).catch(err => console.log(err));

    }


    getInviteUser(email:string){
        return  this.db.collection(`users/`, ref => ref.where('email', '==', email)).snapshotChanges().pipe(map(actions => {
      
            return actions.map(a => {
              const data = a.payload.doc.data() as any;
              return data;
            })
          }));

    }

    sendInvatition(uid:string, data: any){

        return this.db.collection(`users/${uid}/inbox`).add(data);

    }

    getInbox(uid:string){

        return  this.db.collection(`users/${uid}/inbox/` , ref => ref.orderBy('fecha', 'desc').limit(10)).snapshotChanges().pipe(map(actions => {
      
            return actions.map(a => {
              const data = a.payload.doc.data() as any;
              data.id = a.payload.doc.id
              //console.log(data);
              return data;
            })
          }));

    }

}