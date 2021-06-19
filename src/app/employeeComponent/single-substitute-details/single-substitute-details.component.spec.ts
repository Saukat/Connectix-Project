import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSubstituteDetailsComponent } from './single-substitute-details.component';

describe('SingleSubstituteDetailsComponent', () => {
  let component: SingleSubstituteDetailsComponent;
  let fixture: ComponentFixture<SingleSubstituteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSubstituteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSubstituteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
