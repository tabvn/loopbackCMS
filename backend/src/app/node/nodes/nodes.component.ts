import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoopBackFilter} from "../../shared/models/base.model";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {DialogService} from "../../shared/services/core/dialog.service";
import {AppService} from "../../shared/services/app.service";
import {NodeFormComponent} from "../node-form/node-form.component";
import {NodeService} from "../../shared/services/custom/node.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-nodes',
    templateUrl: './nodes.component.html',
    styleUrls: ['./nodes.component.scss']
})
export class NodesComponent implements OnInit, OnDestroy {

    models: any[] = []; // this is flat tree
    modelCounts: number = 0;
    currentPage: number = 1;


    filter: LoopBackFilter = {
        include: ["taxonomies", "images"],
        limit: 25,
        order: ["createdAt DESC", "updatedAt DESC"],
    };

    filter$: Observable<string>;

    errorMessage: string;


    constructor(private route: ActivatedRoute,
                public dialog: MdDialog,
                public dialogService: DialogService,
                private app: AppService,
                private nodeService: NodeService) {
    }

    ngOnInit() {

        let options = {
            model: "node",
            method: "POST"
        };

        this.app.setTitle("Content");

        this.filter$ = this.route
            .queryParams
            .map(params => params['filter'] || '{}');

        this.filter$.subscribe(res => {
            if (res) {
                let filterJson = JSON.parse(res);
                this.filter = Object.assign(filterJson, this.filter);
            }

            this.getModels();
        });


    }

    getModels() {
        let countFilter: any = {};
        if (this.filter.where) {
            countFilter = this.filter.where;
        }
        this.nodeService.find(this.filter).subscribe(res => this.models = res);
        this.nodeService.count(countFilter).subscribe(data => this.modelCounts = data.count);
    }


    removeItems(items: any[]) {

        let dialogRef = this.dialogService.confirm("Are you sure?", "Are you sure want to delete " + items.length + " selected items This action can not be undone.");

        dialogRef.afterClosed().subscribe(confirm => {

            if (confirm) {
                if (items && items.length) {
                    for (let i = 0; i < items.length; i++) {
                        this.nodeService.deleteById(items[i].id).subscribe(() => {
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

        console.log(selectedItems[0]);
        let config: MdDialogConfig = {disableClose: true};
        let dialogRef = this.dialog.open(NodeFormComponent, config);


        dialogRef.componentInstance.selectedModel = JSON.parse(JSON.stringify(selectedItems[0]));

        dialogRef.afterClosed().subscribe((response: any) => {
            if (response) {

                let indexValue = this.findIndexById(this.models, response);
                if (indexValue !== null) {
                    this.models[indexValue] = response;
                }

            }
        });

    }

    addItem(event?: any) {

        let config: MdDialogConfig = {disableClose: true};
        let dialogRef = this.dialog.open(NodeFormComponent, config);
        dialogRef.afterClosed().subscribe((item: any) => {
            if (item) {

                this.models.push(item);

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
            this.nodeService.find(this.filter).subscribe(res => {
                this.models = this.models.concat(res);
            });
        } else {
            if (this.modelCounts > event.size) {
                this.currentPage = 1;
                this.filter.limit = event.size;
                this.filter.skip = 0;

                this.nodeService.find(this.filter).subscribe(data => {
                    this.models = data;
                });
            }

        }

    }

    getFilterParams(type: any) {

        return {filter: JSON.stringify({where: {nodeTypeId: type}})};
    }


    ngOnDestroy() {
        this.app.setBreadcrumb(null);
    }


}
