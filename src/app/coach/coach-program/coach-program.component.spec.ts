import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachProgramComponent } from './coach-program.component';

describe('CoachProgramComponent', () => {
  let component: CoachProgramComponent;
  let fixture: ComponentFixture<CoachProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
