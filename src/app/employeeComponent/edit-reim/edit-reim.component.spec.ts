import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReimComponent } from './edit-reim.component';

describe('EditReimComponent', () => {
  let component: EditReimComponent;
  let fixture: ComponentFixture<EditReimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
