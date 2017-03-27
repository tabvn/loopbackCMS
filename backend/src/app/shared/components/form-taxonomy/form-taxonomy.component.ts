import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TaxonomyService} from "../../services/custom/taxonomy.service";
import {LoopBackFilter} from "../../models/base.model";
import {TaxonomyTreeItem} from "../../models/taxonomy.tree.item.model";

@Component({
    selector: 'form-taxonomy',
    templateUrl: './form-taxonomy.component.html',
    styleUrls: ['./form-taxonomy.component.scss']
})
export class FormTaxonomyComponent implements OnInit {

    @Input() vocabulary: string;
    @Input() required: boolean = false;

    @Input() set taxonomies(terms: any[]) {
        this._taxonomies = terms;
    }

    @Input() set selected(items: any[]) {
        this._selected = items;

        console.log("a", items);
    }

    @Input() limit: number = 1;
    @Output() onReady: EventEmitter<any> = new EventEmitter<any>();
    @Output() onChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    private _findLevel: number = 0;
    private _filter: LoopBackFilter = {};
    private _terms: any[] = [];
    private models: TaxonomyTreeItem[] = [];
    private _selected: any[] = [];
    private _taxonomies: any[] = [];

    private _disabled: boolean = false;
    private _lastSelected: TaxonomyTreeItem = new TaxonomyTreeItem();


    constructor(private taxonomyService: TaxonomyService) {

    }


    ngOnInit() {

        if (this.vocabulary) {
            this._filter.where = {vocabularyId: this.vocabulary};
        }

        if (!this._taxonomies || this._taxonomies.length == 0) {
            this.taxonomyService.getTreeTaxonomy(this._filter).subscribe((terms) => {
                this._terms = terms;
                this._getModels(terms);
                this.onReady.emit(terms);
            });
        } else {
            this._terms = this._taxonomies;
            this._getModels(this._terms);
        }

    }

    _getModels(models: any[], level = 0) {

        for (let i = 0; i < models.length; i++) {
            let isChecked: boolean = this._isSelectedItem(models[i]);
            let data: TaxonomyTreeItem = new TaxonomyTreeItem(models[i], isChecked, this._findLevel);
            this.models.push(data);
            if (models[i].children && models[i].children.length) {
                this._findLevel = this._findLevel + 1;
                this._getModels(models[i].children, this._findLevel);
            }
            if (i == models.length - 1) {
                this._findLevel = (level - 1);
            }
        }

    }

    _isSelectedItem(model: any): boolean {

        if (this._selected && this._selected.length) {
            let findItem = this._selected.filter((item) => item.taxonomyId == model.id);
            console.log("selected", findItem);
            if (findItem && findItem.length) {
                return true;
            }
        }


        return false;
    }

    _onSelect(item: TaxonomyTreeItem) {

        item.checked = !item.checked;
        if (item.checked) {
            this._lastSelected = item;
        }
        this._checkLimit();
        this._updateSelected();

        this.onChange.emit(this._selected);
    }

    _checkLimit() {
        if (this._selected && (this._selected.length >= this.limit)) {
            // remove last checked
            if (this._lastSelected) {
                this._lastSelected.checked = false;
            }
            this._lastSelected = null;

            this._disabled = false;
        } else {
            this._disabled = false;
        }
    }

    _updateSelected() {
        let selectedItems = this.models.filter((item) => item.checked == true);
        let items: any[] = [];
        if (selectedItems && selectedItems.length) {
            for (let i = 0; i < selectedItems.length; i++) {
                let obj = {taxonomyId: selectedItems[i].model.id, taxonomy: selectedItems[i].model};
                items.push(obj);
            }
        }
        this._selected = items;
    }

}
