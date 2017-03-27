import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {UserService} from "./services/custom/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private userService: UserService) {
    }

    canActivate() {
        if (this.userService.isAdministrator()) {
            return true;
        } else {
            this.router.navigate(['/access']);
           // return true;
        }
    }
}
