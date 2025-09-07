import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../core/supabase_service/supabase';
import { Post } from '../interface/post';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './add-edit-post.html',
  styleUrl: './add-edit-post.scss'
})
export class AddEditPost implements OnInit {
  postForm: FormGroup;
  isEditing = false;
  postId?: number;
  isLoading = false;
  errorMessage = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      funrating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      image_url: [''],
      maps_url: ['', [Validators.required]]
    });
  }
  
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.postId = parseInt(id, 10);
      this.loadPost(this.postId);
    }
  }
  
  async loadPost(id: number) {
    try {
      this.isLoading = true;
      const post = await this.supabaseService.getPostById(id);
      this.postForm.patchValue({
        title: post.title,
        description: post.description,
        funrating: post.funrating,
        image_url: post.image_url,
        maps_url: post.maps_url
      });
    } catch (error: any) {
      this.errorMessage = `Error loading post: ${error.message}`;
    } finally {
      this.isLoading = false;
    }
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
  async onSubmit() {
    if (this.postForm.invalid) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      const formValues = this.postForm.value;
      
      if (this.isEditing && this.postId) {
        await this.supabaseService.updatePost(this.postId, formValues, this.selectedFile || undefined);
        this.toastr.success('Post updated successfully!', 'Success');
      } else {
        await this.supabaseService.createPost(formValues, this.selectedFile || undefined);
        this.toastr.success('Post created successfully!', 'Success');
        this.postForm.reset();
        this.selectedFile = null;
        this.imagePreview = null;
      }

      this.router.navigate(['/home']);
      
      
    } catch (error: any) {
      this.errorMessage = `Error: ${error.message}`;
    } finally {
      this.isLoading = false;
    }
  }
  
  get title() { return this.postForm.get('title'); }
  get description() { return this.postForm.get('description'); }
  get funrating() { return this.postForm.get('funrating'); }
  get image_url() { return this.postForm.get('image_url'); }
  get maps_url() { return this.postForm.get('maps_url'); }
}
