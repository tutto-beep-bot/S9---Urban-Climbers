import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../../../core/supabase_service/supabase';
import { Post } from '../interface/post';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss'
})
export class PostFeed implements OnInit {
  posts: Post[] = [];
  isLoading = false;
  errorMessage = '';
  
  constructor(private supabaseService: SupabaseService) {}
  
  async ngOnInit() {
    this.loadPosts();
  }
  
  async loadPosts() {
    try {
      this.isLoading = true;
      this.posts = await this.supabaseService.getPosts();
    } catch (error: any) {
      this.errorMessage = `Error loading posts: ${error.message}`;
      console.error('Error loading posts:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
