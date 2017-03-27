import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeOptionComponent } from './tree-option.component';

describe('TreeOptionComponent', () => {
  let component: TreeOptionComponent;
  let fixture: ComponentFixture<TreeOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
