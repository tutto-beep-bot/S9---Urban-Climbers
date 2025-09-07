import { Injectable } from '@angular/core';
import { Post } from '../../features/posts/interface/post';
import { SupabaseService } from '../supabase_service/supabase';
import { SupabaseClient, User, Session, createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { ReplaySubject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey,
    { auth: { persistSession: true, autoRefreshToken: true } }
  );
  private userSubject = new BehaviorSubject<User | null>(null);
	user$ = this.userSubject.asObservable();
	private _isAuthResolved = new ReplaySubject<boolean>(1);
  isAuthResolved$ = this._isAuthResolved.asObservable();
  
  constructor(private supa: SupabaseService) {
    this.initializeAuthState();
  }
  
  private async initializeAuthState() {
    try {
      const { data } = await this.supa.db.auth.getSession();
      if (data.session) {
        const { data: userData } = await this.supa.db.auth.getUser();
        this.userSubject.next(userData.user);
      } else {
        this.userSubject.next(null);
      }
      this._isAuthResolved.next(true);
    } catch (error) {
      console.error('Error initializing auth state:', error);
      this.userSubject.next(null);
      this._isAuthResolved.next(true);
    }
  }

  async signUp(email: string, password: string): Promise<{ user: User | null; session: Session | null }> {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
    
    if (data.user) {
      this.userSubject.next(data.user);
    }
    
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supa.db.auth.signInWithPassword({ email, password });
    if (error) throw error;
    this.userSubject.next(data.user);
    return data.user;
  }

  async signOut() {
    const { error } = await this.supa.db.auth.signOut();
    if (error) throw error;
    this.userSubject.next(null);
  }

  async isAuthenticated(): Promise<boolean> {
    const { data } = await this.supa.db.auth.getSession();
    return !!data.session;
  }

  async getUser() {
    const { data, error } = await this.supa.db.auth.getUser();
    if (error) return null;
    return data.user ?? null;
  }


}
