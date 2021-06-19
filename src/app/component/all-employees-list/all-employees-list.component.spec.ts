import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmployeesListComponent } from './all-employees-list.component';

describe('AllEmployeesListComponent', () => {
  let component: AllEmployeesListComponent;
  let fixture: ComponentFixture<AllEmployeesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEmployeesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
