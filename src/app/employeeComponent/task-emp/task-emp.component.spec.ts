import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEmpComponent } from './task-emp.component';

describe('TaskEmpComponent', () => {
  let component: TaskEmpComponent;
  let fixture: ComponentFixture<TaskEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
