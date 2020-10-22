import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';




@Component({
  selector: 'app-confirm-create',
  templateUrl: './confirm-create.component.html',
  styleUrls: ['./confirm-create.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class ConfirmCreateComponent implements OnInit {

  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<ConfirmCreateComponent>) { 
  }

  
  ngOnInit(): void {

  }

  onClose(){
    this.dialogRef.close({ data: 'cancel' })
  }

  onSubmit(){
    this.dialogRef.close({ data: 'ok' })

  }

}
