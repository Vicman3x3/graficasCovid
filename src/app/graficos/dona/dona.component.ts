import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { forkJoin } from 'rxjs';
import { CovidService } from 'src/app/services/covid.service';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {

  // doughnut
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
  };
  public doughnutChartLabels: Label[] = ['Confirmados', 'Recuperados', 'Activos', 'Defunciones'];
  public doughnutChartData: MultiDataSet = [
    [],
    []
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLegend = true;
  public doughnutChartPlugins = [];
  public doughnutChartColors: any = [
    {
      backgroundColor: [

        'rgba(255, 240, 30, 0.93)',
        'rgba(50, 230, 50, 0.93)',
        'rgba(255, 30, 30, 0.93)',
        'rgba(30, 40, 250, 0.93)'
      ]
    },     {
      backgroundColor: [

        'rgba(255, 240, 30, 0.93)',
        'rgba(50, 230, 50, 0.93)',
        'rgba(255, 30, 30, 0.93)',
        'rgba(30, 40, 250, 0.93)'
      ]
    }
  ];
  countries: string[] = [];
  country1: string = null;
  country2: string = null;

  constructor(
    private covidService: CovidService
  ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  loadData(event: any): void {
    if (this.country1 && this.country2) {
      this.clear();
forkJoin([
  this.covidService.fromCountry(this.country1),
  this.covidService.fromCountry(this.country2)
]).subscribe(
  ([data1, data2 ]) => {
    const last1=data1.pop() , last2=data2.pop();
        this.doughnutChartData[0][0] = last1.confirmed;
        this.doughnutChartData[0][1] = last1.recovered;
        this.doughnutChartData[0][2] = last1.confirmed - last1.recovered - last1.deaths;
        this.doughnutChartData[0][3] = last1.deaths;

        // data 2

        this.doughnutChartData[1][0] = last2.confirmed;
        this.doughnutChartData[1][1] = last2.recovered;
        this.doughnutChartData[1][2] = last2.confirmed - last2.recovered - last2.deaths;
        this.doughnutChartData[1][3] = last2.deaths;
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
    this.doughnutChartData = [];
    this.doughnutChartData.push([]);
    this.doughnutChartData.push([]);
  }

}
