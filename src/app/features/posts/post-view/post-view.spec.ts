import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { PostView } from './post-view';
import { SupabaseService } from '../../../core/supabase_service/supabase';

// Mock SupabaseService
class MockSupabaseService {
  async getPostById(id: number) { return null; }
}

// Mock ActivatedRoute
const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (key: string) => '1'
    }
  }
};

describe('PostView', () => {
  let component: PostView;
  let fixture: ComponentFixture<PostView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostView, RouterTestingModule],
      providers: [
        { provide: SupabaseService, useClass: MockSupabaseService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
