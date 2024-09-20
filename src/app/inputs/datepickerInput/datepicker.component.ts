import { Component, Injectable, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
    readonly DELIMITER = '-';

    fromModel(value: string | null): NgbDateStruct | null {
        if (value) {
            const date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10),
            };
        }
        return null;
    }

    toModel(date: NgbDateStruct | null): string | null {
        return date ? String(String(date.day)?.length === 1 ? ('0' + date.day) : String(date?.day)) + this.DELIMITER + String(String(date.month)?.length === 1 ? "0" + date?.month : String(date?.month)) + this.DELIMITER + date.year : null;
    }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
    readonly DELIMITER = '/';

    parse(value: string): NgbDateStruct | null {
        if (value) {
            const date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10),
            };
        }
        return null;
    }

    format(date: NgbDateStruct | null): string {
        return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
    }
}


@Component({
    selector: "app-datePicker",
    standalone: false,
    templateUrl: './datepicker.component.html',
    styleUrl: './datepicker.component.scss',
    providers: [
        { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => DatePickerComponent) },
        { provide: NgbDateAdapter, useClass: CustomAdapter },
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    ]
})

export class DatePickerComponent implements ControlValueAccessor {

    @Input('label') inputLabel: string = "";
    @Input() name: string = "";
    @Input('class') extraClass: string = "";

    value: string = "";

    constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) { }

    onDatePickerChange = (_: any) => { };
    onDatePickerTouch = (_: any) => { };

    registerOnChange(fn: any): void {
        this.onDatePickerChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onDatePickerTouch = fn;
    }

    writeValue(obj: any): void {
        this.value = obj;
    }

    _handleChange(data: any) {
        console.log(data, "dddddddddddddddddddddddddddddddddddddddddddddd")
        this.onDatePickerChange(data)
    }

    get today() {
        return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
    }
}