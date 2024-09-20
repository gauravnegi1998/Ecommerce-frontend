import { CommonModule } from "@angular/common";
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from "lucide-angular";
import { Icons } from "../../Common/Icons";
import { ICartData } from "../../module/commonInterfaces";
import { _cartAddFunctions } from "../../Common/cartCommonFunction";
import { MiniCartService } from "../../../services/mincart.service";
import { PipesModules } from "../../pipes/pipes.module";
import { AuthServices } from "../../../services/AuthServices.service";
import { InputModules } from "../../inputs/inputs.module";
import _ from "lodash";

@Component({
    selector: "app-miniCart",
    standalone: true,
    imports: [InputModules, CommonModule, LucideAngularModule, PipesModules],
    templateUrl: "./minicart.component.html",
    styleUrl: './minicart.component.scss',
    providers: [
        { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(Icons) }
    ]
})

export class MiniCartComponent extends _cartAddFunctions implements OnInit, OnChanges {

    cartData: ICartData[] = [];
    open: boolean = false;
    constructor() {
        super();

    }

    get subTotalOfCart() {
        return this.minCartApi.totalCartAmount;
    }
    ngOnInit(): void {

        this.minCartApi.cartDetails$.subscribe((data) => {
            this.cartData = data;
        })
        this.minCartApi.openMiniCart$.subscribe((value) => {
            this.open = value;
        })
    }

    _removeCartData(cartId: string) {
        console.log(cartId, 'isPasswordChange')
        this.minCartApi._removeSingleCart(cartId);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes, this.open, '>>>>>>>>>>>>>>>>>>>>>>>>>>')

    }

    _checkoutClick(value: string) {
        console.log(value, '>>>>>>>>>>>>>>>>>>>>')
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

    // ngOnDestroy(): void {
    //     this.open$.unsubscribe()
    // }

}