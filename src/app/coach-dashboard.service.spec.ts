import { TestBed } from '@angular/core/testing';

import { CoachDashboardService } from './coach-dashboard.service';

describe('CoachDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoachDashboardService = TestBed.get(CoachDashboardService);
    expect(service).toBeTruthy();
  });
});
