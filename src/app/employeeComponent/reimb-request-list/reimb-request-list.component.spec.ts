import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbRequestListComponent } from './reimb-request-list.component';

describe('ReimbRequestListComponent', () => {
  let component: ReimbRequestListComponent;
  let fixture: ComponentFixture<ReimbRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
