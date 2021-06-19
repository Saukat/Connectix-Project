import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLeaveViewComponent } from './single-leave-view.component';

describe('SingleLeaveViewComponent', () => {
  let component: SingleLeaveViewComponent;
  let fixture: ComponentFixture<SingleLeaveViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleLeaveViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLeaveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
