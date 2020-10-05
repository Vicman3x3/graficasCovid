import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

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
    public doughnutChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
    public doughnutChartData: SingleDataSet = [300, 500, 100];
    public doughnutChartType: ChartType = 'doughnut';
    public doughnutChartLegend = true;
    public doughnutChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
  }

}
