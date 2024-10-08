import { Component, OnInit } from "@angular/core";
import { _cartAddFunctions } from "../../Common/cartCommonFunction";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from "lucide-angular";
import { Icons } from "../../Common/Icons";
import { InputModules } from "../../inputs/inputs.module";
import { Router } from "@angular/router";
import { PipesModules } from "../../pipes/pipes.module";

@Component({
    selector: "app-viewCart",
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule, InputModules, PipesModules],
    templateUrl: "./view-cart.component.html",
    styleUrl: "./view-cart.component.scss",
    providers: [
        { provide: LUCIDE_ICONS, useValue: new LucideIconProvider(Icons), multi: true }
    ]
})

export class ViewCartComponent extends _cartAddFunctions implements OnInit {

    constructor(private router: Router) {
        super()
    }

    get subTotalOfCart() {
        return this.minCartApi.totalCartAmount;
    }

    ngOnInit(): void {

    }

    _removeCartData(cartId: string) {
        console.log(cartId, 'isPasswordChange')
        this.minCartApi._removeSingleCart(cartId);
    }

    _redirectToCheckout() {
        this.router.navigateByUrl('/checkout');
    }

}