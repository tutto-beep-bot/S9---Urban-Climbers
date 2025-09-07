import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Auth } from '../../core/auth/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private auth: Auth) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator() });
  }

  async ngOnInit() {
    if (await this.auth.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { email, password } = this.registerForm.value;
    try {
      const { session } = await this.auth.signUp(email, password);

      if(session) {
        this.successMessage = 'Registration successful!';
        this.registerForm.reset();
        this.router.navigate(['/']);
        return;
      }
      await this.auth.signIn(email, password);
      this.router.navigate(['/']);
    } catch (error: any) {
        this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.isLoading = false;
    }
  } 

  private passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const pw = group.get('password')?.value;
      const cf = group.get('confirm')?.value;
      return pw && cf && pw !== cf ? { passwordsMismatch: true } : null;
    };
  }

  private getErrorMessage(err: any): string {
    const msg = (err?.message || '').toLowerCase();
    if (msg.includes('user already registered')) return 'This email is already registered.';
    if (msg.includes('invalid email')) return 'Invalid email address.';
    if (msg.includes('password should be at least') || msg.includes('minimum')) return 'Password must be at least 6 characters.';
    return 'Registration failed. Please try again.';
  }

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirm() { return this.registerForm.get('confirm'); }

}
