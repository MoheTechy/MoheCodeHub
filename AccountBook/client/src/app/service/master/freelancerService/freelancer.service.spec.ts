import { TestBed } from '@angular/core/testing';

import { FreelancerService } from './freelancer.service';

describe('FreelancerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FreelancerService = TestBed.get(FreelancerService);
    expect(service).toBeTruthy();
  });
});
