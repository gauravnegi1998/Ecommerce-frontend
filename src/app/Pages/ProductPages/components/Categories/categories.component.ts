import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AbstractControlOptions, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { InputModules } from "../../../../inputs/inputs.module";
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from "lucide-angular";
import { Icons } from "../../../../Common/Icons";
import _, { debounce } from "lodash";
import { ProductsServices } from "../../../../../services/ProductsServices.service";
import { NgxPaginationModule, PaginationInstance } from "ngx-pagination";
import { Subject } from "rxjs";
import { debounceTime } from 'rxjs/operators';
import { PipesModules } from "../../../../pipes/pipes.module";

@Component({
    selector: 'app-product-category',
    templateUrl: './categories.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, CommonModule, InputModules, LucideAngularModule, PipesModules, NgxPaginationModule],
    styleUrl: './categories.component.scss',
    providers: [
        {
            provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(Icons)
        }
    ]
})

export class CategoriesComponent {

    categoryFormGroup!: UntypedFormGroup;
    private subject = new Subject<string>()

    config: PaginationInstance = {
        id: 'category_page',
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 8
    }

    constructor(private fb: UntypedFormBuilder, private productService: ProductsServices) {
        this.categoryFormGroup = this.fb.group({
            categoryId: new UntypedFormControl('', [Validators.required]),
            categoryName: new UntypedFormControl('', [Validators.required])
        }, {
            validator: this._customValidation('categoryId')
        } as AbstractControlOptions)

        this._getCategoriesData();

        this.subject.pipe(debounceTime(500)).subscribe((result) => {
            this._getCategoriesData();
        })
    }

    logs() {
        console.log(this.categories, '>>>>>>>>>>>>>>>>>>>>>>>>')
    }


    _getCategoriesData() {
        this.productService._getCategories({ page: this.config.currentPage, limit: this.config.itemsPerPage })
        this.config.totalItems = this.categories.length;
    }

    get categories() {
        return this.productService.categories?.length > 0 ? this.productService.categories : [];
    }

    _customValidation(fieldName: string) {
        return (formGroup: UntypedFormGroup) => {
            const FIELD_VALUE = formGroup.controls[fieldName];
            if (FIELD_VALUE.errors && !FIELD_VALUE.errors?.['onlyNumber']) {
                return;
            }
            if (_.isNaN(+FIELD_VALUE?.value)) {
                FIELD_VALUE.setErrors({ 'onlyNumber': true });
            } else {

                FIELD_VALUE.setErrors((FIELD_VALUE?.value?.length > 4) ? { 'onlyNumber': true } : null);
            }

        }
    }


    _fieldValues(name: string): UntypedFormControl {
        return this.categoryFormGroup?.get(name) as UntypedFormControl
    }

    _handleSubmit(data: any, myForm: FormGroupDirective) {
        const { status, value } = this.categoryFormGroup;
        console.log(this.categoryFormGroup, 'this.categoryFormGroup')
        if (status === "VALID") {
            this.productService._addCategory(value, (res) => {
                this.subject.next(value);
                setTimeout(() => {
                    myForm.resetForm();
                    this.categoryFormGroup.reset();
                }, 2000)
            });
        }
    }

    _handleDelete(id?: string) {
        if (id) {
            this.productService._deleteCategory(id);
            this.subject.next(id)
        }
    }

}