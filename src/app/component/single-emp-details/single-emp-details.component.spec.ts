import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEmpDetailsComponent } from './single-emp-details.component';

describe('SingleEmpDetailsComponent', () => {
  let component: SingleEmpDetailsComponent;
  let fixture: ComponentFixture<SingleEmpDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleEmpDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEmpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
