import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {  PruebaService } from '../../../services/prueba.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, PruebaService]
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router, private auth :  AuthService, private auth2: PruebaService) { }

  ngOnInit(): void {

    
  }

  async login(provider: string){

    try{
      await this.auth2.login(provider);

    }catch(error){
      console.log(error);
    }
    /*this._router.navigate(['home/dashboard']);
  
      this.auth.login(provider).then(data =>{
        console.log(data.user);
        if(data.user){
            this._router.navigate(['home/dashboard']);
        }else{
            console.log('No se pudo logear :(');
        }
    });
    */

  }

}
