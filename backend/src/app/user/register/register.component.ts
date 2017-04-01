import {Component, OnInit} from '@angular/core';
import {AppService} from "../../shared/services/app.service";
import {User} from "../../shared/models/user.model";
import {UserService} from "../../shared/services/custom/user.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	model: User = new User();
	public successMessage: string;
	public errorMessage: string;
	passwordRepeat: string = "";
	actionTitle: string = "Create an account";

	constructor(private app: AppService,
							private userService: UserService,
							public router: Router) {

	}

	ngOnInit() {
		this.app.setTitle("Create an account.");
	}

	onSubmit() {


		this.errorMessage = null;
		this.successMessage = null;

		if (this.passwordRepeat !== this.model.password) {
			this.errorMessage = "Password does not match";
			return;
		}
		this.actionTitle = "Please wait...";
		this.userService.create(this.model).subscribe((response: any) => {
			this.errorMessage = null;
			this.actionTitle = "Create an account";
			this.successMessage = "Your account has been created.";

		});
	}
}
