import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private apiUrl = 'http://codingbites.in/blog/wp-json/wp/v2';

  constructor(private http: HttpClient) {}

  getPage(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pages/${id}`);
  }

  getPost(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories?parent=0&_fields=name,id,slug`);
  }

  getPostsByCategorySlug(slug: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories/?slug=${slug}`);
  }

  getCategoryID(slug: string){
    return this.http.get<any[]>(`${this.apiUrl}/categories?slug=${slug}&_fields=name,id,slug`);
  }

  getPostsByCategoryID(slugId: number){
    return this.http.get<any[]>(`${this.apiUrl}/posts?categories=${slugId}&_fields=id,title`);
  }

  getCombinedData(id: number | string) {
      // Define the API calls
      const postsRequest = this.http.get<any[]>(`${this.apiUrl}/posts?categories=${id}&_fields=id,title,categories`);
      const categoriesRequest = this.http.get<any[]>(`${this.apiUrl}/categories?_fields=name,id&parent=${id}`);
  
      // Use forkJoin to wait for both API calls to complete
    return forkJoin({ posts: postsRequest, categories: categoriesRequest }).pipe(
      map((response) => {
        const posts = response.posts;
        const categories = response.categories;

        // Initialize an array to hold the final structured data
        const structuredData: any[] = [];

        // Helper function to find or create a parent category object
        const findOrCreateParent = (categoryId: any) => {
          let parent = structuredData.find(item => item.id === categoryId);
          if (!parent) {
            const categoryInfo = categories.find(category => category.id === categoryId);
            parent = { id: categoryId, name: categoryInfo ? categoryInfo.name : '', children: [] };
            structuredData.push(parent);
          }
          return parent;
        };

        // Iterate through the posts to structure the data
        posts.forEach((post) => {
          // Exclude posts that only belong to the parent category (id: 3)
          if (post.categories.length === 1 && post.categories[0] === id) {
            structuredData.push({
              id: post.id,
              title: post.title,
              categories: post.categories,
            });
          } else {
            // For other posts, find or create the parent category object and add the post to its children array
            post.categories.forEach((categoryId: any) => {
              if (categoryId !== id) {
                const parent = findOrCreateParent(categoryId);
                parent.children.push(post);
              }
            });
          }
        });

        return structuredData;
      })
    );
    }
}
