import { inject, Injectable } from "@angular/core";
import { IAddToCart, ICartData } from "../app/module/commonInterfaces";
import { _asynchronousFunction } from "../app/Common/Methods";
import { ApiService } from "./ApiHelper.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class MiniCartService extends _asynchronousFunction {

    private api = inject(ApiService);
    static url: string = '/cart'
    private cartId: string = "";

    cartDetails$: BehaviorSubject<ICartData[] | []> = new BehaviorSubject<ICartData[] | []>([]);
    openMiniCart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    totalCartAmount: string = "";

    constructor() {
        super()
    }

    _getMiniCartDetail() {
        this._callTheAPi(this.api.get(MiniCartService.url + `?cartUpdateTime=${new Date().getTime()}`, true), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                if (success?.status === "ok") {
                    this.cartId = success?.data?._id;
                    this.totalCartAmount = String(success?.data?.totalAmount);
                    this.cartDetails$.next(success?.data?.cart_products);
                }
            }
        });
    }

    _addToCartApi(data: IAddToCart[], callback?: (data: any) => void) {
        this._callTheAPi(this.api.post(MiniCartService.url, { products: data }, true), (success, error) => {
            if (error) {
                // write a custom message
            } else {
                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                this._getMiniCartDetail();
                if (callback) callback(success);

            }
        });
    }

    _removeSingleCart(cartId: string) {
        this._callTheAPi(this.api.delete(`${MiniCartService.url}/${cartId}`, true), (success, error) => {
            console.log(error, 'ddddddddddddddddddddddddd')
            if (error) {
                // write a custom message
            } else {
                this._getMiniCartDetail();
            }
        });
    }

    _updateQuantityCart(data: IAddToCart[]) {
        this._callTheAPi(this.api.put(`${MiniCartService.url}`, { products: data }, true), (success, error) => {
            console.log(error, 'ddddddddddddddddddddddddd')
            if (error) {
                // write a custom message
            } else {
                this._getMiniCartDetail();
            }
        });
    }

}

