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
import { Router } from "@angular/router";

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

    open: boolean = false;
    constructor(private router: Router) {
        super();

    }

    get subTotalOfCart() {
        return this.minCartApi.totalCartAmount;
    }
    ngOnInit(): void {
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
        this.router.navigateByUrl(`/${value}`);
        this.open = false;
    }



    // ngOnDestroy(): void {
    //     this.open$.unsubscribe()
    // }

}