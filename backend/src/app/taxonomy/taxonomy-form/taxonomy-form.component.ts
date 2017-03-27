import {Component, OnInit} from '@angular/core';
import {Taxonomy} from "../../shared/models/taxonomy.model";
import {AppService} from "../../shared/services/app.service";
import {MdDialogRef} from "@angular/material";
import {TaxonomyService} from "../../shared/services/custom/taxonomy.service";
import {Vocabulary} from "../../shared/models/vocabulary.model";

@Component({
    selector: 'app-taxonomy-form',
    templateUrl: './taxonomy-form.component.html',
    styleUrls: ['./taxonomy-form.component.scss']
})
export class TaxonomyFormComponent implements OnInit {

    model: Taxonomy = new Taxonomy();
    errorMessage: string;
    title: string = "Create taxonomy term";
    action: string = "Create";
    public vocabulary: Vocabulary;
    public taxonomies: Taxonomy[] = [];
    public selectedModel: any;

    constructor(private app: AppService,
                public dialog: MdDialogRef<TaxonomyFormComponent>,
                private taxonomyService: TaxonomyService) {
    }

    ngOnInit() {


        if (this.selectedModel) {
            this.model = this.selectedModel;
            this.title = "Edit taxonomy term";
            this.action = "Update";

            this.taxonomies = this.taxonomies.filter((item) => item.id !== this.selectedModel.id);
        }


    }

    isExistById(items: any[], item: any): boolean {

        if (items && items.length) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].id == item.id) {
                    return true;
                }
            }
        }
        return false;
    }

    findIndexByName(items: any[], item: any): number {

        for (let i = 0; i < items.length; i++) {
            if (item.name == items[i].name) {
                return i;
            }
        }

        return null;
    }

    findIndexById(items: any[], item: any): number {

        for (let i = 0; i < items.length; i++) {
            if (item.id == items[i].id) {
                return i;
            }
        }

        return null;
    }

    onSave() {

        this.model.vocabularyId = this.vocabulary.name;

        this.action = "Saving...";
        if (this.model.id) {
            this.taxonomyService.patchAttributes(this.model.id, this.model).subscribe((response: any) => {
                this.selectedModel = null;
                this.model = response;
                this.dialog.close(this.model);

            });

        } else {
            this.taxonomyService.patchOrCreate(this.model).subscribe((res) => {
                this.dialog.close(res);
                this.selectedModel = null;
            }, err => {
                this.errorMessage = err.message;
            });


        }


    }


    onSelectParent(event) {
        if (this.model.id !== event.id) {
            if (this.model.parentId == event.id) {
                this.model.parentId = null;
            } else {
                this.model.parentId = event.id;
            }

            this.errorMessage = null;
        } else {
            this.errorMessage = "Unable select parent as it self.";
        }

    }


}
