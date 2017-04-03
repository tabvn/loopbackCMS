import {Component, OnInit} from '@angular/core';
import {AppService} from "../../shared/services/app.service";
import {MdDialogRef} from "@angular/material";
import {Node} from "../../shared/models/node.model";
import {NodeService} from "../../shared/services/custom/node.service";
import {DialogService} from "../../shared/services/core/dialog.service";
import {ApiConfig} from "../../shared/api.config";

@Component({
    selector: 'app-node-form',
    templateUrl: './node-form.component.html',
    styleUrls: ['./node-form.component.scss']
})
export class NodeFormComponent implements OnInit {

    model: Node = new Node();
    errorMessage: string;
    title: string = "Create content";
    action: string = "Create";
    public selectedModel: any;
    private _selectedTaxonomies: any[] = [];
    private nodeStatus: any[] = ApiConfig.getNodePublishedOptions();

    constructor(private app: AppService,
                public dialog: MdDialogRef<NodeFormComponent>,
                private dialogService: DialogService,
                private nodeService: NodeService) {
    }

    ngOnInit() {


        this.model.status = 1;

        if (this.selectedModel) {

            this.model = this.selectedModel;
            this._selectedTaxonomies = this.model.taxonomies;
            this.title = "Edit content";
            this.action = "Update";

        }


    }


    onSave() {


        this.action = "Saving...";
        if (this.model.id) {
            this.nodeService.patchAttributes(this.model.id, this.model).subscribe((response: any) => {
                this.selectedModel = null;
                //this.model = response;
                this.model.updatedAt = response.updatedAt;
                this.dialog.close(this.model);

            });

        } else {
            this.nodeService.patchOrCreate(this.model).subscribe((res) => {

                this.model.createdAt = res.createdAt;
                this.model.id = res.id;

                // create taxonomy relation
                if (this.model.taxonomies && this.model.taxonomies.length) {
                    this.model.taxonomies.forEach((item) => {
                        let data = {
                            taxonomyId: item.taxonomyId,
                            refId: res.id,
                            refType: 'node'
                        };


                        this.nodeService.addTaxonomyNode(data).subscribe(() => {

                        });
                    });
                }

                if (this.model.images && this.model.images.length) {
                    this.model.images.forEach((item) => {
                        let data = {
                            mediaId: item.mediaId,
                            refId: res.id,
                            refType: 'node'
                        };


                        this.nodeService.addMedia(res.id, data).subscribe(() => {

                        });
                    });
                }



                this.dialog.close(this.model);
                this.selectedModel = null;
            }, err => {
                this.errorMessage = err.message;
            });


        }


    }

    onTaxonomyChange(terms: any[]) {

        this._selectedTaxonomies = terms;
        this.model.taxonomies = this._selectedTaxonomies;
    }

    openMediaLibrary() {
        let dialogRef = this.dialogService.openMediaPicker("Update your profile photo", "Set as profile", "Cancel", {
            selectLimit: 10,
            acceptedFiles: "image/jpeg,image/gif,image/png"
        });

        dialogRef.afterClosed().subscribe(media => {

            if (media && media.length) {

                if (!this.model.images) {
                    this.model.images = [];
                }
                for (let i = 0; i < media.length; i++) {
                    let obj = {mediaId: media[i].id, media: media[i]};
                    this.model.images.push(obj);
                }
            }

        });
    }

    onRemoveImmage(index: number) {
        if (this.model.images[index]) {
            this.model.images.splice(index, 1);
        }


    }

}
