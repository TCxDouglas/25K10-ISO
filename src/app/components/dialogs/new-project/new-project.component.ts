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
      total : 0,
      caracteristicas: [
        {
          nombre: 'Adecuacion Funcional',
          total: this.adecuacionForm.value.porcentaje,
          subtotal: parseFloat(this.adecuacionForm.value.porcentaje) / 3,
          porcentaje: 0,
          stroke: 440,
          sumacat : 0,
          subs: [
            {
              total: 0,
              nombre: 'Completitud Funcional',
              hus: 0,
              husc: 0,
              thus : 0
            },
            {
              total: 0,
              hus: 0,
              nombre: 'Correcion Funcional',
              husc: 0,
              thus : 0


            },
            {
              total: 0,
              nombre: 'Pertinencia Funcional',
              hus: 0,
              husc: 0,
              thus : 0


            },
          ]

        },

        {
          nombre: 'Eficiencia de Desempeño',
          total: this.eficienciaForm.value.porcentaje,
          subtotal: parseFloat(this.eficienciaForm.value.porcentaje) / 3,
          sumacat : 0,
          stroke: 440,
          porcentaje: 0,
          subs: [
            {
              total: 0,
              nombre: 'Comportamiento Temporal',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Utilización de Recursos',
              hus: 0,
              husc: 0,
              thus : 0


            },
            {
              total: 0,
              nombre: 'Capacidad',
              hus: 0,
              husc: 0,
              thus : 0


            },
          ]

        },

        {
          nombre: 'Compatibilidad',
          total: this.compatibilidadForm.value.porcentaje,
          subtotal: parseFloat(this.compatibilidadForm.value.porcentaje) / 2,
          porcentaje: 0,
          stroke: 440,
          sumacat : 0,
          subs: [
            {
              total: 0,
              nombre: 'Coexistencia',
              hus: 0,
              husc: 0,
              thus : 0


            },
            {
              total: 0,
              nombre: 'Interoperabilidad',
              hus: 0,
              husc: 0,
              thus : 0


            },
          ]

        },

        {
          total: this.usabilidadForm.value.porcentaje,
          porcentaje: 0,
          subtotal: parseFloat(this.usabilidadForm.value.porcentaje) / 6,
          stroke: 440,
          nombre: 'Usabilidad',
          sumacat : 0,
          subs: [
            {
              total: 0,
              nombre: 'Inteligibilidad',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Aprendizaje',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Operabilidad',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Protección frente a errores de usuario',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Estética',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Accesibilidad',
              hus: 0,
              husc: 0,
              thus : 0

            },
          ]

        },

        {
          nombre: 'Fiabilidad',
          total: this.fiabilidadForm.value.porcentaje,
          subtotal: parseFloat(this.fiabilidadForm.value.porcentaje) / 4,
          porcentaje: 0,
          stroke: 440,
          sumacat : 0,
          subs: [
            {
              total: 0,
              nombre: 'Madurez',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Disponibilidad',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Tolerancia a fallos',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Capacidad de recuperación',
              hus: 0,
              husc: 0,
              thus : 0

            },
          ]

        },

        {
          nombre: 'Seguridad',
          total: this.seguridadForm.value.porcentaje,
          subtotal: parseFloat(this.seguridadForm.value.porcentaje) / 5,
          porcentaje: 0,
          stroke: 440,
          sumacat : 0,
          subs: [
            {
              total: 0,
              nombre: 'Confidencialidad',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Integridad',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'No repudio',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Autenticidad',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Responsabilidad',
              hus: 0,
              husc: 0,
              thus : 0

            },

          ]
        },

        {
          nombre: 'Mantenibilidad',
          total: this.mantenibilidadForm.value.porcentaje,
          subtotal: parseFloat(this.mantenibilidadForm.value.porcentaje) / 5,
          porcentaje: 0,
          stroke: 440,
          sumacat : 0,
          subs: [
            {
              total: 0,
              nombre: 'Modularidad',
              hus: 0,
              husc: 0,
              thus : 0

            },

            {
              total: 0,
              nombre: 'Reusabilidad',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Analizabilidad',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Capacidad de ser modificado',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Capacidad de ser probado',
              hus: 0,
              husc: 0,
              thus : 0

            },

          ]

        },

        {
          nombre: 'Portabilidad',
          total: this.portabilidadForm.value.porcentaje,
          subtotal: parseFloat(this.portabilidadForm.value.porcentaje) / 3,
          porcentaje: 0,
          stroke: 440,
          sumacat : 0,
          subs: [
            {
              total: 0,
              nombre: 'Adaptabilidad',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Facilidad de instalación',
              hus: 0,
              husc: 0,
              thus : 0

            },
            {
              total: 0,
              nombre: 'Capacidad de ser reemplazado',
              hus: 0,
              husc: 0,
              thus : 0

            },
          ]

        }
      ]
    };

    const total = parseFloat(this.adecuacionForm.value.porcentaje) + parseFloat(this.compatibilidadForm.value.porcentaje) + parseFloat(this.eficienciaForm.value.porcentaje) + parseFloat(this.fiabilidadForm.value.porcentaje) + parseFloat(this.mantenibilidadForm.value.porcentaje) + parseFloat(this.portabilidadForm.value.porcentaje) + parseFloat(this.seguridadForm.value.porcentaje) + parseFloat(this.usabilidadForm.value.porcentaje);
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
