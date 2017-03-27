import {NgModule}                from '@angular/core';
import {RouterModule, Routes}    from '@angular/router';
import {AuthGuard} from "../shared/auth.guard";
import {NodesComponent} from "./nodes/nodes.component";

const NodeRoutes: Routes = [
    {
        path: '',
        component: NodesComponent,
        canActivate: [AuthGuard],

    }
];

@NgModule({
    imports: [
        RouterModule.forChild(NodeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class NodeRoutingModule {

}

