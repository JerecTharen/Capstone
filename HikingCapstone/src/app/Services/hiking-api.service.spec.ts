import { TestBed } from '@angular/core/testing';

import { HikingAPIService } from './hiking-api.service';

describe('HikingAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HikingAPIService = TestBed.get(HikingAPIService);
    expect(service).toBeTruthy();
  });
});
