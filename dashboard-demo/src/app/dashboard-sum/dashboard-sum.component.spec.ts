import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSumComponent } from './dashboard-sum.component';

describe('DashboardSumComponent', () => {
  let component: DashboardSumComponent;
  let fixture: ComponentFixture<DashboardSumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
