import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  covURL = 'https://pomber.github.io/covid19/timeseries.json';

  constructor( private httpClient: HttpClient ) { }

  public getAll(): Observable<any>{
    return this.httpClient.get<any>(this.covURL);
  }
}
