import {Component, OnInit} from '@angular/core';
import {Vocabulary} from "../../shared/models/vocabulary.model";
import {AppService} from "../../shared/services/app.service";
import {MdDialogRef} from "@angular/material";
import {VocabularyService} from "../../shared/services/custom/vocabulary.service";

@Component({
    selector: 'app-vocabulary-form',
    templateUrl: './vocabulary-form.component.html',
    styleUrls: ['./vocabulary-form.component.scss']
})
export class VocabularyFormComponent implements OnInit {

    model: Vocabulary = new Vocabulary();
    errorMessage: string;
    title: string = "Create vocabulary";
    action: string = "Create";
    public selectedModel: any;
    vocabularyNameIsEdited: boolean = false;

    constructor(private app: AppService,
                public dialog: MdDialogRef<VocabularyFormComponent>,
                private vocabularySerice: VocabularyService) {
    }

    ngOnInit() {


        if (this.selectedModel) {
            this.model = this.selectedModel;
            this.title = "Edit vocabulary";
            this.action = "Update";
        }


    }


    findIndexByName(items: any[], item: any): number {

        for (let i = 0; i < items.length; i++) {
            if (item.name == items[i].name) {
                return i;
            }
        }

        return null;
    }


    onSave() {

        this.action = "Saving...";
        if (this.selectedModel) {
            this.vocabularySerice.patchAttributes(this.model.name, this.model).subscribe((response: any) => {
                this.selectedModel = null;
                this.model = response;
                this.dialog.close(this.model);

            });

        } else {
            this.vocabularySerice.patchOrCreate(this.model).subscribe((res) => {
                this.dialog.close(res);
                this.selectedModel = null;
            }, err => {
                this.errorMessage = err.message;
            });


        }


    }

    onTitleChange() {
        if (!this.vocabularyNameIsEdited && this.model.title) {
            this.model.name = this.model.title.toLowerCase().replace(" ", "_");
        }
    }


    onVocabularyNameChange(event: any) {
        this.vocabularyNameIsEdited = true;
        if (this.model.name) {
            this.model.name = this.model.name.toLowerCase();
            this.model.name = this.model.name.replace(" ", "_");
        } else {
            this.vocabularyNameIsEdited = false;
        }


    }


}
