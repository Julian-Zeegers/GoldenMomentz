import { Component, OnInit } from '@angular/core';

import { SpinnerService } from 'app/core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  data: any;

  constructor(
    private spinner: SpinnerService ) { }

  ngOnInit() {
    this.spinner.hide();
  }

}
