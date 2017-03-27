import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomyTermsComponent } from './taxonomy-terms.component';

describe('TaxonomyTermsComponent', () => {
  let component: TaxonomyTermsComponent;
  let fixture: ComponentFixture<TaxonomyTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonomyTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonomyTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
