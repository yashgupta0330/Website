import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { LoaderService } from './shared/services/loader.service';

export interface Blog {
  title: string;
  summary: string;
  timeToRead: string;
  date: string;
  category: string;
  url: string;
  img: string;
  folder_id: string;         
  isTwoColumn?: boolean;    
  isFirstCard?: boolean;
  formattedDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  public blogsData$ = new BehaviorSubject<Blog[]>([]);
  public latestBlog$ = new BehaviorSubject<Blog | null>(null);
  private isLoaded = false;

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  public load(): void {
    if (this.isLoaded) {
      return;
    }
    this.isLoaded = true;
    // Loader handled by interceptor
    this.http.get<{ blogs: Blog[] }>('/assets/data/blogs/blogs.json').subscribe(
      (data) => {
        const blogs = data.blogs.map(blog => ({
          ...blog,
          formattedDate: this.getRelativeTime(blog.date)
        }));
        const sortedBlogs = blogs.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const latestBlog = sortedBlogs.find((blog) => blog.isFirstCard) || null;
        this.blogsData$.next(sortedBlogs);
        this.latestBlog$.next(latestBlog);
        // Loader handled by interceptor
      },
      (error) => {
        console.error('Error loading blogs:', error);
        this.isLoaded = false;
        // Loader handled by interceptor
      }
    );
  }

  public isDataLoaded(): boolean {
    return this.isLoaded;
  }

  private getRelativeTime(dateString: string): string {
    const blogDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - blogDate.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return blogDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).replace(',', '');
  }
}
