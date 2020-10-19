import { Component, Input, OnInit } from '@angular/core';
import { PruebaService } from '../../services/prueba.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
  providers: [PruebaService]

})
export class AsideComponent implements OnInit {

  @Input() uid: any;
  public usuario: any;
  constructor(private auth2: PruebaService, private _router: Router) { }

  ngOnInit() {

    console.log(this.uid);
    this.auth2.getUserData(this.uid).subscribe(datauser => {
      this.usuario = datauser;
     // console.log(this.usuario);

    });

  }

  salir() {
    this.auth2.logout();
  }

}
