import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../core/supabase_service/supabase';
import { Post } from '../interface/post';

@Component({
  selector: 'app-post-view',
  imports: [CommonModule, RouterModule],
  templateUrl: './post-view.html',
  styleUrl: './post-view.scss'
})
export class PostView implements OnInit {
  post: Post | null = null;
  isLoading = false;
  errorMessage = '';
  returnUrl = '/';

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    if (id) {
      await this.loadPost(parseInt(id));
    }
  }

  async loadPost(id: number) {
    try {
      this.isLoading = true;
      this.post = await this.supabaseService.getPostById(id);
    } catch (error: any) {
      this.errorMessage = `Error loading post: ${error.message}`;
    } finally {
      this.isLoading = false;
    }
  }
}
