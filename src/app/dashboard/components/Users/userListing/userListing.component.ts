import { Component, OnInit, TemplateRef, ViewChild, inject } from "@angular/core";
import { InputModules } from "../../../../inputs/inputs.module";
import { CommonModule } from "@angular/common";
import { ApiService } from "../../../../../services/ApiHelper.service";
import { ICustomerData } from "../../../../module/commonInterfaces";
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from "lucide-angular";
import { Icons } from "../../../../Common/Icons";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import _ from "lodash";
import { MaterialUIModule } from "../../../../MaterialModel/material-ui.module";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { NgxPaginationModule, PaginationInstance } from "ngx-pagination";
import { AuthServices } from "../../../../../services/AuthServices.service";
import { DetailPageComponent } from "../detail-page/detail-page.component";
import { UpdateProfileComponent } from "../../../../Pages/Auth/update-profile/update-profile.component";
import { CustomerService } from "../../../../../services/CustomerService.service";
import CountryStateService from "../../../../../services/countryState.service";


@Component({
    selector: "app-userDetail",
    standalone: true,
    imports: [
        InputModules, ReactiveFormsModule, CommonModule, LucideAngularModule, FormsModule, MaterialUIModule, NgxPaginationModule, DetailPageComponent, UpdateProfileComponent],
    templateUrl: './userListing.component.html',
    styleUrl: './userListing.component.scss',
    providers: [
        { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(Icons) }
    ]
})

export class UserListingComponent implements OnInit {
    formGroupData: UntypedFormGroup;
    errors!: { countryError: string; stateError: string; };
    constructor(
        private customerApi: CustomerService,
        private countryApi: CountryStateService,
        private auth: AuthServices,
        private api: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {

        this.formGroupData = this.fb.group({
            firstName: new UntypedFormControl('', Validators.required),
            lastName: new UntypedFormControl('', Validators.required),
            email: new UntypedFormControl('', [Validators.required, Validators.email]),
            address: new UntypedFormControl('', Validators.required),
            address2: new UntypedFormControl(''),
            city: new UntypedFormControl('', Validators.required),
            zipCode: new UntypedFormControl('', Validators.required),
            phoneNumber: new UntypedFormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
            birthday: new UntypedFormControl('', Validators.required),
            role: new UntypedFormControl('', Validators.required)
        })

    };

    private searchSubject = new Subject<string>();
    private readonly debounceTimeMs = 500; // Set the debounce time (in milliseconds)
    readonly dialog = inject(MatDialog);

    @ViewChild("myTemplate") template!: TemplateRef<any>;
    @ViewChild("detailPage") detailPage!: TemplateRef<any>;
    @ViewChild("editProfile") editProfile!: TemplateRef<any>;

    usersData: ICustomerData[] = [];
    searchText: string = "";
    displayDropdown: boolean = false;
    filterBy: { name: string, query: string } = { name: 'Search By', query: 'all' };
    selectedUser!: ICustomerData;
    selectedAction: string = "";
    countryWithStates: {
        selected_country: string, selected_state: string,
        country: { name: string, code: string }[], state: []
    } | any = { selected_country: "", selected_state: "" };

    public config: PaginationInstance = {
        id: 'listing_section',
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 6
    };

    theadData: string[] = ['ID', 'First Name', 'Last Name', 'E-mail', 'Phone', 'Address', "City", "Country", "State", "Zip Code", "Birthday", "Role"];

    ngOnInit(): void {

        this._getCustomerData();
        this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {
            this.config.currentPage = 1;
            this._getCustomerData(searchValue, 1);
        });

    }

    // get All user's Data
    _getCustomerData(searchValue?: string | null, page?: number) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        this.customerApi._getCustomerData({ searchValue: (searchValue || this.searchText), page: (page || this.config.currentPage) }, (response) => {
            if (response?.status === 'ok') {
                this.usersData = response?.data;
                this.config = { ...this.config, totalItems: response?.totalCount };
            }
        })

    }

    // search function
    _handelSearch(data: string) {
        this.searchSubject.next(data);
    }


    // update User
    _updateCustomerData(user: ICustomerData) {

        const { status, value } = this.formGroupData;
        if (status === "VALID" && this.countryWithStates.selected_country && this.countryWithStates.selected_state) {
            this.customerApi._updateCustomers({
                id: user?._id, data: {
                    ...value,
                    country: this.countryWithStates.selected_country,
                    state: this.countryWithStates.selected_state,
                }
            }, (res) => {
                this._getCustomerData();
                this.selectedAction = "";
            });
        } else {
            this.errors = {
                countryError: !this.countryWithStates.selected_country ? 'Please select your country' : "",
                stateError: !this.countryWithStates.selected_state ? 'Please select your state' : ""
            }

        }
    }

    // delete User
    _handelDeleteUser() {
        this.customerApi._deleteCustomers(this.selectedUser?._id, () => {
            this.dialog.closeAll();
        })
    }

    // pagination changes
    _handlePageChange(data: any) {
        this.config = { ...this.config, currentPage: data };
        this._getCustomerData(this.searchText, data)
    }

    get _userDataKeys(): string[] {
        return ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'city', 'country', 'state', 'zipCode', 'birthday', 'role'];
    }

    _userValue(data: any, item: string) { return (data[item] ? data[item] : ''); }

    // country state 
    _handleCountryState(event: string, user: ICustomerData, item: string) {
        console.log(event, item, "dddddddd > > > > > > > ");
        if (item === "state") {
            this.countryWithStates = { ...this.countryWithStates, selected_state: event };
        } else {
            this.countryWithStates = {
                ...this.countryWithStates,
                selected_country: event,
                selected_state: "",
                state: this.countryApi._getStatesByCountry(event)
            }
        }
    }


    // dialog open && popup handler function

    _handleRedirect(action: string, user: ICustomerData | any) {
        // let TEMPLATE!: TemplateRef<any>;
        const TEMPLATE: any = {
            "delete": this.template,
            "detail": this.detailPage,
            "edit": this.editProfile
        }
        this.selectedUser = user;
        this.selectedAction = action;
        if (action !== "edit") {
            const WIDTH: any = { "delete": "550px", "detail": "750px", "edit": "800px" };
            const dialogRef = this.dialog.open(TEMPLATE[action], {
                width: WIDTH?.[action] ? WIDTH[action] : "550px",
                height: "auto",
                panelClass: `${action}-modal`,
                data: {
                    selectedUser: this.selectedUser
                }
            });

            dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
                this._getCustomerData()
                if (result !== undefined) {
                    alert('hello');
                }
            });
        } else {
            console.log(user, 'useruseruseruseruseruseruseruseruseruseruseruser')
            this.countryWithStates = {
                selected_country: user.country,
                selected_state: user.state,
                country: _.map(this.countryApi._getAllCountry(), (data) => ({ name: data?.name, code: data?.shortName })),
                state: this.countryApi._getStatesByCountry(user.country)
            }
            _.map(this._userDataKeys, (r) => {
                this.formGroupData.get(r)?.setValue(user?.[r] as any)
            })
        }
    }
}