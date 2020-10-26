import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PruebaService } from '../../../services/prueba.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-view-evaluation',
  templateUrl: './view-evaluation.component.html',
  styleUrls: ['./view-evaluation.component.css'],
  providers: [PruebaService]
})
export class ViewEvaluationComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Caracteristicas' },
  ];
  public ChartColors = [
    {
      backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(137, 255, 0, 1)', 'rgba(0, 0, 255, 1)','rgb(255, 99, 71)', 'rgb(64, 224, 208)', 'rgb(0, 0, 128)', 'rgb(255, 20, 147)', 'rgb(199, 21, 133)'],
    },
  ]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<ViewEvaluationComponent>, private auth2: PruebaService, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.data.caracteristicas.forEach((element, index) => {
      this.barChartData[0].data[index] = element.porcentaje;
      this.barChartLabels[index] = element.nombre;
    });

  }

  onClose() {
    this.dialogRef.close();
  }

    // events

  

}
