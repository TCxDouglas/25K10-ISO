import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PruebaService } from '../../services/prueba.service';


@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.component.html',
  styleUrls: ['./bandeja.component.css'],
  providers: [PruebaService]

})
export class BandejaComponent implements OnInit {

  public usuario : any;

  constructor(private auth2 : PruebaService, private _router : Router) { }

  async ngOnInit() {
    
  const user = await this.auth2.getCurrentUser();
  
  if (user){
    this.auth2.getUserData(user.uid).subscribe(datauser => {
      this.usuario = datauser;
      //console.log(this.usuario.uid);
      
    });
  } else {
    this._router.navigate(['/auth/login']);
  }

}

}
