import { TestBed } from '@angular/core/testing';

import { GymnastService } from './gymnast.service';

describe('GymnastService', () => {
  let service: GymnastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymnastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
