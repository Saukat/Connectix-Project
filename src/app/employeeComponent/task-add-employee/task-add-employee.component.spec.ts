import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddEmployeeComponent } from './task-add-employee.component';

describe('TaskAddEmployeeComponent', () => {
  let component: TaskAddEmployeeComponent;
  let fixture: ComponentFixture<TaskAddEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAddEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
