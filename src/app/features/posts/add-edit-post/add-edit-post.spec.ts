import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddEditPost } from './add-edit-post';
import { SupabaseService } from '../../../core/supabase_service/supabase';

class MockSupabaseService {
  async getPostById(id: number) { return null; }
  async createPost(post: any) { return { id: 1 }; }
  async updatePost(id: number, post: any) { return true; }
}

class MockToastrService {
  success(message: string, title?: string) { }
  error(message: string, title?: string) { }
  info(message: string, title?: string) { }
  warning(message: string, title?: string) { }
}

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (key: string) => null
    }
  }
};

describe('AddEditPost', () => {
  let component: AddEditPost;
  let fixture: ComponentFixture<AddEditPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPost, RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: SupabaseService, useClass: MockSupabaseService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ToastrService, useClass: MockToastrService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required validators', () => {
    expect(component.postForm).toBeDefined();
    expect(component.postForm.get('title')?.hasError('required')).toBeTruthy();
    expect(component.postForm.get('description')?.hasError('required')).toBeTruthy();
    expect(component.postForm.get('maps_url')?.hasError('required')).toBeTruthy();
    expect(component.postForm.get('funrating')?.value).toBe(1);
  });

  it('should validate fun rating range (1-5)', () => {
    const funratingControl = component.postForm.get('funrating');
    
    funratingControl?.setValue(0);
    expect(funratingControl?.hasError('min')).toBeTruthy();
    
    funratingControl?.setValue(6);
    expect(funratingControl?.hasError('max')).toBeTruthy();
    
    funratingControl?.setValue(3);
    expect(funratingControl?.hasError('min')).toBeFalsy();
    expect(funratingControl?.hasError('max')).toBeFalsy();
  });

  it('should be in create mode by default', () => {
    expect(component.isEditing).toBeFalsy();
    expect(component.postId).toBeUndefined();
  });

  it('should validate complete form submission', () => {
    expect(component.postForm.invalid).toBeTruthy();
    
    component.postForm.patchValue({
      title: 'Test Climbing Route',
      description: 'A challenging route with great views',
      funrating: 4,
      maps_url: 'https://maps.google.com/test'
    });
    
    expect(component.postForm.valid).toBeTruthy();
  });
});
