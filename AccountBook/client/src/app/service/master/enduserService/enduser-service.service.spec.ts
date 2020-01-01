import { TestBed } from '@angular/core/testing';

import { EnduserServiceService } from './enduser-service.service';

describe('EnduserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnduserServiceService = TestBed.get(EnduserServiceService);
    expect(service).toBeTruthy();
  });
});
