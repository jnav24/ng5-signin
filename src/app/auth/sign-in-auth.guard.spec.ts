import { TestBed, async, inject } from '@angular/core/testing';

import { SignInAuthGuard } from './sign-in-auth.guard';

describe('SignInAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignInAuthGuard]
    });
  });

  it('should ...', inject([SignInAuthGuard], (guard: SignInAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
