import { ChangeDetectionStrategy, Component, EventEmitter, Input, input, OnChanges, Output, SimpleChange, SimpleChanges } from "@angular/core";
import { PaginationInstance } from "ngx-pagination";

@Component({
    selector: "app-paginationComp",
    standalone: false,
    templateUrl: './paginationComp.component.html',
    styleUrl: './paginationComp.component.scss',
})

export class PaginationComponent implements OnChanges {

    @Input() pageNumber: number = 1;
    @Input() totalPages: number = 10;
    @Input() config: PaginationInstance = { id: 'check', currentPage: 1, itemsPerPage: 20, totalItems: 20 };
    @Output() _onPageChange = new EventEmitter<any>();



    ngOnChanges(changes: SimpleChanges): void {
    }

    _onPaginateChange(data: any) {
        this._onPageChange.emit(data);
    }
}