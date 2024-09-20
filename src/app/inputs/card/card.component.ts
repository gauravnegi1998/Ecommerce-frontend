import { Component, Input, OnInit, input } from "@angular/core";
import { ICustomerData } from "../../module/commonInterfaces";

@Component({
    selector: "app-card",
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})

export class CardComponent implements OnInit {

    @Input() userDetail: any = {};
    @Input() currentIndex: number = 0;

    ngOnInit(): void {
    }

}