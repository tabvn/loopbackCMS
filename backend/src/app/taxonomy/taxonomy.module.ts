import {NgModule} from '@angular/core';
import {VocabularyComponent} from './vocabulary/vocabulary.component';
import {TaxonomyRoutingModule} from "./taxonomy.routing";
import {SharedModule} from "../shared/shared.module";
import {VocabularyFormComponent} from './vocabulary-form/vocabulary-form.component';
import {TaxonomyTermsComponent} from './taxonomy-terms/taxonomy-terms.component';
import { TaxonomyFormComponent } from './taxonomy-form/taxonomy-form.component';

@NgModule({
    imports: [
        SharedModule.forRoot(),
        TaxonomyRoutingModule
    ],
    declarations: [
        VocabularyComponent,
        VocabularyFormComponent,
        TaxonomyTermsComponent,
        TaxonomyFormComponent
    ],
    entryComponents: [VocabularyFormComponent,TaxonomyFormComponent]
})
export class TaxonomyModule {
}
