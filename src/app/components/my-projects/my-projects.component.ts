import { Component, OnInit } from '@angular/core';
import { PruebaService } from '../../services/prueba.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css'],
  providers: [PruebaService]
})
export class MyProjectsComponent implements OnInit {

  public usuario : any;
  public projects : any;
  constructor( private auth2 : PruebaService, private _router : Router) { }

    async ngOnInit() {
      
    const user = await this.auth2.getCurrentUser();
    
    if (user){
      this.auth2.getUserData(user.uid).subscribe(datauser => {
        this.usuario = datauser;

        this.auth2.getMyProjcts(user.uid).subscribe(projects =>{
          this.projects = projects
          console.log(projects);
          
        })
        //console.log(this.usuario.uid);
        
      });
    } else {
      this._router.navigate(['/auth/login']);
    }

  }



}
