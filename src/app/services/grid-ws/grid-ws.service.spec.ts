import { TestBed } from '@angular/core/testing';

import { GridWSService } from './grid-ws.service';

describe('GridWSService', () => {
  let service: GridWSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridWSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
