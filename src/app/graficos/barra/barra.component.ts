import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { forkJoin, Observable, observable } from 'rxjs';
import { CovidService } from 'src/app/services/covid.service';


const MONTH = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];


@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Activos' },
    { data: [], label: 'Recuperados' }
  ];

  public barChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255, 30, 30, 0.93)'
    }, {
      // verde
      backgroundColor: 'rgba(50, 230, 50, 0.93)'
    }
  ];

  countries: string[] = [];
  country: string = null;

  lastDays: number [] = [];


  constructor(
    private covidService: CovidService
  ) { }

  ngOnInit(): void {
    this.getCountries();
    this.obtainLastDays();
  }



  loadData(event: any): void{
    if (this.country) {
      this.clear();
      const obs: Observable<any>[] = new Array();
      for (let i = 0; i < this.lastDays.length; i++) {
        const date  = new Date();
        date.setDate(this.lastDays[i]);
        date.setMonth(i);
        date.setHours(0,0,0,0);
        let obsAct: Observable<any> = new Observable();
        obsAct = this.covidService.twoDates(this.country, date, date);

        obs.push(obsAct);

      }
      forkJoin(obs).subscribe(
        data => {
          data.forEach((res,i) => {
            this.barChartData[0].data[i] = res[0].confirmed - res[0].recovered - res[0].deaths;
            this.barChartData[1].data[i] = res[0].recovered;
this.barChartLabels.push(MONTH[i]);
          } );
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

  obtainLastDays(): void{
    const month = new Date().getMonth();
    let date = new Date(new Date().getFullYear(), month +1,0);

    for (let i = 0; i < month; i++) {
      date = new Date(new Date().getFullYear(), i,0);
      this.lastDays.push(date.getDate());

    }

  }

  clear(): void {
    this.barChartData[0].data = [];
    this.barChartData[0].data = [];
    this.barChartLabels = [];
  }

}
