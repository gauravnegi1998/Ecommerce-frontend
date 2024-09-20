import { Pipe, PipeTransform } from "@angular/core";
import _ from "lodash";

@Pipe({
    name: 'currency'
})

export class CurrencyFormatterPipe implements PipeTransform {


    formatNumberWithCommas(number: string) {
        const formatter = new Intl.NumberFormat('en-US');
        const formattedNumber = formatter.format(+number);
        return formattedNumber && formattedNumber?.split('.')?.[1]?.length === 1 ? formattedNumber + '0' : formattedNumber;
    }

    transform(value: any, ...args: any[]) {
        return _.isNaN(value) ? "" : `$${this.formatNumberWithCommas(parseFloat(value).toFixed(2))}`
    }
}