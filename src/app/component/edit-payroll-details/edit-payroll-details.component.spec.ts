import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayrollDetailsComponent } from './edit-payroll-details.component';

describe('EditPayrollDetailsComponent', () => {
  let component: EditPayrollDetailsComponent;
  let fixture: ComponentFixture<EditPayrollDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPayrollDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPayrollDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
