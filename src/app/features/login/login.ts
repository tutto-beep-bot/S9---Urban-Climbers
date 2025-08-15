import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../core/supabase_service/supabase';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  msg: string | null = null;
  err: string | null = null;
  userEmail: string | null = null;

  constructor(private supa: SupabaseService) {
    this.refreshUser();
  }

  async refreshUser() {
    const user = await this.supa.getUser();
    this.userEmail = user?.email || null;
  }

  async login() {
    this.loading = true;
    this.msg = null;
    this.err = null;

    try {
      await this.supa.signIn(this.email, this.password);
      this.msg = 'Login successful!';
      await this.refreshUser();
    } catch (e: any) {
      this.err = e?.message ?? String(e);
    } finally {
      this.loading = false;
    }
  }

  async register() {
    this.loading = true;
    this.msg = null;
    this.err = null;

    try {
      await this.supa.signUp(this.email, this.password);
      this.msg = 'Registration successful!';
    } catch (e: any) {
      this.err = e?.message ?? String(e);
    } finally {
      this.loading = false;
    }
  }

  async logout() {
    this.loading = true;
    this.msg = null;
    this.err = null;

    try {
      await this.supa.signOut();
      this.msg = 'Logout successful!'
    } catch (e: any) {
      this.err = e?.message ?? String(e);
    } finally {
      await this.refreshUser();
      this.loading = false;
    }
  }
}
