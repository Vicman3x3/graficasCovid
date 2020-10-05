import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  locale = 'es';

  constructor(private localeService: BsLocaleService) {
    this.localeService.use(this.locale);
   }

  ngOnInit(): void {
  }

}
