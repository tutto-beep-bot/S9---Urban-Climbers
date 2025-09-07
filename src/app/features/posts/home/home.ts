import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../core/supabase_service/supabase';
import { Post } from '../interface/post';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  userPosts: Post[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadUserPosts();
  }

  async loadUserPosts() {
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      this.userPosts = await this.supabaseService.getUserPosts();
    } catch (error) {
      console.error('Error loading user posts:', error);
      this.errorMessage = 'Failed to load your posts. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  editPost(postId: number): void {
    this.router.navigate(['/posts', postId, 'edit']);
  }

  async deletePost(postId: number, postTitle: string): Promise<void> {
    const confirmed = confirm(
      `Are you sure you want to delete "${postTitle}"?\n\nThis action cannot be undone.`
    );
    
    if (!confirmed) {
      return;
    }

    try {
      this.isLoading = true;
      this.errorMessage = '';
      
      await this.supabaseService.deletePost(postId);
      
      this.userPosts = this.userPosts.filter(post => post.id !== postId);
      
      console.log(`Post "${postTitle}" deleted successfully`);

      this.toastr.success(`Deleted successfully`, 'Success');
      
    } catch (error) {
      console.error('Error deleting post:', error);
      this.errorMessage = 'Failed to delete post. Please try again.';
      
      this.loadUserPosts();
    } finally {
      this.isLoading = false;
    }
  }
}
