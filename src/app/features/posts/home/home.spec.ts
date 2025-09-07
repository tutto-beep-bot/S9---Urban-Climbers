import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Home } from './home';
import { SupabaseService } from '../../../core/supabase_service/supabase';

// Mock SupabaseService
class MockSupabaseService {
  async getUserPosts() { return []; }
  async deletePost(id: string) { return true; }
}

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, RouterTestingModule],
      providers: [
        { provide: SupabaseService, useClass: MockSupabaseService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
