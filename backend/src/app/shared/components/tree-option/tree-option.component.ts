import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'tree-select-option',
    templateUrl: './tree-option.component.html',
    styleUrls: ['./tree-option.component.scss']
})
export class TreeOptionComponent implements OnInit {

    @Input() data: any;
    public _selected: any;

    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    @Input() set selected(item: any) {
        this._selected = item;
    }


    constructor() {

    }

    ngOnInit() {


    }

    onSelect(item: any) {

        this.select.emit(item);
        this._selected = item.id;
    }

    onChildSelect(event) {
        this.select.emit(event);
        this._selected = event.id;
    }
}
