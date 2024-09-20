import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { devEnvironment } from "../environments/dev.environment";
import _ from 'lodash';
import SecureLocalStorage from "./secureStorage.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    private apiRootUrl: string = devEnvironment.apiUrl;

    constructor(private Https: HttpClient, private router: Router, private localStore: SecureLocalStorage, private toster: ToastrService) { }

    _authenticationError(err: any, callback: () => void) {
        if (err?.error?.status === "error" && (err?.error?.message === "invalid token" || err?.error?.message === "unauthorized user")) {
            this.localStore.removeData('Token')
            this.router.navigateByUrl('/login');
            return;
        }
        if (err?.error?.status === "error" && err?.error?.message === "Token not provided") {
            this.toster.error('Please login first', 'Unauthorized')
            return;
        }

        callback();
    }


    private createHeader(rest: boolean = false): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': "application/json",
            'Accept': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
            'Pragma': 'no-cache',
            'Expires': '0'
        })
        if (rest) {
            headers = headers.set('authorization', (this.localStore?.getItem('Token')) ? `Bearer ${this.localStore?.getItem('Token')}` : '');
        }
        return headers;
    }

    public get(endPoint: string, header: boolean = false): Promise<any> {
        const headers = this.createHeader(header);
        const _getRequest = this.Https.get(this.apiRootUrl + endPoint, { headers });

        return new Promise<any>((resolve, reject) => {
            _getRequest.subscribe({
                next: (data: any) => resolve(data),
                error: (err: any) => this._authenticationError(err, () => reject(err))
            })
        })
    }


    public post(endPoint: string, data: any, header: boolean = false): Promise<any> {
        let headers = this.createHeader(header);
        const _postRequest = this.Https.post(this.apiRootUrl + endPoint, data, { headers });
        return new Promise<any>((resolve, reject) => {
            _postRequest.subscribe({
                next: (data: any) => resolve(data),
                error: (err: any) => this._authenticationError(err, () => reject(err))
            })
        })
    }

    public put(endPoint: string, data: any, header: boolean = false): Promise<any> {
        let headers = this.createHeader(header)
        const _PUT_REQUEST = this.Https.put(this.apiRootUrl + endPoint, data, { headers });
        return new Promise<any>((resolve, reject) => {
            _PUT_REQUEST.subscribe({
                next: (data) => resolve(data),
                error: err => this._authenticationError(err, () => reject(err))
            })
        })
    }

    public delete(url: string, header: boolean = false): Promise<any> {
        let headers = this.createHeader(header);
        const DELETE_REQUEST = this.Https.delete(this.apiRootUrl + url, { headers });
        return new Promise<any>((resolve, reject) => {
            DELETE_REQUEST.subscribe({
                next: (response) => resolve(response),
                error: (error) => this._authenticationError(error, () => reject(error))
            })
        })
    }
}