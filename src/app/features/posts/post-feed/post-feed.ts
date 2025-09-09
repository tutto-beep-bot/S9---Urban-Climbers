import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SupabaseService } from '../../../core/supabase_service/supabase';
import { Post } from '../interface/post';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss'
})
export class PostFeed implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  isLoading = false;
  errorMessage = '';
  searchTerm = '';
  
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}
  
  async ngOnInit() {
    this.loadPosts();
  }
  
  async loadPosts() {
    try {
      this.isLoading = true;
      this.posts = await this.supabaseService.getPosts();
      this.filteredPosts = this.posts;
    } catch (error: any) {
      this.errorMessage = `Error loading posts: ${error.message}`;
      console.error('Error loading posts:', error);
    } finally {
      this.isLoading = false;
    }
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.filterPosts();
  }

  private filterPosts() {
    if (!this.searchTerm.trim()) {
      this.filteredPosts = this.posts;
    } else {
      this.filteredPosts = this.posts.filter(post => 
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase().trim())
      );
    }
  }

  viewPost(postId: number) {
    this.router.navigate(['/posts', postId], { queryParams: { returnUrl: '/' } });
  }
}
