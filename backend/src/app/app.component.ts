import {Component} from '@angular/core';
import {AppService} from "./shared/services/app.service";
import {UserService} from "./shared/services/custom/user.service";
import {AuthService} from "./shared/services/core/auth.service";
import {Router} from "@angular/router";
import {DialogService} from "./shared/services/core/dialog.service";
import {RealtimeService} from "./shared/services/core/realtime.service";
import {User} from "./shared/models/user.model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Dashboard';

    constructor(private realtime: RealtimeService,
                public app: AppService,
                public auth: AuthService,
                private router: Router,
                private dialogService: DialogService,
                private userService: UserService) {


        this.realtime.connect();


    }

    signOut() {
        this.userService.logout();
        this.router.navigate(['/access']);
    }

    getUserEmail(user: User) {
        return user.email;
    }

    updateCurrentUserAvatar() {
        let model = this.auth.getCurrentUserData();

        let dialogRef = this.dialogService.openMediaPicker("Update your profile photo", "Set as profile", "Cancel", {
            selectLimit: 1,
            acceptedFiles: "image/jpeg,image/gif,image/png"
        });

        dialogRef.afterClosed().subscribe((data: any) => {
            if (data && data[0]) {
                // return array object of media
                let avatar = data[0];

                let obj = {
                    "mediaId": avatar.id
                };
                if (model.avatar) {
                    this.userService.removeAvatar(model.id).subscribe(() => {
                        this.doChangeAvatar(model, obj, avatar);
                    }, () => {
                        this.doChangeAvatar(model, obj, avatar);
                    });
                } else {
                    this.doChangeAvatar(model, obj, avatar);
                }

            }
        });

    }

    doChangeAvatar(model: any, obj: any, avatar: any) {
        this.userService.updateAvatar(model.id, obj).subscribe(res => {
            model.avatar = {media: avatar};
            this.auth.setUser(model);
        });
    }
}
