import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollAllDetailsComponent } from './payroll-all-details.component';

describe('PayrollAllDetailsComponent', () => {
  let component: PayrollAllDetailsComponent;
  let fixture: ComponentFixture<PayrollAllDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollAllDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollAllDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
