import { Injectable } from '@angular/core';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Post } from '../../features/posts/interface/post';

@Injectable({
  providedIn: 'root'
})

export class SupabaseService {
  private client: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey
  );

  get db() {
    return this.client;
  }

  async getPosts(): Promise<Post[]> {
		const { data, error } = await this.client
			.from('posts')
			.select('*');
		console.log('Supabase posts:', data, error);
		if (error) throw error;
		return data;
  	}

  get supabase() {
    return this.client;
  }
}
