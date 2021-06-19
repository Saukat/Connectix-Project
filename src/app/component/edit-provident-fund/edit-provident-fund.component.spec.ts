import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProvidentFundComponent } from './edit-provident-fund.component';

describe('EditProvidentFundComponent', () => {
  let component: EditProvidentFundComponent;
  let fixture: ComponentFixture<EditProvidentFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProvidentFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProvidentFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
