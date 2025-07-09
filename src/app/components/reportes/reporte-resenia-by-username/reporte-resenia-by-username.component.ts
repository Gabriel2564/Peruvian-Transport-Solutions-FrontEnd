import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { ReseniaService } from '../../../services/Resenia.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reporte-resenia-by-username',
  imports: [BaseChartDirective],
  templateUrl: './reporte-resenia-by-username.component.html',
  styleUrl: './reporte-resenia-by-username.component.css'
})
export class ReporteReseniaByUsernameComponent {
pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  pieChartLabels: string[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartData: number[] = [];

  constructor(private reS: ReseniaService){}

  ngOnInit(): void {
    this.reS.ReseniaByUsername().subscribe(data => {
      const Resenia = data.map(resenia => resenia.username);
      const Cantidades = data.map(resenia => resenia.quantityResenia);

      this.pieChartLabels = Resenia;
      this.pieChartData = Cantidades;
    })
  }
}
