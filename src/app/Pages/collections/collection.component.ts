import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { InputModules } from "../../inputs/inputs.module";
import { FormsModule } from "@angular/forms";
import { ProductsServices } from "../../../services/ProductsServices.service";
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet, Routes } from "@angular/router";
import { Subject } from "rxjs";

@Component({
    selector: "app-collections",
    standalone: true,
    imports: [CommonModule, InputModules, RouterModule, FormsModule, RouterOutlet],
    templateUrl: './collection.component.html',
    styleUrl: './collection.component.scss',
})

export class CollectionsComponent implements OnInit {

    catData: { _id: string, categoryId: number, categoryName: string }[] = [];
    productsDisplay: boolean = false;
    constructor(private router: Router, private ProductService: ProductsServices, private route: ActivatedRoute) { }


    ngOnInit(): void {
        this._getCategoriesData();
        this.ProductService.categoryData$.subscribe((response) => {
            this.catData = response ? response : [];
        })
        this.productsDisplay = (this.router?.url).includes('products');

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.productsDisplay = (event?.url).includes('products');
                console.log(this.productsDisplay, 'this.productsDisplay')
            }
        });
    }


    _getCategoriesData() {
        this.ProductService._getCategories({ page: 1, limit: 100 })
        // this.config.totalItems = this.categories.length;
    }


    _handleCategoryClick(id: string) {
        this.router.navigate(['/collections/products'], {
            queryParams: { catId: id }
        })
    }
}