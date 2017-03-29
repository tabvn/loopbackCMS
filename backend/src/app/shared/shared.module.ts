import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {
    SmdDataTable,
    SmdDatatableHeader,
    SmdDatatableActionButton,
    SmdContextualDatatableButton,
    SmdDataTableColumnComponent,
    SmdDataTableRowComponent,
    SmdDataTableCellComponent,
    SmdDatatableDialogChangeValue,
    SmdPaginatorComponent,
    SmdFabSpeedDialTrigger,
    SmdFabSpeedDialActions,
    SmdFabSpeedDialComponent
} from "./components";
import {AdminElementDirective} from "./directives/admin-element.directive";
import {ConfirmDialogComponent} from "./dialogs/confirm-dialog/confirm-dialog.component";
import {DialogService} from "./services/core/dialog.service";
import {MediaUrlPipe} from "./pipes/media-url.pipe";
import {MediaDialogComponent} from "./dialogs/media-dialog/media-dialog.component";
import {EditorComponent} from "./components/editor/editor.component";
import {ThumbnailPipe} from "./pipes/thumbnail.pipe";
import {TreeOptionComponent} from "./components/tree-option/tree-option.component";
import {FormTaxonomyComponent} from "./components/form-taxonomy/form-taxonomy.component";
import {DropzoneModule} from "ngx-dropzone-wrapper";


let IMPORTS = [
    CommonModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    DropzoneModule
];

let COMPONETNS = [
    SmdDataTable,
    SmdDatatableHeader,
    SmdDatatableActionButton,
    SmdContextualDatatableButton,
    SmdDataTableColumnComponent,
    SmdDataTableRowComponent,
    SmdDataTableCellComponent,
    SmdDatatableDialogChangeValue,
    SmdPaginatorComponent,
    SmdFabSpeedDialTrigger,
    SmdFabSpeedDialActions,
    SmdFabSpeedDialComponent,
    AdminElementDirective,
    ConfirmDialogComponent,
    MediaDialogComponent,
    MediaUrlPipe,
    ThumbnailPipe,
    EditorComponent,
    TreeOptionComponent,
    FormTaxonomyComponent
];


@NgModule({
    imports: IMPORTS,
    exports: COMPONETNS,
    declarations: COMPONETNS,
    providers: [DialogService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [SmdDatatableDialogChangeValue, ConfirmDialogComponent, MediaDialogComponent, TreeOptionComponent]
})
export class SharedModule {

    static forRoot(...imports: any[]): any[] {
        return [
            CommonModule,
            HttpModule,
            FormsModule,
            MaterialModule,
            SharedModule,
            DropzoneModule,
            ...imports
        ]
    }

}
