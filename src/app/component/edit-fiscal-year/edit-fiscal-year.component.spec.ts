import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFiscalYearComponent } from './edit-fiscal-year.component';

describe('EditFiscalYearComponent', () => {
  let component: EditFiscalYearComponent;
  let fixture: ComponentFixture<EditFiscalYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFiscalYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFiscalYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
