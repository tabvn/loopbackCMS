import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomyFormComponent } from './taxonomy-form.component';

describe('TaxonomyFormComponent', () => {
  let component: TaxonomyFormComponent;
  let fixture: ComponentFixture<TaxonomyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonomyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonomyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
