import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartType,ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReseniaService } from '../../../services/Resenia.service';
import { ReseniaByUsernameDTO } from '../../../models/ReseniaByUsernameDTO';

@Component({
  selector: 'app-reporteureseniaporusuario',
  imports: [BaseChartDirective],
  templateUrl: './reporteureseniaporusuario.component.html',
  styleUrl: './reporteureseniaporusuario.component.css'
})
export class ReporteureseniaporusuarioComponent implements OnInit {
   barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private rS: ReseniaService) {}

  ngOnInit(): void {
    this.rS.getCantidadPorUsuario().subscribe(data => {
      this.barChartLabels = data.map(resenia => resenia.username);
      this.barChartData = [
        {
          data: data.map(resenia => resenia.quantityResenia),
          label: 'Cantidad',
          backgroundColor: ['#ad80ad', '#abd3f5'],
          borderColor: '#1062a8',
          borderWidth: 1
        }
      ];
    });
  }
}


