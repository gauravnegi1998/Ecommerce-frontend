import { NgModule } from "@angular/core";
import { ButtonComponent } from "./button/button.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MaterialUIModule } from "../MaterialModel/material-ui.module";
import { TextFieldComponent } from "./Textfield/Textfield.component";
import { DatePickerComponent } from "./datepickerInput/datepicker.component";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { CardComponent } from "./card/card.component";
import { NgxPaginationModule } from "ngx-pagination";
import { PaginationComponent } from "./paginationComp/paginationComp.component";
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from "lucide-angular";
import { Icons } from "../Common/Icons";

@NgModule({
    declarations: [
        ButtonComponent,
        TextFieldComponent,
        DatePickerComponent,
        CardComponent,
        PaginationComponent
    ],
    imports: [
        CommonModule,
        MaterialUIModule,
        RouterModule,
        FormsModule,
        NgbDatepickerModule,
        NgxPaginationModule,
        LucideAngularModule
    ],
    exports: [
        ButtonComponent,
        TextFieldComponent,
        DatePickerComponent,
        CardComponent,
        PaginationComponent
    ],
    providers: [
        { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(Icons) }
    ]
})

export class InputModules { };