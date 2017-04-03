import {NgModule}              from '@angular/core';
import {RouterModule, Routes}  from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {BlogComponent} from "./blog/blog.component";
import {LoginComponent} from "./users/login/login.component";
import {RegisterComponent} from "./users/register/register.component";
import {BlogDetailComponent} from "./blog/blog-detail/blog-detail.component";
import {ProfileComponent} from "./users/profile/profile.component";
import {FriendsComponent} from "./users/friends/friends.component";
const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'node/:id', component: BlogDetailComponent},
    {path: 'user/:id', component: ProfileComponent},
    {path: 'user/:id/friends', component: FriendsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}