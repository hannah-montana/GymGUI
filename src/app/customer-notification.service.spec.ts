import { TestBed } from '@angular/core/testing';

import { CustomerNotificationService } from './customer-notification.service';

describe('CustomerNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerNotificationService = TestBed.get(CustomerNotificationService);
    expect(service).toBeTruthy();
  });
});
