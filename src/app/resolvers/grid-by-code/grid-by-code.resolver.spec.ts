import { TestBed } from '@angular/core/testing';

import { GridByCodeResolver } from './grid-by-code.resolver';

describe('GridByCodeResolver', () => {
  let resolver: GridByCodeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GridByCodeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
