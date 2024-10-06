import { TestBed } from '@angular/core/testing';

import { FormErrorHandlingService } from './form-error-handling.service';

describe('FormErrorHandlingService', () => {
  let service: FormErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
