import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService, SpinnerService } from '../../../services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.auth.loggedIn();
  }

  logout() {
    this.auth.logout();
  }

  showSpinner() {
    //this.spinnerService.show();
  }
}
