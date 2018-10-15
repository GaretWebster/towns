import { TestBed } from '@angular/core/testing';

import { GooglePlacesServiceService } from './google-places-service.service';

describe('GooglePlacesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GooglePlacesServiceService = TestBed.get(GooglePlacesServiceService);
    expect(service).toBeTruthy();
  });
});
