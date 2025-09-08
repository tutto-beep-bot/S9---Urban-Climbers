import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { Register } from './register';
import { Auth } from '../../core/auth/auth';

// Mock services
class MockAuth {
  async isAuthenticated() { return false; }
  async signUp(email: string, password: string) { return Promise.resolve({ session: null }); }
  async signIn(email: string, password: string) { return Promise.resolve(); }
}

class MockRouter {
  navigate(path: any[]) { return Promise.resolve(true); }
}

class MockToastrService {
  success(message: string, title?: string) { }
  error(message: string, title?: string) { }
  info(message: string, title?: string) { }
  warning(message: string, title?: string) { }
}

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: Auth, useClass: MockAuth },
        { provide: ToastrService, useClass: MockToastrService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 3: Password confirmation validation
  it('should validate that password and confirm password match', () => {
    // Set different passwords using patchValue to trigger all validators
    component.registerForm.patchValue({
      email: 'test@example.com',
      password: 'password123',
      confirm: 'different123'
    });
    
    // Check that form has passwordsMismatch error
    expect(component.registerForm.hasError('passwordsMismatch')).toBeTruthy();
    expect(component.registerForm.invalid).toBeTruthy();
    
    // Set matching passwords
    component.registerForm.patchValue({
      email: 'test@example.com',
      password: 'password123',
      confirm: 'password123'
    });
    
    // Check that passwordsMismatch error is gone
    expect(component.registerForm.hasError('passwordsMismatch')).toBeFalsy();
  });

  // TEST 4: Complete form validation
  it('should be valid when all fields are correctly filled', () => {
    // Fill all fields correctly
    component.registerForm.patchValue({
      email: 'test@example.com',
      password: 'password123',
      confirm: 'password123'
    });
    
    // Form should be valid
    expect(component.registerForm.valid).toBeTruthy();
    expect(component.registerForm.hasError('passwordsMismatch')).toBeFalsy();
  });
});
