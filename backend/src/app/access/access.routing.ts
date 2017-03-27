import {NgModule}                from '@angular/core';
import {RouterModule, Routes}    from '@angular/router';
import {AccessComponent} from "./access.component";

const accessRoutes: Routes = [
    {
        path: '',
        component: AccessComponent
    },
];
@NgModule({
    imports: [
        RouterModule.forChild(accessRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AccessRoutingModule {

}

