import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProgramComponent } from './user-program.component';

describe('UserProgramComponent', () => {
  let component: UserProgramComponent;
  let fixture: ComponentFixture<UserProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
