import { Component, OnInit } from '@angular/core';
import {  PruebaService } from '../../../../services/prueba.service';

@Component({
  selector: 'app-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.css'],
  providers: [PruebaService]

})
export class LoginContentComponent implements OnInit {

  constructor( private auth2: PruebaService) { }

  ngOnInit(): void {
  }

  login(provider: string){

    this.auth2.login(provider);

  }

}
