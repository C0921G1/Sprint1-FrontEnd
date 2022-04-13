import { TestBed } from '@angular/core/testing';

import { LoadCssServiceService } from './load-css-service.service';

describe('LoadCssServiceService', () => {
  let service: LoadCssServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadCssServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
