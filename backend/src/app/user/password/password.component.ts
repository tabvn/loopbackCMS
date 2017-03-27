import {Component, OnInit} from '@angular/core';
import {AppService} from "../../shared/services/app.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-password',
	templateUrl: './password.component.html',
	styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

	actionTitle: string = "Send me password";

	constructor(private app: AppService,
							public router: Router) {
	}

	ngOnInit() {
		this.app.setTitle("Forgot password");
	}

}
