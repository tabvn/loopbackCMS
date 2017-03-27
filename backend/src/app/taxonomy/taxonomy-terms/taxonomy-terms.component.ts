import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from "../../shared/services/app.service";
import {TaxonomyService} from "../../shared/services/custom/taxonomy.service";
import {VocabularyService} from "../../shared/services/custom/vocabulary.service";
import {ActivatedRoute} from "@angular/router";
import {LoopBackFilter} from "../../shared/models/base.model";
import {Vocabulary} from "../../shared/models/vocabulary.model";
import {DialogService} from "../../shared/services/core/dialog.service";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {TaxonomyFormComponent} from "../taxonomy-form/taxonomy-form.component";

@Component({
    selector: 'app-taxonomy-terms',
    templateUrl: './taxonomy-terms.component.html',
    styleUrls: ['./taxonomy-terms.component.scss']
})
export class TaxonomyTermsComponent implements OnInit, OnDestroy {

    vocabulary: any = new Vocabulary();
    models: any[] = []; // this is flat tree
    modelCounts: number = 0;
    roles: any[] = [];

    currentPage: number = 1;

    findTreeLevel: number = 0;


    filter: LoopBackFilter = {
        limit: 25,
    };

    errorMessage: string;

    taxonomyParentitems: string[] = [];

    constructor(public dialog: MdDialog,
                public dialogService: DialogService, private app: AppService,
                private taxonomyService: TaxonomyService,
                private route: ActivatedRoute,
                private vocabularyService: VocabularyService) {
    }

    ngOnInit() {

        let vid = this.route.snapshot.params["vid"];
        this.filter.where = {vocabularyId: vid};

        this.getVocabularyById(vid);
        this.getTaxonomies(vid);
        this.taxonomyService.count({"vocabularyId": vid}).subscribe(res => {
            this.modelCounts = res.count;
        });

    }

    getVocabularyById(id: string) {


        this.vocabularyService.findById(id).subscribe(res => {
            this.vocabulary = res;
            this.app.setTitle(this.vocabulary.title);
            let breadrumb = [
                {title: "Vocabularies", link: "/taxonomy"},
                {title: this.vocabulary.title, link: null}
            ];
            this.app.setBreadcrumb(breadrumb);

        });
    }

    getTaxonomies(vid: string) {

        this.getTreeTaxonomy(vid);

    }

    getTreeTaxonomy(vid) {
        this.taxonomyService.getTreeTaxonomy(this.filter).subscribe(res => {
            this.models = res;

        });
    }


    removeItems(items: any[]) {

        let dialogRef = this.dialogService.confirm("Are you sure?", "Are you sure want to delete " + items.length + " selected items This action can not be undone.");

        dialogRef.afterClosed().subscribe(confirm => {

            if (confirm) {
                if (items && items.length) {
                    for (let i = 0; i < items.length; i++) {
                        this.vocabularyService.deleteById(items[i].id).subscribe(() => {
                            let indexValue = this.findIndexById(this.models, items[i]);
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
        let dialogRef = this.dialog.open(TaxonomyFormComponent, config);


        dialogRef.componentInstance.selectedModel = JSON.parse(JSON.stringify(selectedItems[0]));
        dialogRef.componentInstance.vocabulary = this.vocabulary;
        dialogRef.componentInstance.taxonomies = JSON.parse(JSON.stringify(this.models));

        dialogRef.afterClosed().subscribe((response: any) => {
            if (response) {
                if (response.parentId && response.parentId !== selectedItems[0].parentId) {
                    this.getTaxonomies(this.vocabulary.id);
                } else {
                    this.getTaxonomies(this.vocabulary.id);
                }

            }
        });

    }

    addItem(event?: any) {

        let config: MdDialogConfig = {width: '500px'};
        let dialogRef = this.dialog.open(TaxonomyFormComponent, config);
        dialogRef.componentInstance.vocabulary = this.vocabulary;
        dialogRef.componentInstance.taxonomies = JSON.parse(JSON.stringify(this.models));
        dialogRef.afterClosed().subscribe((item: any) => {
            if (item) {
                if (!item.parentId) {
                    this.models.push(item);
                } else {
                    this.getTaxonomies(this.vocabulary.id);
                }

            }
        });

    }

    findIndexById(items: any[], item: any): number {

        for (let i = 0; i < items.length; i++) {
            if (items[i].id === item.id) {

                return i;
            }
            if (items[i].children && items[i].children.length) {
                this.findIndexById(items[i].children, item);
            }
        }
        return null;

    }

    onPageChange(event) {
        if (event.page > this.currentPage) {
            this.currentPage = event.page;
            this.filter.limit = event.size;
            this.filter.skip = event.size * (event.page - 1);
            this.taxonomyService.getTreeTaxonomy(this.filter).subscribe(res => {
                this.models = this.models.concat(res);
            });
        } else {
            if (this.modelCounts > event.size) {
                this.currentPage = 1;
                this.filter.limit = event.size;
                this.filter.skip = 0;

                this.vocabulary.getTreeTaxonomy(this.filter).subscribe(data => {
                    this.models = data;
                });
            }

        }

    }


    ngOnDestroy() {
        this.app.setBreadcrumb(null);
    }
}
