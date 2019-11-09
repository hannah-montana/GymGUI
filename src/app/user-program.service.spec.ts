import { TestBed } from '@angular/core/testing';

import { UserProgramService } from './user-program.service';

describe('UserProgramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProgramService = TestBed.get(UserProgramService);
    expect(service).toBeTruthy();
  });
});
