import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEmpResponseComponent } from './task-emp-response.component';

describe('TaskEmpResponseComponent', () => {
  let component: TaskEmpResponseComponent;
  let fixture: ComponentFixture<TaskEmpResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskEmpResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEmpResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
