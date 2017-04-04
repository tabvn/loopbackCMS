import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../../backend/src/app/shared/services/custom/user.service";
import {ActivatedRoute} from "@angular/router";
import {LoopBackFilter} from "../../../../../backend/src/app/shared/models/base.model";
import {User} from "../../../../../backend/src/app/shared/models/user.model";

@Component({
	selector: 'app-friends',
	templateUrl: './friends.component.html',
	styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

	models: User[] = [];
	user: User = new User();
	skip: number = 0;
	limit: number = 20;
	search: string = "";

	constructor(private route: ActivatedRoute,
							private userService: UserService) {

	}

	ngOnInit() {

		let userId = this.route.snapshot.params['id'];

		this.userService.findById(userId).subscribe(user => this.user = user as User);

		this.userService.getUserFriends(userId, this.limit, this.skip, this.search).subscribe(data => {

			this.models = data as User[];

			console.log("data: ", data);
		}, err => {
			console.log(err);
		});

	}

}
