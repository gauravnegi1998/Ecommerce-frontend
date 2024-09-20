import { Injectable } from "@angular/core";
import { AuthServices } from "./AuthServices.service";
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import _ from "lodash";

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService {

    constructor(private authService: AuthServices, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {


        if (!this.authService._isUserLogin()) {
            if (!_.includes(['/login', '/signup'], state?.url)) {
                alert('You are not allowed to view this page. Please login to access it');
                this.router.navigateByUrl("/login");
                return false;
            }
        } else {
            if (_.includes(['/login', '/signup'], state?.url)) {
                this.router.navigateByUrl("/products");
                return false;
            } else if (route?.data?.['role']) {
                const USER_ROLE = this.authService._getUserData()?.role;
                console.log(USER_ROLE, route?.data?.['role'])
                if (USER_ROLE === route?.data?.['role']) {
                    return true;
                } else {
                    this.router.navigateByUrl("/products");
                }
            }

        }

        return true;
    }
}

