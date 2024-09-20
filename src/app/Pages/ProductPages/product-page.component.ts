import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-products-page',
    standalone: true,
    imports: [RouterOutlet, RouterModule, RouterLink, CommonModule],
    templateUrl: './product-page.component.html',
    styles: [
        `.productsPages {
                margin-top: 50px;
        }
        `
    ]
})

export class ProductPageComponent { }