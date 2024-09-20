import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ArrayLength } from "./array-length.pipe";
import { CurrencyFormatterPipe } from "./currenyFormat.pipe";
import { DateFormatPipe } from "./dateFormat.pipe";

@NgModule({
    declarations: [ArrayLength, CurrencyFormatterPipe, DateFormatPipe],
    imports: [CommonModule],
    exports: [ArrayLength, CurrencyFormatterPipe, DateFormatPipe]
})

export class PipesModules { }