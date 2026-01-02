import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../shared/services/loader.service';
import { NgZone } from '@angular/core';
import { PortfolioService } from '../portfolio.service';
import { Router, NavigationStart, NavigationEnd, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ScrollRestorationService } from '../scroll-restoration.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit, OnDestroy {
  visibleCaseStudies: any[] = [];
  isLoading: boolean = false;
  isRestoringScroll: boolean = false;
  private previousItemCount: number = 0;
  private routerSubscription?: Subscription;

  constructor(
    private portfolioService: PortfolioService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private scrollRestoration: ScrollRestorationService,
    private loaderService: LoaderService,
    private ngZone: NgZone
  ) {
    // Prevent Angular from scrolling to top
    this.router.events.pipe(
      filter(e => e instanceof Scroll)
    ).subscribe((e: any) => {
      if (e.routerEvent.url === '/portfolio') {
        // Don't let Angular handle scroll restoration
        return;
      }
    });
  }
  getWorkSectionStyle(): { [key: string]: string } {
    // Estimate the min-height based on number of cards per page and card height
    // Adjust cardHeight and cardsPerRow as per your design
    const cardHeight = 450; // px, estimate of one card including margin
    const cardsPerRow = window.innerWidth >= 1200 ? 2 : 1;
    
    // Calculate current rows from visible cards
    const currentRows = Math.ceil(this.visibleCaseStudies.length / cardsPerRow) || 2;
    
    // When loading, add extra rows to prevent footer from jumping
    const extraRowsForLoader = this.isLoading ? 3 : 0;
    const totalRows = currentRows + extraRowsForLoader;
    
    // Calculate min-height: ensure it's at least 80% of viewport or based on card rows
    const calculatedHeight = totalRows * cardHeight + 200; // 200px for padding/margins/button
    const minHeight = Math.max(window.innerHeight * 0.8, calculatedHeight);
    
    return { minHeight: minHeight + 'px' };
  }
  ngOnInit(): void {
    const savedData = this.getSavedState();
    
    // Always start with content hidden to prevent flickering
    this.isRestoringScroll = true;
    
    // Load portfolio data from the service
    this.portfolioService.load();

    // Subscribe to portfolio data changes
    this.portfolioService.portfolioData$.subscribe((cards) => {
      if (cards && cards.length > 0) {
        const newItemCount = cards.length;
        const isLoadingMore = newItemCount > this.previousItemCount && this.previousItemCount > 0;
        
        this.visibleCaseStudies = this.portfolioService.getCardsByIds(cards.map(c => c.id));
        this.previousItemCount = newItemCount;
        
        // Restore items if needed
        if (savedData && cards.length < savedData.itemCount) {
          const pagesToLoad = Math.ceil((savedData.itemCount - cards.length) / 6);
          for (let i = 0; i < pagesToLoad; i++) {
            if (this.portfolioService.hasMorePages()) {
              setTimeout(() => this.portfolioService.loadNextPage(), 50 * i);
            }
          }
        } else if (savedData && cards.length >= savedData.itemCount) {
          // All items loaded, restore scroll position
          setTimeout(() => {
            requestAnimationFrame(() => {
              this.restoreScroll(savedData.scrollPosition);
              this.clearSavedState();
              this.isRestoringScroll = false;
            });
          }, 0);
        } else if (!isLoadingMore) {
          // Only scroll to top on initial load, not when loading more items
          this.ngZone.runOutsideAngular(() => {
            requestAnimationFrame(() => {
              const scrollContainer = document.getElementById('scroll-container');
              if (scrollContainer) {
                scrollContainer.scrollTo({ top: 0, behavior: 'auto' });
              } else {
                window.scrollTo({ top: 0, behavior: 'auto' });
              }
              // Run change detection to update UI immediately
              this.ngZone.run(() => {
                this.isRestoringScroll = false;
              });
            });
          });
        } else {
          // Loading more items - don't scroll, just update visibility
          this.isRestoringScroll = false;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private getSavedState(): { scrollPosition: number; itemCount: number } | null {
    const pos = sessionStorage.getItem('portfolio_scroll');
    const count = sessionStorage.getItem('portfolio_items');
    if (pos && count) {
      return { scrollPosition: parseInt(pos, 10), itemCount: parseInt(count, 10) };
    }
    return null;
  }

  private clearSavedState(): void {
    sessionStorage.removeItem('portfolio_scroll');
    sessionStorage.removeItem('portfolio_items');
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
    const itemCount = this.visibleCaseStudies.length;
    sessionStorage.setItem('portfolio_scroll', position.toString());
    sessionStorage.setItem('portfolio_items', itemCount.toString());
    // Also save to ScrollRestorationService
    this.scrollRestoration.saveScrollPosition('/portfolio');
  }

  onViewMore(): void {
    if (this.portfolioService.hasMorePages() && !this.isLoading) {
      this.isLoading = true;
      // Loader handled by interceptor
      this.portfolioService.loadNextPage();
      // portfolioData$ subscription will automatically update visibleCaseStudies
      setTimeout(() => {
        this.isLoading = false;
        // Loader handled by interceptor
      }, 100);
    }
  }

  hasMore(): boolean {
    return this.portfolioService.hasMorePages();
  }


}










// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-portfolio',
//   templateUrl: './portfolio.component.html',
//   styleUrls: ['./portfolio.component.scss'],
// })
// export class PortfolioComponent implements OnInit {
//   caseStudies: any[] = [];
//   visibleCaseStudies: any[] = [];
//   currentIndex: number = 0;
//   pageSize: number = 8;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.http
//       .get<any>('/assets/data/portfolio/portfolio.json')
//       .subscribe((data) => {
//         this.caseStudies = data['case-studies'];
//         this.loadMore(); // Load initial 8 cards
//       });
//   }

//   loadMore(): void {
//     const nextIndex = this.currentIndex + this.pageSize;
//     this.visibleCaseStudies = [
//       ...this.visibleCaseStudies,
//       ...this.caseStudies.slice(this.currentIndex, nextIndex),
//     ];
//     this.currentIndex = nextIndex;
//   }

//   hasMore(): boolean {
//     return this.currentIndex < this.caseStudies.length;
//   }
// }
