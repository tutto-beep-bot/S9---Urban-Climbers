import { Injectable } from '@angular/core';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Post } from '../../features/posts/interface/post';
import { v4 as uuidv4 } from 'uuid';

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
  
  async uploadImage(file: File): Promise<string> {
    try {
      const { data: userData } = await this.client.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${userData.user.id}/${fileName}`;
      
      const { error } = await this.client.storage
        .from('post-images')
        .upload(filePath, file);
        
      if (error) throw error;
      
      const { data } = this.client.storage
        .from('post-images')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
  
  async createPost(post: Omit<Post, 'id' | 'created_at' | 'created_by'>, imageFile?: File): Promise<Post> {
    const { data: userData } = await this.client.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');
    
    let image_url = post.image_url;
    
    // Upload image if provided
    if (imageFile) {
      image_url = await this.uploadImage(imageFile);
    }
    
    const newPost = {
      ...post,
      image_url,
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
  
  async updatePost(id: number, post: Partial<Omit<Post, 'id' | 'created_at' | 'created_by'>>, imageFile?: File): Promise<Post> {
    // Verify user is authenticated
    const { data: userData } = await this.client.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');
    
    // First check if the post belongs to the current user
    const { data: existingPost, error: fetchError } = await this.client
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
      
    if (fetchError) throw fetchError;
    
    // Verify ownership - this is important for RLS policies
    if (existingPost.created_by !== userData.user.id) {
      throw new Error('You can only update your own posts');
    }
    
    let updatedPost = { ...post };
    
    // Upload image if provided
    if (imageFile) {
      const image_url = await this.uploadImage(imageFile);
      updatedPost = { ...updatedPost, image_url };
    }
    
    const { data, error } = await this.client
      .from('posts')
      .update(updatedPost)
      .eq('id', id)
      .eq('created_by', userData.user.id) // Add this to ensure RLS policy is satisfied
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
  
  async getUserPosts(): Promise<Post[]> {
    const { data: userData } = await this.client.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    const { data, error } = await this.client
      .from('posts')
      .select('*')
      .eq('created_by', userData.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async deletePost(id: number): Promise<void> {
    const { data: userData } = await this.client.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    const { data: post, error: fetchError } = await this.client
      .from('posts')
      .select('created_by')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (post.created_by !== userData.user.id) {
      throw new Error('You can only delete your own posts');
    }

    const { error } = await this.client
      .from('posts')
      .delete()
      .eq('id', id)
      .eq('created_by', userData.user.id);

    if (error) throw error;
  }

  get supabase() {
    return this.client;
  }
}
