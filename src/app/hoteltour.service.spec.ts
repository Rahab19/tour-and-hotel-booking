import { TestBed } from '@angular/core/testing';

import { HoteltourService } from './hoteltour.service';

describe('HoteltourService', () => {
  let service: HoteltourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoteltourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
