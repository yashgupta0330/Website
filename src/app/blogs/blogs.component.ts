import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../shared/services/loader.service';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart, NavigationEnd, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { ScrollRestorationService } from '../scroll-restoration.service';
import { BlogsService } from '../blogs.service';

interface Blog {
  title: string;
  summary: string;
  timeToRead: string;
  date: string;
  category: string;
  url: string;
  img: string;
  isFirstCard?: boolean;
  formattedDate?: string;
}

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})

export class BlogsComponent implements OnInit, OnDestroy {
  blogs: Blog[] = [];
  latestBlog: Blog | null = null;
  isRestoringScroll: boolean = false;
  private routerSubscription?: Subscription;

  constructor(
    private blogsService: BlogsService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private titleService: Title,
    private metaService: Meta,
    private loaderService: LoaderService,
    private scrollRestoration: ScrollRestorationService
  ) {
    // Prevent Angular from scrolling to top
    this.router.events.pipe(
      filter(e => e instanceof Scroll)
    ).subscribe((e: any) => {
      if (e.routerEvent.url === '/blogs') {
        // Don't let Angular handle scroll restoration
        return;
      }
    });
  }

  getBlogListStyle(): { [key: string]: string } {
    // Estimate the min-height based on number of blog cards
    const cardHeight = 480; // px, estimate of one blog card including margin
    const cardsPerRow = window.innerWidth >= 1200 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
    const rows = Math.ceil(this.blogs.length / cardsPerRow) || 2; // fallback to 2 rows
    
    // Calculate min-height: ensure it's at least 60% of viewport or based on card rows
    const calculatedHeight = rows * cardHeight + 200; // 200px for heading and spacing
    const minHeight = Math.max(window.innerHeight * 0.6, calculatedHeight);
    
    return { minHeight: minHeight + 'px' };
  }


  ngOnInit(): void {
    const savedData = this.getSavedState();
    
    // Always start with content hidden to prevent flickering
    this.isRestoringScroll = true;
    
    this.setMetaTags();
    
    // Load blogs data from the service
    this.blogsService.load();
    
    // Subscribe to blogs data changes
    this.blogsService.blogsData$.subscribe((blogs) => {
      if (blogs && blogs.length > 0) {
        this.blogs = blogs;
        
        // Subscribe to latest blog
        this.blogsService.latestBlog$.subscribe((latestBlog) => {
          this.latestBlog = latestBlog;
        });
        
        // Handle scroll restoration or scroll to top
        if (savedData) {
          setTimeout(() => {
            requestAnimationFrame(() => {
              this.restoreScroll(savedData.scrollPosition);
              this.clearSavedState();
              this.isRestoringScroll = false;
            });
          }, 0);
        } else {
          // Scroll to top for fresh navigation
          setTimeout(() => {
            const scrollContainer = document.getElementById('scroll-container');
            if (scrollContainer) {
              scrollContainer.scrollTo({ top: 0, behavior: 'auto' });
            } else {
              window.scrollTo({ top: 0, behavior: 'auto' });
            }
            this.isRestoringScroll = false;
          }, 0);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  setMetaTags(): void {
    this.titleService.setTitle('Anarish Blogs');
    this.metaService.updateTag({
      name: 'description',
      content: 'Explore insightful blogs on software development...'
    });

    // Set OG and Twitter tags here...
  }

  navigateToBlog(url: string): void {
    // Save scroll position before navigating
    this.saveScrollPosition();
    this.router.navigateByUrl(`/blogs${url}`);
  }

  openLatestBlog(): void {
    if (this.latestBlog) {
      this.navigateToBlog(this.latestBlog.url);
    }
  }

  private getSavedState(): { scrollPosition: number } | null {
    const pos = sessionStorage.getItem('blogs_scroll');
    if (pos) {
      return { scrollPosition: parseInt(pos, 10) };
    }
    return null;
  }

  private clearSavedState(): void {
    sessionStorage.removeItem('blogs_scroll');
  }

  private restoreScroll(position: number): void {
    // Use requestAnimationFrame for smooth, reliable scroll restoration after DOM is painted
    const scrollContainer = document.getElementById('scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTop = position;
    } else {
      window.scrollTo({ top: position, behavior: 'auto' });
    }
  }

  saveScrollPosition(): void {
    // Get scroll position from the scroll-container div, not window
    const scrollContainer = document.getElementById('scroll-container');
    const position = scrollContainer ? scrollContainer.scrollTop : (window.pageYOffset || document.documentElement.scrollTop);
    sessionStorage.setItem('blogs_scroll', position.toString());
    // Also save to ScrollRestorationService
    this.scrollRestoration.saveScrollPosition('/blogs');
  }
}