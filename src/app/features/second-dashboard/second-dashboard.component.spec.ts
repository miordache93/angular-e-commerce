import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondDashboardComponent } from './second-dashboard.component';

describe('SecondDashboardComponent', () => {
  let component: SecondDashboardComponent;
  let fixture: ComponentFixture<SecondDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
