import { TestBed } from '@angular/core/testing';

import { MapQuestAPIService } from './map-quest-api.service';

describe('MapQuestAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapQuestAPIService = TestBed.get(MapQuestAPIService);
    expect(service).toBeTruthy();
  });
});
