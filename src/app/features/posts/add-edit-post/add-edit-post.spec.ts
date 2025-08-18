import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPost } from './add-edit-post';

describe('AddEditPost', () => {
  let component: AddEditPost;
  let fixture: ComponentFixture<AddEditPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
