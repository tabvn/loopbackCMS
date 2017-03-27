import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyFormComponent } from './vocabulary-form.component';

describe('VocabularyFormComponent', () => {
  let component: VocabularyFormComponent;
  let fixture: ComponentFixture<VocabularyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
