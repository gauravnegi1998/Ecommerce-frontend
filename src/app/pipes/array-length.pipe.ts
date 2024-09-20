import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'length'
})

export class ArrayLength implements PipeTransform {
    transform(array: [] | any): number {
        return array?.length > 0 ? array?.length : 0;
    }
}