import { TestBed } from '@angular/core/testing';

import { RoService } from './ro.service';

describe('RoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoService = TestBed.get(RoService);
    expect(service).toBeTruthy();
  });
});
