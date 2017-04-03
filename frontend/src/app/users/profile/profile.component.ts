import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../../backend/src/app/shared/services/custom/user.service";
import {User} from "../../../../../backend/src/app/shared/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {MainService} from "../../shared/services/main.service";
import {PageMessage} from "../../shared/models/page-message";

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	model: User = new User();

	message: PageMessage = new PageMessage();

	constructor(private mainService: MainService,
							private route: ActivatedRoute,
							private userService: UserService) {

	}

	ngOnInit() {

		let userId = this.route.snapshot.params['id'];
		this.userService.findById(userId).subscribe(user => {
			this.model = user as User;
		}, err => {
			this.message = {
				type: "danger",
				text: err.message,
				dismissible: true
			};


		});

	}

}
