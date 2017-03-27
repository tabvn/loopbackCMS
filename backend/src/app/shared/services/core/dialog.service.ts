import {Injectable} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {ConfirmDialogComponent} from "../../dialogs/confirm-dialog/confirm-dialog.component";
import {MediaDialogComponent} from "../../dialogs/media-dialog/media-dialog.component";

@Injectable()
export class DialogService {

    constructor(public dialog: MdDialog) {

    }

    confirm(title: string = "Are you sure?", message: string = "", actionTitle: string = "Confirm", cancelTitle: string = "Cancel", config: MdDialogConfig = {width: "300px"}): MdDialogRef<ConfirmDialogComponent> {

        let ref: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, config);
        ref.componentInstance.title = title;
        ref.componentInstance.message = message;
        ref.componentInstance.actionButton = actionTitle;
        ref.componentInstance.cancelButton = cancelTitle;

        return ref;
    }

    openMediaPicker(title = "Select media", actionTitle = "Done", cancelTitle: string = "Cancel", uploadConfig?: {selectLimit:number, acceptedFiles?: string}, dialogConfig: MdDialogConfig = {width: "600px"}): MdDialogRef<MediaDialogComponent> {
        let ref: MdDialogRef<MediaDialogComponent> = this.dialog.open(MediaDialogComponent, dialogConfig);


        ref.componentInstance.title = title;
        ref.componentInstance.actionButton = actionTitle;
        ref.componentInstance.cancelButton = cancelTitle;

        ref.componentInstance.acceptedFiles = uploadConfig.acceptedFiles;
        ref.componentInstance.selectLimit = uploadConfig.selectLimit;

        return ref;
    }

}
