import { TestBed } from '@angular/core/testing';

import { HappyKartFormService } from './happy-kart-form.service';

describe('HappyKartFormService', () => {
  let service: HappyKartFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HappyKartFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
