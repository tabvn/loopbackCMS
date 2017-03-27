import {NgModule}                from '@angular/core';
import {RouterModule, Routes}    from '@angular/router';
import {AuthGuard} from "../shared/auth.guard";
import {VocabularyComponent} from "./vocabulary/vocabulary.component";
import {TaxonomyTermsComponent} from "./taxonomy-terms/taxonomy-terms.component";

const taxonomyRoutes: Routes = [
    {
        path: '',
        component: VocabularyComponent,
        canActivate: [AuthGuard],

    },
    {
        path: 'terms/:vid',
        component: TaxonomyTermsComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(taxonomyRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TaxonomyRoutingModule {

}

