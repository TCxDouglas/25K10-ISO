import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PruebaService } from '../../services/prueba.service';


@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
  providers: [PruebaService]

})
export class MainHeaderComponent implements OnInit {


  newProject: FormGroup;
  @Input() usuario: any;

  constructor( private auth2 : PruebaService, private fb: FormBuilder) { }

  ngOnInit(): void {

        //asignar validaciones al formulario
        this.newProject = this.fb.group({
          nombre: ['', [Validators.required, Validators.minLength(5)]],
          descripcion: ['',[Validators.required, Validators.minLength(10)]],

        });
  }


  submit(){
      const data = {
        nombre: this.newProject.value.nombre,
        descripcion: this.newProject.value.descripcion,
        creador: this.usuario.uid,
        fecha: Date.now()
      };

      //console.log(data);
      this.auth2.createProject(data);
    
  }
}
