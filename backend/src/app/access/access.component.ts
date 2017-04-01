import {Component, OnInit} from '@angular/core';
import {AppService} from "../shared/services/app.service";
import {User} from "../shared/models/user.model";
import {UserService} from "../shared/services/custom/user.service";
import {AccessToken} from "../shared/models/base.model";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/core/auth.service";

@Component({
    selector: 'app-access',
    templateUrl: './access.component.html',
    styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

    public user = new User();
    public rememberMe: boolean = true;
    errorMessage: string;
    actionTitle: string = "Login";

    constructor(private router: Router,
                public app: AppService,
                public auth: AuthService,
                private userService: UserService) {

    }

    ngOnInit() {

        let user = this.auth.getCurrentUserData();
        if (this.auth.isAdministrator(user)) {
            this.router.navigate(['/users']);
        }
        this.app.setTitle("Login to access the dashboard system.");

    }

    onSubmit() {

        this.actionTitle = "Please wait...";
        this.errorMessage = null;

        this.userService.login(this.user, 'user', this.rememberMe).subscribe((token: AccessToken) => {
                return this.router.navigate(['/']);
            }
            , err => {
                this.actionTitle = "Login";
                this.errorMessage = err.message;
            });
    }
}
