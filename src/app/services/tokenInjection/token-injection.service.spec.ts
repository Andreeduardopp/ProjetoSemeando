import { TestBed } from '@angular/core/testing';

import { TokenInjectionService } from './token-injection.service';

describe('TokenInjectionService', () => {
  let service: TokenInjectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInjectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
