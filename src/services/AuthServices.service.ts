import { Injectable } from "@angular/core";
import SecureLocalStorage from "./secureStorage.service";
import { ApiService } from "./ApiHelper.service";
import _ from "lodash";
import { Router } from "@angular/router";
import { ICustomerData } from "../app/module/commonInterfaces";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class AuthServices {

    token!: string;
    observable$ = new BehaviorSubject<ICustomerData | null>(null);
    // userData = this.observable$.asObservable();

    constructor(private loginStore: SecureLocalStorage, private router: Router, private api: ApiService, private localStore: SecureLocalStorage) { }

    clearTimeOUt: any = null;


    // get login userData


    // login Api

    loginUser(value: { email: string, password: string }) {
        this.api.post('/login', value).then((response) => {
            if (_.eq(response?.status, 'ok')) {
                const { token, userData, expireDate } = response;
                this._setToken(token);
                this._setUserData(userData);
                this._setTokenExpireData(expireDate);
                this._autoLogout(expireDate * 1000)
                window.location.assign('/');
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    _handleLogout() {
        this.localStore.removeData('userData');
        this.localStore.removeData('expireDate');
        this.localStore.removeData('Token');
        this.localStore.removeData('expireDate');
        clearTimeout(this.clearTimeOUt);
        this.observable$.next(null);

        this.router.navigateByUrl('/')
    }

    // login user details

    _getToken() {
        if (this._getTokenExpireData() < new Date().getTime()) {
            return null;
        }
        return this.loginStore.getItem('Token');
    }

    _setToken(token: string) {
        this.localStore.setItem('Token', token)
    }

    _autoLogin() {
        let userData: ICustomerData = this.localStore?.getItem('userData') ? JSON.parse(this.localStore?.getItem('userData')) : null;
        const token = this._getToken();
        if (!userData) {
            return;
        }
        if (token) {
            this.observable$.next(userData);
        }

        const expireTime = this._getTokenExpireData() - new Date().getTime();
        this._autoLogout(expireTime)
    }

    _autoLogout(timestamp: number) {
        console.log(timestamp, 'timestamp')
        this.clearTimeOUt = setTimeout(() => {
            this._handleLogout();
        }, timestamp)
    }

    _getUserData() {
        return this.localStore.getItem('userData') ? JSON.parse(this.localStore.getItem('userData')) : null;
    }

    _setUserData(newQuote: ICustomerData | null) {
        this.localStore.setItem('userData', JSON.stringify(newQuote));
        this.observable$.next(newQuote);
    }

    // Authentication

    _isUserLogin() {
        return !!(this._getToken())
    }

    //  expire time selection
    _getTokenExpireData() {
        let ExpireDate = this.localStore.getItem('expireDate');
        return Number(ExpireDate);
    }

    _setTokenExpireData(time: number) {
        // console.log()
        this.localStore.setItem('expireDate', String(new Date().getTime() + (time * 1000)))
    }




}