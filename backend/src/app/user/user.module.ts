import {NgModule} from '@angular/core';
import {UsersComponent} from './users/users.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserRoutingModule} from "./user.routing";
import {RegisterComponent} from './register/register.component';
import {PasswordComponent} from './password/password.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
	imports: [
		SharedModule.forRoot(),
		UserRoutingModule
	],
	declarations: [UsersComponent, UserFormComponent, RegisterComponent, PasswordComponent],
	entryComponents: [UserFormComponent]
})
export class UserModule {
}
