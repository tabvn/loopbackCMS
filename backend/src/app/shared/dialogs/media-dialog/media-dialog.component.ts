import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {DropzoneConfigInterface} from "angular2-dropzone-wrapper";
import {ApiConfig} from "../../api.config";
import {AuthService} from "../../services/core/auth.service";
import {UserService} from "../../services/custom/user.service";
import {LoopBackFilter} from "../../models/base.model";
import {Media} from "../../models/media.model";

@Component({
    selector: 'app-media-dialog',
    templateUrl: './media-dialog.component.html',
    styleUrls: ['./media-dialog.component.scss']
})
export class MediaDialogComponent implements OnInit {

    public title: string;
    public actionButton: string;
    public cancelButton: string;
    public selectedMedia: any[] = [];
    public selectLimit: number = 1;
    public acceptedFiles: any;
    public library: Media[] = [];
    notifyMessage: string;
    uploadErrorMessage: string;
    selectedTabIndex: number = 0;
    libraryLoadMoreButton: string = "Load more";

    tabLibraryActive: boolean = false;
    imageFileTypes: string[] = [
        'image/jpeg',
        'image/gif',
        'image/png',
        'image/bmp'
    ];

    filter: LoopBackFilter = {
        limit: 24,
        skip: 0,
        order: ['createdAt DESC'],
        include: {}
    };

    public config: DropzoneConfigInterface = {
        headers: {},
        server: ApiConfig.getMediaUploadPath(),
        maxFilesize: ApiConfig.getDefaultMediaUploadMaxFilesize(),
        acceptedFiles: this.acceptedFiles,
        uploadMultiple: false,
        autoReset: 200
    };

    constructor(private auth: AuthService,
                private userService: UserService,
                public dialog: MdDialogRef<MediaDialogComponent>) {

    }

    ngOnInit() {

        if (this.acceptedFiles) {
            this.config.acceptedFiles = this.acceptedFiles;
            let fileTypes: string[] = this.acceptedFiles.split(',');
            console.log(fileTypes);
            let whereOr = [];
            this.filter.where = {and: []};
            if (fileTypes.length) {
                fileTypes.forEach((name) => {
                    whereOr.push({type: name});
                });

                this.filter.where = {or: whereOr};
            }

        }
        if (this.auth.getAccessTokenId()) {
            let authHeader = {"Authorization": ApiConfig.getAuthPrefix() + this.auth.getAccessTokenId()};
            this.config.headers = Object.assign(this.config.headers, authHeader);
        }

    }

    onUploadSuccess(event: any) {


        this.uploadErrorMessage = null;
        this.selectedTabIndex = 1;
        if (event && typeof (event[1] !== "undefined") && event[1] !== null) {
            let uploadedItems = event[1];
            this.library = uploadedItems.concat(this.library);
            this.filter.skip = this.filter.skip + uploadedItems.length;
            for (let i = 0; i < uploadedItems.length; i++) {
                this.onSelectMedia(uploadedItems[i]);
            }

        }
    }

    onUploadError(event: any) {
        this.uploadErrorMessage = "An error uploading your file.";
    }

    onTabChange(event: any) {

        if (this.tabLibraryActive == false) {

            this.loadMediaLibrary();
        }
        if (event.index == 1) {
            this.tabLibraryActive = true;
        }
    }

    loadMediaLibrary() {

        this.libraryLoadMoreButton = "Loading...";
        let userId = this.auth.getCurrentUserId();

        this.userService.getUserMedia(userId, this.filter).subscribe(media => {
            this.libraryLoadMoreButton = "Load more";
            if (!media || media.length == 0) {
                this.libraryLoadMoreButton = "You're reached end of the list.";
            }
            if (this.library.length) {

                this.library = this.library.concat(media);
            } else {
                this.library = media;
            }

        });
    }

    findById(items: any, item: any): number {
        if (items && items.length) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].id == item.id) {
                    return i;
                }
            }
        }
        return null;
    }

    isSelectedMedia(item: any): boolean {
        let items = this.selectedMedia;

        if (items && items.length) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].id == item.id) {
                    return true;
                }
            }
        }
        return false;
    }

    onSelectMedia(item: Media) {
        if (this.selectedMedia.length <= this.selectLimit) {
            this.notifyMessage = null;
        }
        let indexValue = this.findById(this.selectedMedia, item);
        if (indexValue !== null) {
            this.selectedMedia.splice(indexValue, 1);
        } else {
            if (this.selectLimit > this.selectedMedia.length) {
                this.selectedMedia.push(item);
            } else {
                this.notifyMessage = "Only allow select maximum " + this.selectLimit;
            }

        }
    }

    loadMoreLibrary() {
        this.libraryLoadMoreButton = "Loading...";

        this.filter.skip = this.filter.skip + this.filter.limit;
        this.loadMediaLibrary();
    }

    isImageFileType(fileType: string): boolean {
        for (let i = 0; i < this.imageFileTypes.length; i++) {
            if (fileType === this.imageFileTypes[i]) {
                return true;
            }
        }
        return false;
    }
}
