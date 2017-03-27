import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogConfig} from "@angular/material";
import {AppService} from "../../shared/services/app.service";
import {DialogService} from "../../shared/services/core/dialog.service";
import {LoopBackFilter} from "../../shared/models/base.model";
import {VocabularyService} from "../../shared/services/custom/vocabulary.service";
import {VocabularyFormComponent} from "../vocabulary-form/vocabulary-form.component";

@Component({
    selector: 'app-vocabulary',
    templateUrl: './vocabulary.component.html',
    styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {


    models: any[] = [];
    modelCounts: number = 0;
    roles: any[] = [];

    currentPage: number = 1;

    filter: LoopBackFilter = {
        limit: 25,
    };

    errorMessage: string;

    constructor(public dialog: MdDialog,
                public dialogService: DialogService,
                private app: AppService,
                private vocabularyService: VocabularyService) {
    }


    ngOnInit() {

        this.app.setTitle("Vocabulary");

        this.vocabularyService.count().subscribe(res => {
            this.modelCounts = res.count;
        });

        this.vocabularyService.find(this.filter).subscribe(users => {
            this.models = users;
        });

    }

    removeItems(items: any[]) {

        let dialogRef = this.dialogService.confirm("Are you sure?", "Are you sure want to delete " + items.length + " selected items This action can not be undone.");

        dialogRef.afterClosed().subscribe(confirm => {

            if (confirm) {
                if (items && items.length) {
                    for (let i = 0; i < items.length; i++) {
                        this.vocabularyService.deleteById(items[i].name).subscribe(() => {
                            let indexValue = this.findIndexByName(this.models, items[i]);
                            if (indexValue !== null) {
                                this.models.splice(indexValue, 1);
                            }
                        });
                    }

                }
            }
        });

    }

    editItem(selectedItems: any) {

        let config: MdDialogConfig = {width: '500px'};
        let dialogRef = this.dialog.open(VocabularyFormComponent, config);


        dialogRef.componentInstance.selectedModel = JSON.parse(JSON.stringify(selectedItems[0]));

        dialogRef.afterClosed().subscribe((response: any) => {
            if (response) {
                let indexKeyValue = this.findIndexByName(this.models, response);
                if (indexKeyValue !== null) {
                    this.models[indexKeyValue] = response;
                }

            }
        });

    }

    addItem(event?: any) {

        let config: MdDialogConfig = {width: '500px'};
        let dialogRef = this.dialog.open(VocabularyFormComponent, config);
        dialogRef.afterClosed().subscribe((item: any) => {
            if (item) {
                this.models.push(item);
            }
        });

    }

    findIndexByName(items: any[], item: any): number {

        for (let i = 0; i < items.length; i++) {
            if (items[i].name === item.name) {

                return i;
            }
        }
        return null;

    }

    onPageChange(event) {
        if (event.page > this.currentPage) {
            this.currentPage = event.page;
            this.filter.limit = event.size;
            this.filter.skip = event.size * (event.page - 1);
            this.vocabularyService.find(this.filter).subscribe(res => {
                this.models = this.models.concat(res);
            });
        } else {
            if (this.modelCounts > event.size) {
                this.currentPage = 1;
                this.filter.limit = event.size;
                this.filter.skip = 0;

                this.vocabularyService.find(this.filter).subscribe(data => {
                    this.models = data;
                });
            }

        }

    }


}
