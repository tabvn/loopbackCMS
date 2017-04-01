import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ApiModule} from "./shared/services/api.module";
import {appRoutingProviders, AppRouting} from "./app.routing";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import 'hammerjs';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule.forRoot(),
        ApiModule.forRoot(),
        AppRouting
    ],
    entryComponents: [AppComponent],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
}
