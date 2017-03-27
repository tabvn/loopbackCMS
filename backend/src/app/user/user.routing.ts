import {NgModule}                from '@angular/core';
import {RouterModule, Routes}    from '@angular/router';
import {AuthGuard} from "../shared/auth.guard";
import {UsersComponent} from "./users/users.component";
import {RegisterComponent} from "./register/register.component";
import {PasswordComponent} from "./password/password.component";

const userRoutes: Routes = [
	{
		path: '',
		component: UsersComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'password',
		component: PasswordComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(userRoutes)
	],
	exports: [
		RouterModule
	]
})
export class UserRoutingModule {

}

