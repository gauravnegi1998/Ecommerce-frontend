import _ from "lodash";
import { AuthServices } from "../../services/AuthServices.service";
import { MiniCartService } from "../../services/mincart.service";
import { IAddToCart, ICartData } from "../module/commonInterfaces";
import { inject } from "@angular/core";

export class _cartAddFunctions {
    minCartApi = inject(MiniCartService);
    private Auth = inject(AuthServices);

    cartData: ICartData[] = [];


    constructor() {
        this.minCartApi.cartDetails$.subscribe((data) => {
            this.cartData = data;
        })
    }



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

    _quantityUpdate(cartId: string, action: string = "sub") {
        const FIND_PRODUCT: ICartData | undefined = _.find(this.cartData, { _id: cartId });
        let REMAIN_DATA = [];
        if (FIND_PRODUCT) {
            FIND_PRODUCT['quantity'] = action === "sub" ? (FIND_PRODUCT['quantity'] - 1 > 0 ? FIND_PRODUCT['quantity'] - 1 : 1) : FIND_PRODUCT['quantity'] + 1;
            REMAIN_DATA = [..._.reject(this.cartData, { _id: cartId }), FIND_PRODUCT];
            console.log(REMAIN_DATA, FIND_PRODUCT, 'REMAIN_DATA')
            this.minCartApi._updateQuantityCart(_.map(REMAIN_DATA, (r) => ({ productID: r.productId, quantity: r?.quantity })))
        }
    }
}
