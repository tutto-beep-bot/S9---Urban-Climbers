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
  
  async createPost(post: Omit<Post, 'id' | 'created_at' | 'created_by'>): Promise<Post> {
    const { data: userData } = await this.client.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');
    
    const newPost = {
      ...post,
      created_by: userData.user.id
    };
    
    const { data, error } = await this.client
      .from('posts')
      .insert(newPost)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
  
  async getPostById(id: number): Promise<Post> {
    const { data, error } = await this.client
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  }
  
  async updatePost(id: number, post: Partial<Omit<Post, 'id' | 'created_at' | 'created_by'>>): Promise<Post> {
    const { data, error } = await this.client
      .from('posts')
      .update(post)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
  
  async deletePost(id: number): Promise<void> {
    const { error } = await this.client
      .from('posts')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }

  get supabase() {
    return this.client;
  }
}
