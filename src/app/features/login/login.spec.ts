import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { Login } from './login';
import { Auth } from '../../core/auth/auth';

// Mock services
class MockAuth {
  async isAuthenticated() { return false; }
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

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: Auth, useClass: MockAuth },
        { provide: ToastrService, useClass: MockToastrService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 1: Email validation
  it('should show email validation errors for invalid email formats', () => {
    const emailControl = component.loginForm.get('email');
    
    // Test empty email
    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBeTruthy();
    
    // Test invalid email format
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();
    
    // Test valid email
    emailControl?.setValue('test@example.com');
    expect(emailControl?.hasError('email')).toBeFalsy();
    expect(emailControl?.hasError('required')).toBeFalsy();
  });

  // TEST 2: Password validation
  it('should require minimum 6 characters for password', () => {
    const passwordControl = component.loginForm.get('password');
    
    // Test empty password
    passwordControl?.setValue('');
    expect(passwordControl?.hasError('required')).toBeTruthy();
    
    // Test short password
    passwordControl?.setValue('12345');
    expect(passwordControl?.hasError('minlength')).toBeTruthy();
    
    // Test valid password
    passwordControl?.setValue('123456');
    expect(passwordControl?.hasError('minlength')).toBeFalsy();
    expect(passwordControl?.hasError('required')).toBeFalsy();
  });
});
