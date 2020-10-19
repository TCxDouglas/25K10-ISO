import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-projects-content',
  templateUrl: './my-projects-content.component.html',
  styleUrls: ['./my-projects-content.component.css']
})
export class MyProjectsContentComponent implements OnInit {

  @Input() usuario: any;
  @Input() projects: any;

  constructor(private _router : Router) { }

  ngOnInit(): void {

    
  }

  viewProject(id: string){
    this._router.navigate([`/view-project/${this.usuario.uid}/${id}`]);

  }

}
