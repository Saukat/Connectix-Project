import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalaryStructureComponent } from './edit-salary-structure.component';

describe('EditSalaryStructureComponent', () => {
  let component: EditSalaryStructureComponent;
  let fixture: ComponentFixture<EditSalaryStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalaryStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalaryStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
