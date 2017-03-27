import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTaxonomyComponent } from './form-taxonomy.component';

describe('FormTaxonomyComponent', () => {
  let component: FormTaxonomyComponent;
  let fixture: ComponentFixture<FormTaxonomyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTaxonomyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTaxonomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
