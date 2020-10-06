import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { CovidService } from 'src/app/services/covid.service';

@Component({
  selector: 'app-pastel',
  templateUrl: './pastel.component.html',
  styleUrls: ['./pastel.component.css']
})
export class PastelComponent implements OnInit {

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Confirmados', 'Recuperados', 'Activos', 'Defunciones'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: any = [
    {
      backgroundColor: [

        'rgba(255, 240, 30, 0.93)',
        'rgba(50, 230, 50, 0.93)',
        'rgba(255, 30, 30, 0.93)',
        'rgba(30, 40, 250, 0.93)'
      ]
    }
  ];

  countries: string[] = [];
  country: string = null;

  constructor(
    private covidService: CovidService
  ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  loadData(event: any): void{
    if (this.country) {
      this.clear();
      this.covidService.fromCountry(this.country).subscribe(
        data => {
          const last = data.pop();
          this.pieChartData[0]= last.confirmed;
          this.pieChartData[1]= last.recovered;
          this.pieChartData[2]= last.confirmed - last.recovered - last.deaths;
          this.pieChartData[3]= last.deaths;
        }
      );
    }
  }

  getCountries(): void {
    this.covidService.getAll().subscribe(
      data => {
        this.countries = Object.keys(data);

      }
    );
  }

  clear(): void {
    this.pieChartData = [];
  }

}
