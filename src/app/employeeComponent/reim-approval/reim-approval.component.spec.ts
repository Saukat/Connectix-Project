import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimApprovalComponent } from './reim-approval.component';

describe('ReimApprovalComponent', () => {
  let component: ReimApprovalComponent;
  let fixture: ComponentFixture<ReimApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
