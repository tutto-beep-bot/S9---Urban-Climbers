import { SearchPipe } from './search.pipe';
import { Post } from '../../features/posts/interface/post';

describe('SearchPipe', () => {
  let pipe: SearchPipe;
  let mockPosts: Post[];

  beforeEach(() => {
    pipe = new SearchPipe();
    mockPosts = [
      { id: 1, title: 'Mountain Climbing Route', description: 'Great route', funrating: 5, image_url: '', maps_url: '', created_by: '1', created_at: '' },
      { id: 2, title: 'Urban Wall Challenge', description: 'City climbing', funrating: 4, image_url: '', maps_url: '', created_by: '1', created_at: '' },
      { id: 3, title: 'Rock Face Adventure', description: 'Outdoor climbing', funrating: 3, image_url: '', maps_url: '', created_by: '1', created_at: '' }
    ];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all posts when search term is empty', () => {
    const result = pipe.transform(mockPosts, '');
    expect(result).toEqual(mockPosts);
  });

  it('should filter posts by title starting with search term', () => {
    const result = pipe.transform(mockPosts, 'Mountain');
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Mountain Climbing Route');
  });

  it('should be case insensitive', () => {
    const result = pipe.transform(mockPosts, 'urban');
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Urban Wall Challenge');
  });

  it('should return empty array when no matches found', () => {
    const result = pipe.transform(mockPosts, 'Nonexistent');
    expect(result.length).toBe(0);
  });

  it('should handle null or undefined posts', () => {
    expect(pipe.transform(null as any, 'test')).toBeNull();
    expect(pipe.transform(undefined as any, 'test')).toBeUndefined();
  });
});