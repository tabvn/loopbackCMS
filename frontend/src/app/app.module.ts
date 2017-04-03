import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BlogComponent} from './blog/blog.component';
import {AppRoutingModule} from "./app-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import 'hammerjs';
import {ApiModule} from "../../../backend/src/app/shared/services/api.module";
import {RealtimeService} from "../../../backend/src/app/shared/services/core/realtime.service";
import {LoginComponent} from './users/login/login.component';
import {RegisterComponent} from './users/register/register.component';
import {EqualValidatorDirective} from './shared/equal-validator.directive';
import {BlogDetailComponent} from './blog/blog-detail/blog-detail.component';
import {ThumbnailPipe} from "../../../backend/src/app/shared/pipes/thumbnail.pipe";
import {MediaUrlPipe} from "../../../backend/src/app/shared/pipes/media-url.pipe";
import {ProfileComponent} from './users/profile/profile.component';
import {MainService} from "./shared/services/main.service";
import { FriendsComponent } from './users/friends/friends.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PageNotFoundComponent,
        BlogComponent,
        LoginComponent,
        RegisterComponent,
        EqualValidatorDirective,
        ThumbnailPipe,
        MediaUrlPipe,
        BlogDetailComponent,
        ProfileComponent,
        FriendsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ApiModule.forRoot(),
        NgbModule.forRoot(),
        AppRoutingModule
    ],
    providers: [MainService, RealtimeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
