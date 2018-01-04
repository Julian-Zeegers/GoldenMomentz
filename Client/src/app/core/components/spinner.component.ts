import { Component, OnInit,Input } from '@angular/core';

import { SpinnerService } from '../services';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
    @Input() show = false;

    constructor(
        private service:SpinnerService) { }

    ngOnInit(): void {
        this.service._registerSpinner(this);
    }
}