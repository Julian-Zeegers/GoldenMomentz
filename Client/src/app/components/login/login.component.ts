import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastsManager  } from 'ng2-toastr/ng2-toastr';

import { AuthService, SpinnerService } from 'app/core';
import { LoginApiModel, LoginResponseModel } from 'app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  redirectUrl = '';
  loginUser = new LoginApiModel();
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastsManager,
    private spinner: SpinnerService) { }

  ngOnInit() {
    // For spinner debugging
    //this.spinner.show();
  }

  submit() {
    this.spinner.show();
    this.auth.login(this.loginUser)
      .subscribe((data) => {
        try {
          const loginResponse = new LoginResponseModel(data);
          localStorage.setItem('id_token', loginResponse.accessToken);
          localStorage.setItem('refreshToken', loginResponse.refreshToken);

          this.auth.startTokenRefreshTimer(loginResponse.expiresIn);
          if (this.redirectUrl !== '') {
            this.router.navigate([decodeURI(this.redirectUrl)]);
          } else {
            this.router.navigate(['dashboard']);
          }
        } catch (error) {
          this.toastr.error(error, 'An error occurred');
          this.router.navigate(['']);
        }
      }, error => {
        this.spinner.hide();
        this.toastr.error('Either your username or password were incorrect, please try again', 'Sign-in unsuccessful');
      });
  }
}