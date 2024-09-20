import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroupDirective, FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { InputModules } from "../../../../inputs/inputs.module";
import { MaterialUIModule } from "../../../../MaterialModel/material-ui.module";
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts, NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { ProductsServices } from "../../../../../services/ProductsServices.service";
import _ from "lodash";
import { PipesModules } from "../../../../pipes/pipes.module";

@Component({
    selector: "app-addAndUpdateProduct",
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, InputModules, MaterialUIModule, NgxBootstrapMultiselectModule, PipesModules],
    templateUrl: './ProductAddAndUpdate.component.html',
    styleUrl: './ProductAddAndUpdate.component.scss'
})

export class ProductAddAndUpdateComponent implements OnInit {
    @Output() _handleSubmit = new EventEmitter<any>();

    ProductFormGroup: UntypedFormGroup | any;
    myOptions: IMultiSelectOption[] = [];
    // Settings configuration
    mySettings: IMultiSelectSettings = {
        containerClasses: 'productCategory_select',
        dynamicTitleMaxItems: 4,
        displayAllSelectedText: true,
    };

    myTexts: IMultiSelectTexts = {
        defaultTitle: 'Please select a web category',
    };

    constructor(private rootFormGroup: FormGroupDirective, private ProductService: ProductsServices) { }

    ngOnInit(): void {
        this.ProductFormGroup = this.rootFormGroup.control as UntypedFormGroup;
        console.log(this.ProductFormGroup, 'ProductFormGroup')
        this._getCategoryApi()
    }


    formGroupData(name: string): UntypedFormControl {
        return this.ProductFormGroup?.get(name) as UntypedFormControl
    }


    formPriceGroupData(name: string): UntypedFormControl {
        return this.ProductFormGroup.controls?.price?.get(name) as UntypedFormControl
    }

    //function section

    _handleOnSubmit(data: FormGroupDirective) {
        if (this.ProductFormGroup.status === "INVALID") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            this._handleSubmit.emit(data);
        }
    }

    log() {
        console.log(this.formGroupData('itemId').errors, 'this.ProductFormGroup')
    }

    get categories() {
        return this.ProductService.categories?.length > 0 ? this.ProductService.categories : [];
    }

    _getCategoryApi() {
        this.ProductService._getCategories({ limit: 100 }, (data: any) => {
            this.myOptions = [...this.myOptions, ..._.map(data, (r) => ({ id: r?.categoryId, name: r?.categoryName }))]
        });
    }

};