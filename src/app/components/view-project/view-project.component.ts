import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PruebaService } from '../../services/prueba.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
  providers: [PruebaService]

})
export class ViewProjectComponent implements OnInit {

  public creator: any;
  public id: any
  public usuario: any
  public my : boolean;
  inviteForm: FormGroup;

  constructor(private _route: ActivatedRoute, private _router: Router, private auth2: PruebaService, private fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.creator = this._route.snapshot.paramMap.get('creator');
    this.id = this._route.snapshot.paramMap.get('project');


    //asignar validaciones al formulario
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

    });
    const user = await this.auth2.getCurrentUser();

    if (user) {
      this.usuario = user;
      if(this.usuario.uid == this.creator){
        this.my = true;
      }
      this.auth2.getProject(this.creator, this.id).then((data) => {
        console.log(data.data());

      })
    } else {
      this._router.navigate(['/auth/login']);
    }

  }

  submit() {
    this.auth2.getInviteUser(this.inviteForm.value.email).subscribe(resp => {

      if (resp.length == 0) {
        console.log('No se encontro al usuario');

      } else {
        const data ={ 
          link : `http://localhost:4200/view-project/${this.creator}/${this.id}`,
          fecha : Date.now(),
          nombre: this.usuario.displayName,
          mensaje : 'Hola, te invito a unirte a este proyecto...'
        }
         this.auth2.sendInvatition(resp[0].uid, data);
      }
    });
  }

}
