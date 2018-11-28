import { TestBed } from '@angular/core/testing';

import { AppTitleServiceService } from './app-title-service.service';

describe('AppTitleServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppTitleServiceService = TestBed.get(AppTitleServiceService);
    expect(service).toBeTruthy();
  });
});
