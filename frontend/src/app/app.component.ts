import {Component} from '@angular/core';
import {AuthService} from "../../../backend/src/app/shared/services/core/auth.service";
import {UserService} from "../../../backend/src/app/shared/services/custom/user.service";
import {MainService} from "./shared/services/main.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app works!';

    public isNavCollapsed: boolean = true;
    public isSearchCollapsed: boolean = true;

    constructor(public mainService: MainService, public auth: AuthService, private userService: UserService) {

    }

    getUserEmail(user: any) {
        if (user) {
            return user.email;
        }
    }

    logout() {
        this.userService.logout();
    }
}
