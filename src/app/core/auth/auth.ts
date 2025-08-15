import { Injectable } from '@angular/core';
import { Post } from '../../features/posts/interface/post';
import { SupabaseService } from '../supabase_service/supabase';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  constructor(private supa: SupabaseService) {}

  async signUp(email: string, password: string) {
    const { data, error } = await this.supa.db.auth.signUp({ email, password });
    if (error) throw error;
    return data.user;
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
