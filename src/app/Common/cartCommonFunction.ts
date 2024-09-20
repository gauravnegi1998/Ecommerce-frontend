import { AuthServices } from "../../services/AuthServices.service";
import { MiniCartService } from "../../services/mincart.service";
import { IAddToCart } from "../module/commonInterfaces";
import { inject } from "@angular/core";

export class _cartAddFunctions {
    minCartApi = inject(MiniCartService);
    private Auth = inject(AuthServices);

    constructor() { }



    _openMiniCart(status: boolean) {
        this.minCartApi.openMiniCart$.next(status)
    }

    _handleAddToCart(products: IAddToCart[]) {

        if (products.length > 0) {
            console.log(products, 'ddddddddddddddddddddddddddddd')
            this.minCartApi._addToCartApi(products, () => {
                this.minCartApi.openMiniCart$.next(true)
            });

        };
    }
}
