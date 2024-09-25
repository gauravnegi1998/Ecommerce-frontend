import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { InputModules } from "../../../../inputs/inputs.module";
import { MaterialUIModule } from "../../../../MaterialModel/material-ui.module";
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from "lucide-angular";
import { Icons } from "../../../../Common/Icons";
import { PaginationComponent } from "../../../../inputs/paginationComp/paginationComp.component";
import { NgxPaginationModule, PaginationInstance } from "ngx-pagination";
import { ProductsServices } from "../../../../../services/ProductsServices.service";
import { IProductData } from "../../../../module/commonInterfaces";
import { FormBuilder, FormsModule, UntypedFormGroup } from "@angular/forms";
import { debounceTime, Subject } from "rxjs";

@Component({
    selector: "app-productListing",
    standalone: true,
    imports: [CommonModule, FormsModule, InputModules, MaterialUIModule, LucideAngularModule, NgxPaginationModule],
    templateUrl: "./productListing.component.html",
    styleUrl: "./productListing.component.scss",
    providers: [
        { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(Icons) }
    ]
})

export class ProductListingComponent implements OnInit {

    formGroupData!: UntypedFormGroup;

    constructor(private productApi: ProductsServices, private fb: FormBuilder) {
        // this.formGroupData = this.fb.group({})
    }
    searchText: string = "";

    config: PaginationInstance = {
        totalItems: 10,
        itemsPerPage: 10,
        currentPage: 1,
        id: "productListing"
    }
    selectedProduct!: IProductData;
    theadData: string[] = ['ID', 'Code', 'Name', 'Hide From Web', "AvailableStock", "Actions"];
    allProducts: IProductData[] = [];

    subject = new Subject<any>()

    ngOnInit(): void {
        this._getAllProduct();

        this.subject.pipe(debounceTime(500)).subscribe((data) => {
            this._getAllProduct(data)
        })
    }

    _getAllProduct(search: string = "", page: number = 1, limit: number = 10,) {
        this.productApi._getAllProduct({
            page: page || this.config.currentPage,
            limit: limit || this.config.itemsPerPage,
            search: search,
        }, (response) => {
            this.allProducts = response?.data?.product_data;
            this.config.totalItems = response?.data?.totalCount;
            this.config.currentPage = response?.data?.page;
        })
    }

    // pagination function
    _handlePageChange(page: number) {
        this._getAllProduct(this.searchText, page);
    }

    // 
    _handleRedirect(action: string, productList: IProductData) {
        this.selectedProduct = productList;
        if (action === "delete") {

        }
    }

    // delete product
    _handelDeleteUser() {

    }

    // search functionality
    _handelSearch(data: Event) {
        this.searchText = String(data);
        console.log('>>>>>>>>>>>>>>>>>>>', data);
        this.subject.next(data);
    }

    _userValue(productList: any, item: string) {
        return String(productList[item]) ? String(productList[item]) : "";
    }

    // getter and setter
    get _userDataKeys() {
        return ['itemId', 'itemCode', 'shortName', 'hideFromWeb', 'availableStock'];
    }

}