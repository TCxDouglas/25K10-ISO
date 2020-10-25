import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PruebaService } from '../../../services/prueba.service';

@Component({
  selector: 'app-category-evaluation',
  templateUrl: './category-evaluation.component.html',
  styleUrls: ['./category-evaluation.component.css'],
  providers: [PruebaService]
})
export class CategoryEvaluationComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['select', 'nombre', 'subcaracteristica'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  public categoria : any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CategoryEvaluationComponent>, private fb: FormBuilder, private auth2: PruebaService) { }

  ngOnInit(): void {

    this.categoria = this.data.categoria;
    //recoger datos desde firebase y montarlos en el template
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //console.log(this.data.categoria);

    this.auth2.getHUSCaracteistica(this.data.creador, this.data.id, this.data.categoria.nombre).subscribe(hus => {
      this.dataSource.data = hus;
      //console.log(hus);

      this.categoria.subs.forEach((row, index) => {
        //console.log(row);
        //console.log(index, row.nombre);

        const data = {
          creator: this.data.creador,
          project: this.data.id,
          subcaracteristica: row.nombre
        }

        this.auth2.getHUS(data).subscribe(hus => {

          this.categoria.subs[index].hus = hus.length;
          if(hus.length > 0){
            this.categoria.subs[index].thus = this.categoria.subtotal / hus.length;
          }
          
          //console.log(this.data.categoria.subs);
          //console.log(hus);


        })

      })

    })

  }



  submit() {
    // console.log(this.selection.selected);
    this.categoria.sumacat = 0;
    this.categoria.subs.forEach((element, i) => {
      this.categoria.subs[i].total = 0;
      this.categoria.subs[i].husc = 0;
        this.selection.selected.forEach((row) =>{

          if (element.nombre.indexOf(row.subcaracteristica) != -1) {
            this.categoria.subs[i].husc += 1;
            this.categoria.subs[i].total += this.categoria.subs[i].thus;
          }
        })


    });


    //HACER LAS OPERAIONES PARA LOS PORCENTAJES
    this.categoria.subs.forEach(element => {
      this.categoria.sumacat += element.total;
        
    });

    this.categoria.porcentaje = Math.round((this.categoria.sumacat / this.categoria.total) * 100);
    this.categoria.stroke =  440 - (440 * this.categoria.porcentaje) / 100 ;

    const readyData = {
      categoria : this.categoria,
      index : this.data.index
    }

    console.log(readyData);

    this.dialogRef.close({data : readyData});
    
    //console.log( parseFloat(this.data.categoria.subtotal),  parseFloat(this.data.categoria.subs.hus));
    

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //seleccionar todos los checkboxs
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  //seleccionar todas las filas
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        this.selection.select(row)
      });

  }

  //selecciona una fila en concreto o todas
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  //actualiza la fila seleccionada
  updateCheckedList(event, row) {
    //console.log(event)
    if (event.checked) {
      //console.log(row);
      this.selection.select(row);

    } else {
      this.selection.deselect(row);
    }
  }

  onClose() {
    this.dialogRef.close({ data: '65' });
  }
}
