import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';

import { SpinnerService } from '../../services';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  @Input() showContainer = true;

  constructor(
    private service:SpinnerService) { }
  
  ngOnInit() {
    this.service._registerContainer(this);
  }

}
