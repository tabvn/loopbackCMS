import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

	public title: string;
	public message: string;
	public actionButton: string;
	public cancelButton: string;
	constructor(public dialog: MdDialogRef<ConfirmDialogComponent>) {
		
	}

	ngOnInit() {

	}

}
