import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../../features/posts/interface/post';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], searchTerm: string): Post[] {
    if (!posts || !searchTerm) {
      return posts;
    }

    const term = searchTerm.toLowerCase().trim();
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(term)
    );
  }
}