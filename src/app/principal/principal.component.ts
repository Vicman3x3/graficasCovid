import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CovidService } from '../services/covid.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Confirmados' },
    { data: [], label: 'Recuperados' },
    { data: [], label: 'Activos' },
    { data: [], label: 'Defunciones' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'yellow',
      backgroundColor: 'rgba(255,240,30,0.3)',
    },

    {
      borderColor: 'green',
      backgroundColor: 'rgba(50,230,50,0.3)',
    },

    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,30,30,0.3)',
    },

    {
      borderColor: 'blue',
      backgroundColor: 'rgba(30,40,250,0.3)',
    }


  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  locale = 'es';

  countries: string[] = [];
  country: string = null;

  constructor(
    private localeService: BsLocaleService,
    private covidService: CovidService

    ) {
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries():void{
    this.covidService.getAll().subscribe(
      data => {
        this.countries = Object.keys(data);

      }
    );
  }

}
