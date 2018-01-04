import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { 
    ToastsManager  
} from 'ng2-toastr/ng2-toastr';

import { 
    AuthService 
} from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router,
        private toastr: ToastsManager) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const url = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.auth.loggedIn()) {
            return true;
        }

        this.toastr.error('Not logged in', 'Please log in to use the application');
        this.router.navigate(['/login']);

        return false;
    }

}