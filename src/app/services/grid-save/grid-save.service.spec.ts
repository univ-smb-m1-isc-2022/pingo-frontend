import { TestBed } from '@angular/core/testing';

import { GridSaveService } from './grid-save.service';

describe('GridSaveService', () => {
  let service: GridSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
