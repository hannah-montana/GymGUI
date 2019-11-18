import { TestBed } from '@angular/core/testing';

import { CoachServiceService } from './coach-service.service';

describe('CoachServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoachServiceService = TestBed.get(CoachServiceService);
    expect(service).toBeTruthy();
  });
});
