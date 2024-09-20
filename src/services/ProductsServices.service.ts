import { Injectable } from "@angular/core";
import { ApiService } from "./ApiHelper.service";
import { _asynchronousFunction } from "../app/Common/Methods";
import { IPostReviewData } from "../app/module/commonInterfaces";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProductsServices extends _asynchronousFunction {

    categories: { _id: string, categoryId: number, categoryName: string }[] = [];
    categoryData$ = new BehaviorSubject<{ _id: string, categoryId: number, categoryName: string }[]>([])
    successfulMsg: string = "";
    errorMsg: string = "";
    static CategoryUrl: string = "/items/web-categories";
    static ProductUrl: string = "/items"

    constructor(private api: ApiService) {
        super();
    }

    //category Api Section

    _addCategory(data: { categoryId: number, categoryName: string }, callback: (data?: any) => void = () => console.log('callback')) {

        this._callTheAPi(this.api.post(ProductsServices.CategoryUrl, data), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                if (callback) callback(success);
            }
        });
    }

    _getCategories(data: { page?: number, limit: number }, callback?: (data: any) => void) {
        const { page, limit } = data;
        this.api.get(`${ProductsServices.CategoryUrl}?page=${page || 1}&limit=${limit || 6}`)
            .then((result) => {
                if (result.status === 'ok') {
                    this.categories = result?.data;
                    this.categoryData$.next(result?.data);
                    if (callback) callback(result?.data)
                } else {
                    this.errorMsg = result?.message
                }
            }).catch((err) => {
            })
    }

    _deleteCategory(id: string | null, callback?: (data: any) => void) {

        this._callTheAPi(this.api.delete(`${ProductsServices.CategoryUrl}/${id}`), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                if (callback) callback(success);
            }
        })
    }


    // ******************************* Product api's

    _addProduct(data: any, callback?: (data: any) => void) {
        this._callTheAPi(this.api.post(`${ProductsServices.ProductUrl}`, data, true), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                if (callback) callback(success);
            }
        })
    }

    _getAllProduct(data: { catId?: string, page: number, limit: number }, callback?: (data: any) => void) {
        const { page, limit } = data;
        let URL = `${ProductsServices.ProductUrl}?page=${page || 1}&limit=${limit || 8}`;
        URL = data?.catId ? URL + `&catId=${data?.catId}` : URL;
        this._callTheAPi(this.api.get(URL), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                if (callback) callback(success);
            }
        })
    }


    _getSingleProduct(ID: string, callback?: (data: any) => void) {
        this._callTheAPi(this.api.get(`${ProductsServices.ProductUrl}/${ID}?timeStamp=${new Date().getTime()}`), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                if (callback) callback(success);
            }
        })
    }

    // ******************************* review api's **************************************

    _postYourReview(data: { id: string, data: IPostReviewData }, callback?: (data: any) => void) {
        this._callTheAPi(this.api.post(`${ProductsServices.ProductUrl}/${data?.data?.productId}/review`, data?.data, true), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                if (callback) callback(success);
            }
        })
    }

    _updateYourReview(data: { id: string, data: IPostReviewData }, callback?: (data: any) => void) {
        this._callTheAPi(this.api.put(`${ProductsServices.ProductUrl}/${data?.data?.productId}/review`, data, true), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                if (callback) callback(success);
            }
        })
    }

    _deleteYourReview(id: string, productId: string, callback?: (data: any) => void) {
        this._callTheAPi(this.api.delete(`${ProductsServices.ProductUrl}/${productId}/review/${id}`, true), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                if (callback) callback(success);
            }
        })
    }

}