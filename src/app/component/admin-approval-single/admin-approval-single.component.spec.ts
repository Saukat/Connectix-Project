import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApprovalSingleComponent } from './admin-approval-single.component';

describe('AdminApprovalSingleComponent', () => {
  let component: AdminApprovalSingleComponent;
  let fixture: ComponentFixture<AdminApprovalSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApprovalSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApprovalSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
