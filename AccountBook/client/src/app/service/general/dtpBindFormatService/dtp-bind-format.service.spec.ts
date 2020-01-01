import { TestBed } from '@angular/core/testing';

import { DtpBindFormatService } from './dtp-bind-format.service';

describe('DtpBindFormatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DtpBindFormatService = TestBed.get(DtpBindFormatService);
    expect(service).toBeTruthy();
  });
});
