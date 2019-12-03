import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachMapComponent } from './coach-map.component';

describe('CoachMapComponent', () => {
  let component: CoachMapComponent;
  let fixture: ComponentFixture<CoachMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
