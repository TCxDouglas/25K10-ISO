import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PruebaService } from '../../services/prueba.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import Swal from 'sweetalert2'



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
  public project : any;
  public unido : boolean;

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
        //console.log(data.data());
        this.project = data.data();

        this.auth2.validateJoin(this.creator, this.id, this.usuario.uid).subscribe(resp =>{
          if (resp.length == 0) {
            this.unido = false;
          } else {
            this.unido = true;
          }

        })
      })
    } else {
      this._router.navigate(['/auth/login']);
    }

  }

  submit() {


    this.auth2.getInviteUser(this.inviteForm.value.email).subscribe(resp => {
      Swal.fire({
        title: 'Buscando usuario...',
        allowOutsideClick: false,
        timer: 1000,
        onBeforeOpen: () => {
          Swal.showLoading()
        },
        onClose: () => {
  
        }
      });
      if (resp.length == 0) {

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No hay usuario registrado con este email',
          showConfirmButton: false,
          timer: 1500
        })

      } else {
        const data ={ 
          link : `/view-project/${this.creator}/${this.id}`,
          fecha : Date.now(),
          nombre: this.usuario.displayName,
          mensaje : 'Hola, te invito a unirte a este proyecto...',
          foto : this.usuario.photoURL,
          proyecto: this.project.nombre
        }
         this.auth2.sendInvatition(resp[0].uid, data);
      }
    });
  }

  unirme(){

    Swal.fire({
      title: 'Por favor espera...',
      allowOutsideClick: false,
      timer: 1000,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
      onClose: () => {

      }
    });

    const data = {
      creator : this.creator,
      user : this.usuario.uid,
      project : this.id,
      projectData : this.project,
      person : {
        displayName : this.usuario.displayName,
        email : this.usuario.email,
        uid : this.usuario.uid
      }
    }

    this.auth2.joinToProject(data);
  }

}
