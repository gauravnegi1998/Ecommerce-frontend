import { Injectable } from "@angular/core";
import { _asynchronousFunction } from "../app/Common/Methods";
import { ApiService } from "./ApiHelper.service";
import { ICustomerData } from "../app/module/commonInterfaces";

@Injectable({
    providedIn: "root"
})

export class CustomerService extends _asynchronousFunction {

    static customerUrl = '/api/customers'

    constructor(private api: ApiService) {
        super();
    }

    _getCustomerData(data: { searchValue?: string | null, page?: number }, callback?: (data: any) => void) {
        try {
            let URL = `${CustomerService.customerUrl}/?timeStamp=${new Date().getTime()}&limit=10&page=${data?.page}`;

            if (data?.searchValue) {
                URL = `${URL}&search=${data?.searchValue}`
            }
            console.log('url > > > > > >  > >', URL);
            this._callTheAPi(this.api.get(URL, true), (success, error) => {
                if (error) {
                    // write a custom message
                } else {
                    if (callback) callback(success);
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    _getSingleUser(ID: string, callback?: (data: any) => void) {
        this._callTheAPi(this.api.get(`${CustomerService.customerUrl}/${ID}?timeStamp=${new Date().getTime()}`), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                if (callback) callback(success);
            }
        })
    }

    _addCustomers(data: { id: string, data: ICustomerData }, callback?: (data: any) => void) {
        this._callTheAPi(this.api.post(`${CustomerService.customerUrl}/${data?.data?._id}/review`, data?.data, true), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                if (callback) callback(success);
            }
        })
    }

    _updateCustomers(data: { id: string, data: ICustomerData }, callback?: (data: any) => void) {
        this._callTheAPi(this.api.put(`${CustomerService.customerUrl}/${data?.id}`, data?.data, true), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                if (callback) callback(success);
            }
        })
    }

    _updateProfileImage(data: { formData: any, id: string | undefined }, callback?: (data: any) => void) {
        this._callTheAPi(this.api.put(`${CustomerService.customerUrl}/${data?.id}/update-profile`, data?.formData, true), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                if (callback) callback(success);
            }
        })
    }

    _deleteCustomers(id: string, callback?: (data: any) => void) {
        this._callTheAPi(this.api.delete(`${CustomerService.customerUrl}/${id}`, true), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                if (callback) callback(success);
            }
        })
    }

}