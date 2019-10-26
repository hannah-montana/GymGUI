import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachExerciseComponent } from './coach-exercise.component';

describe('CoachExerciseComponent', () => {
  let component: CoachExerciseComponent;
  let fixture: ComponentFixture<CoachExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
