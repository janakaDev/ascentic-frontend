import { TestBed } from '@angular/core/testing';

import { ClothsDataSourceService } from './cloths-data-source.service';

describe('ClothsDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClothsDataSourceService = TestBed.get(ClothsDataSourceService);
    expect(service).toBeTruthy();
  });
});
