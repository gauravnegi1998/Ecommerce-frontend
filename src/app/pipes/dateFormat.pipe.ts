import { Pipe, PipeTransform } from "@angular/core";
import moment from "moment";

@Pipe({
    name: "dateFormat"
})

export class DateFormatPipe implements PipeTransform {
    transform(value: Date, format: string = "DD MMMM yyyy", ...args: any[]) {
        return moment(value).format(format)
    }
}