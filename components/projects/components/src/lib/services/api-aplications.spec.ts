import { TestBed } from '@angular/core/testing';
import ApiApplications from './api-applications';

describe('ApiApplications', () => {
  let service: ApiApplications;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiApplications);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
