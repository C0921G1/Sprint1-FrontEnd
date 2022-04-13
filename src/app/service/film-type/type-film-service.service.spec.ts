import { TestBed } from '@angular/core/testing';

import { TypeFilmServiceService } from './type-film-service.service';

describe('TypeFilmServiceService', () => {
  let service: TypeFilmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeFilmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
