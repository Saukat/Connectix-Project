import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementReportComponent } from './reimbursement-report.component';

describe('ReimbursementReportComponent', () => {
  let component: ReimbursementReportComponent;
  let fixture: ComponentFixture<ReimbursementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
