import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachNavComponent } from './coach-nav.component';

describe('CoachNavComponent', () => {
  let component: CoachNavComponent;
  let fixture: ComponentFixture<CoachNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
