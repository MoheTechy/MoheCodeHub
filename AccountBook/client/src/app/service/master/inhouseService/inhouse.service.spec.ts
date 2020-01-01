import { TestBed } from '@angular/core/testing';

import { InhouseService } from './inhouse.service';

describe('InhouseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InhouseService = TestBed.get(InhouseService);
    expect(service).toBeTruthy();
  });
});
