import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleApprovalViewComponent } from './single-approval-view.component';

describe('SingleApprovalViewComponent', () => {
  let component: SingleApprovalViewComponent;
  let fixture: ComponentFixture<SingleApprovalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleApprovalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleApprovalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
