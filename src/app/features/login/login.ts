import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../core/auth/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(private AuthService: Auth, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async ngOnInit() {
    if (await this.AuthService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    try {
      await this.AuthService.signIn(email, password);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.isLoading = false;
    }
  }

  private getErrorMessage(err: any): string {
    const msg = (err?.message || '').toLowerCase();
    if (msg.includes('invalid login credentials')) return 'Incorrect email or password.';
    return 'Login failed. Please try again.';
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }




  // async refreshUser() {
  //   const user = await this.supa.getUser();
  //   this.userEmail = user?.email || null;
  // }

  // async login() {
  //   this.loading = true;
  //   this.msg = null;
  //   this.err = null;

  //   try {
  //     await this.supa.signIn(this.email, this.password);
  //     this.msg = 'Login successful!';
  //     await this.refreshUser();
  //   } catch (e: any) {
  //     this.err = e?.message ?? String(e);
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  // async register() {
  //   this.loading = true;
  //   this.msg = null;
  //   this.err = null;

  //   try {
  //     await this.supa.signUp(this.email, this.password);
  //     this.msg = 'Registration successful!';
  //   } catch (e: any) {
  //     this.err = e?.message ?? String(e);
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  // async logout() {
  //   this.loading = true;
  //   this.msg = null;
  //   this.err = null;

  //   try {
  //     await this.supa.signOut();
  //     this.msg = 'Logout successful!'
  //   } catch (e: any) {
  //     this.err = e?.message ?? String(e);
  //   } finally {
  //     await this.refreshUser();
  //     this.loading = false;
  //   }
  // }
}
