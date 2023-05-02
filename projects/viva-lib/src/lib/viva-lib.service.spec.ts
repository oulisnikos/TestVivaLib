import { TestBed } from '@angular/core/testing';

import { VivaLibService } from './viva-lib.service';

describe('VivaLibService', () => {
  let service: VivaLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VivaLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
