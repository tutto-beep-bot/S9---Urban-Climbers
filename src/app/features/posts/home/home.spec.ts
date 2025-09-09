import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { Home } from './home';
import { SupabaseService } from '../../../core/supabase_service/supabase';

// Mock SupabaseService
class MockSupabaseService {
  async getUserPosts() { return []; }
  async deletePost(id: string) { return true; }
}

class MockToastrService {
  success(message: string, title?: string) { }
  error(message: string, title?: string) { }
  info(message: string, title?: string) { }
  warning(message: string, title?: string) { }
}

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, RouterTestingModule],
      providers: [
        { provide: SupabaseService, useClass: MockSupabaseService },
        { provide: ToastrService, useClass: MockToastrService }
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
