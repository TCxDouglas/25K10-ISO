import { Component, Input, OnInit } from '@angular/core';
import { PruebaService } from '../../../services/prueba.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-bandeja-content',
  templateUrl: './bandeja-content.component.html',
  styleUrls: ['./bandeja-content.component.css']
})
export class BandejaContentComponent implements OnInit {

  @Input() usuario: any;

  constructor() { }

  ngOnInit(): void {
  }

}
