import { TestBed, inject } from '@angular/core/testing';

import { AwsApiService } from './aws-api.service';

describe('AwsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwsApiService]
    });
  });

  it('should be created', inject([AwsApiService], (service: AwsApiService) => {
    expect(service).toBeTruthy();
  }));
});
