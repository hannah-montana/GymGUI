import { TestBed } from '@angular/core/testing';

import { CurrentCustomerService } from './current-customer.service';

describe('CurrentCustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentCustomerService = TestBed.get(CurrentCustomerService);
    expect(service).toBeTruthy();
  });
});
