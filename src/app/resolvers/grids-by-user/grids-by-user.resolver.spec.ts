import { TestBed } from '@angular/core/testing';

import { GridsByUserResolver } from './grids-by-user.resolver';

describe('GridsByUserResolver', () => {
  let resolver: GridsByUserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GridsByUserResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
