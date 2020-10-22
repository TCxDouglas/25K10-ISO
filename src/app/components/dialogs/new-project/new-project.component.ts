import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { ConfirmCreateComponent } from '../confirm-create/confirm-create.component';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  isEditable = true;
  newProject: FormGroup;

  adecuacionForm: FormGroup;
  eficienciaForm: FormGroup;
  compatibilidadForm: FormGroup;
  usabilidadForm: FormGroup;
  fiabilidadForm: FormGroup;
  seguridadForm: FormGroup;
  mantenibilidadForm: FormGroup;
  portabilidadForm: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public dialog: MatDialog, private fb: FormBuilder, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewProjectComponent>) { }

  ngOnInit(): void {
    this.newProject = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(60)]],

    });


    this.adecuacionForm = this.fb.group({
      porcentaje: ['', Validators.required]
    });
    this.eficienciaForm = this.fb.group({
      porcentaje: ['', Validators.required]
    });
    this.compatibilidadForm = this.fb.group({
      porcentaje: ['', Validators.required]
    });
    this.usabilidadForm = this.fb.group({
      porcentaje: ['', Validators.required]
    });
    this.fiabilidadForm = this.fb.group({
      porcentaje: ['', Validators.required]
    });
    this.seguridadForm = this.fb.group({
      porcentaje: ['', Validators.required]
    });
    this.mantenibilidadForm = this.fb.group({
      porcentaje: ['', Validators.required]
    });
    this.portabilidadForm = this.fb.group({
      porcentaje: ['', Validators.required]
    });
  }

  onClose() {
    this.dialog.closeAll();
  }

  submit() {

    const data = {
      nombre: this.newProject.value.nombre,
      descripcion: this.newProject.value.descripcion,
      creador: this.data.uid,
      fecha: Date.now(),
      porcentajes: {
        adecuacion:{
          total : this.adecuacionForm.value.porcentaje,
          subcaracteristica : parseFloat(this.adecuacionForm.value.porcentaje) / 3
        },
        eficiencia:{
          total :  this.eficienciaForm.value.porcentaje,
          subcaracteristica : parseFloat(this.eficienciaForm.value.porcentaje) / 3
        },
        compatibilidad: {
          total :  this.compatibilidadForm.value.porcentaje,
          subcaracteristica : parseFloat(this.compatibilidadForm.value.porcentaje) / 2    
        },
        usabilidad:{
          total :  this.usabilidadForm.value.porcentaje,
          subcaracteristica : parseFloat(this.usabilidadForm.value.porcentaje) / 6
        }, 
        fiabilidad:{
          total :  this.fiabilidadForm.value.porcentaje,
          subcaracteristica : parseFloat(this.fiabilidadForm.value.porcentaje) / 4
        }, 
        seguridad:{
          total :  this.seguridadForm.value.porcentaje,
          subcaracteristica : parseFloat(this.seguridadForm.value.porcentaje) / 5
        }, 
        mantenibilidad:{
          total :  this.mantenibilidadForm.value.porcentaje,
          subcaracteristica : parseFloat(this.mantenibilidadForm.value.porcentaje) / 5
        }, 
        portabilidad:{
          total :  this.portabilidadForm.value.porcentaje,
          subcaracteristica : parseFloat(this.portabilidadForm.value.porcentaje) / 3
        }
      }
    };

    const total = parseFloat(data.porcentajes.adecuacion.total) + parseFloat(data.porcentajes.compatibilidad.total) + parseFloat(data.porcentajes.eficiencia.total) + parseFloat(data.porcentajes.fiabilidad.total) + parseFloat(data.porcentajes.mantenibilidad.total) + parseFloat(data.porcentajes.portabilidad.total) + parseFloat(data.porcentajes.seguridad.total) + parseFloat(data.porcentajes.usabilidad.total);
    console.log(total);

    if (total == 100) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '40%';
      dialogConfig.height = '500px';
      dialogConfig.data = data;
      const ref = this.dialog.open(ConfirmCreateComponent, dialogConfig);

      ref.afterClosed().subscribe(async res => {
        //console.log(res.data);
        //this.auth2.createProject(data)
        if (res.data == 'ok') {
          this.dialogRef.close({ data: data })
        } else {

        }

      })
    }
    else if (total < 100) {
      this.openSnackBar('Aun no tienes los 100 puntos, tienes ' + total, 'Ok')
    }
    else if (total > 100) {
      this.openSnackBar('Exediste los 100 puntos, tienes ' + total, 'Ok')

    }

  }

  //SMALL ALERTS
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}
