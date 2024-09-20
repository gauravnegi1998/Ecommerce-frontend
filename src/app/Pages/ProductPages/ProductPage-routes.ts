import { Routes } from "@angular/router";
import { CategoriesComponent } from "./components/Categories/categories.component";
import { ProductPageComponent } from "./product-page.component";
import { AddProductComponent } from "./components/AddProduct/addProduct.component";
import { AllProductPageComponent } from "./components/AllProductPage/AllProductPage.component";
import { AuthGuardService } from "../../../services/AuthGuard.service";
import { SingleProductPageComponent } from "./components/single-product-page/single-product-page.component";

export const ProductPagesRoutes: Routes = [
    {
        path: '',
        component: ProductPageComponent, // do not define a component here, instead just define child routes
        children: [
            {
                path: 'add-product', component: AddProductComponent, pathMatch: 'full', canActivate: [AuthGuardService]
            },
            { path: 'categories', component: CategoriesComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
            { path: '', component: AllProductPageComponent, pathMatch: 'full' },
            { path: ':id', component: SingleProductPageComponent, pathMatch: 'full' }
        ]
    }
];