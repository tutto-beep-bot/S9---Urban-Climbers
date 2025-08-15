import { Injectable } from '@angular/core';
import { Post } from '../../features/posts/interface/post';
import { SupabaseService } from '../supabase_service/supabase';
import { SupabaseClient, User, Session, createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey,
    { auth: { persistSession: true, autoRefreshToken: true } }
  );
  constructor(private supa: SupabaseService) {}

  async signUp(email: string, password: string): Promise<{ user: User | null; session: Session | null }> {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supa.db.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  }

  async signOut() {
    const { error } = await this.supa.db.auth.signOut();
    if (error) throw error;
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
