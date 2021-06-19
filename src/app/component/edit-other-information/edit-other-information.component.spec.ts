import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOtherInformationComponent } from './edit-other-information.component';

describe('EditOtherInformationComponent', () => {
  let component: EditOtherInformationComponent;
  let fixture: ComponentFixture<EditOtherInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOtherInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOtherInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
