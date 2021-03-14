import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthDashboardComponent } from './fourth-dashboard.component';

describe('FourthDashboardComponent', () => {
  let component: FourthDashboardComponent;
  let fixture: ComponentFixture<FourthDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourthDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourthDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
