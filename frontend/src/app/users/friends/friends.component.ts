import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../../backend/src/app/shared/services/custom/user.service";
import {ActivatedRoute} from "@angular/router";
import {FriendService} from "../../../../../backend/src/app/shared/services/custom/friend.service";
import {LoopBackFilter} from "../../../../../backend/src/app/shared/models/base.model";
import {Friend} from "../../../../../backend/src/app/shared/models/friend.model";
import {User} from "../../../../../backend/src/app/shared/models/user.model";

@Component({
	selector: 'app-friends',
	templateUrl: './friends.component.html',
	styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

	models: User[] = [];
	user: User = new User();

	friends: Friend[] = [];

	constructor(private route: ActivatedRoute,
							private friendService: FriendService,
							private userService: UserService) {

	}

	ngOnInit() {

		let userId = this.route.snapshot.params['id'];

		this.userService.findById(userId).subscribe(user => this.user = user as User);

		console.log("user id is: ", userId);


		//{"where": {"id": {"regexp": "/58e1f5ca19f0420b6a205405/"}}}

		let filterQuery: LoopBackFilter = {
			where: {id: {regexp: "/" + userId + "/"}}
		};

		this.friendService.find(filterQuery).subscribe(res => {
			this.friends = res as Friend[];

			console.log("Friends: ", res);

			for (let i = 0; i < this.friends.length; i++) {

				for (let j = 0; j < this.friends[i].users.length; j++) {

					let uid = this.friends[i].users[j].id;

					if (uid !== userId) {

						this.models.push(this.friends[i].users[j]);
					}

				}

			}


		}, err => {

			console.log(err);
		});

	}

}
