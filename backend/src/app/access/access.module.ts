import {NgModule} from '@angular/core';
import {AccessComponent} from "./access.component";
import {AccessRoutingModule} from "./access.routing";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        AccessRoutingModule,
        SharedModule.forRoot()
    ],
    declarations: [AccessComponent]
})
export class AccessModule {

}
