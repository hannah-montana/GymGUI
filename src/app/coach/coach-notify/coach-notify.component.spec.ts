import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachNotifyComponent } from './coach-notify.component';

describe('CoachNotifyComponent', () => {
  let component: CoachNotifyComponent;
  let fixture: ComponentFixture<CoachNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
