import { TestBed } from '@angular/core/testing';

import { AssociateServiceService } from './associate-service.service';

describe('AssociateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssociateServiceService = TestBed.get(AssociateServiceService);
    expect(service).toBeTruthy();
  });
});
