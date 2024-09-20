import { Routes } from "@angular/router";
import { CollectionsComponent } from "./collection.component";
import { AllProductPageComponent } from "../ProductPages/components/AllProductPage/AllProductPage.component";
import { CategoriesComponent } from "../ProductPages/components/Categories/categories.component";

export const CollectionsComponentRoutes: Routes = [{
    path: "",
    component: CollectionsComponent,
    children: [
        // {
        //     path: 'products', component: AllProductPageComponent, pathMatch: 'full'
        // },
        { path: 'products', component: AllProductPageComponent, pathMatch: 'full' },
    ]
}];


