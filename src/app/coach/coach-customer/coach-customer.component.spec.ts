import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachCustomerComponent } from './coach-customer.component';

describe('CoachCustomerComponent', () => {
  let component: CoachCustomerComponent;
  let fixture: ComponentFixture<CoachCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
