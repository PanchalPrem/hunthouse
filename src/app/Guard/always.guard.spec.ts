import { TestBed } from '@angular/core/testing';

import { AlwaysGuard } from './always.guard';

describe('AlwaysGuard', () => {
  let guard: AlwaysGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlwaysGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
