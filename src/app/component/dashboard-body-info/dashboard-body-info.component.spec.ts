import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBodyInfoComponent } from './dashboard-body-info.component';

describe('DashboardBodyInfoComponent', () => {
  let component: DashboardBodyInfoComponent;
  let fixture: ComponentFixture<DashboardBodyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBodyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBodyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
