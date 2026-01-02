import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollRestorationService {
  private scrollPositions: Map<string, number> = new Map();
  private returnUrl: string | null = null;
  private targetCardId: string | null = null;

  constructor(private router: Router) {
    // Listen to navigation to detect when we're going to case study
    this.router.events.pipe(
      filter((event): event is NavigationStart => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      // If navigating to a portfolio case study, save current position
      if (event.url.startsWith('/portfolio/') && !this.returnUrl) {
        const currentUrl = this.router.url;
        this.returnUrl = currentUrl;
        this.saveScrollPosition(currentUrl);
      }
    });
  }

  /**
   * Save scroll position for a given URL
   */
  saveScrollPosition(url: string): void {
    const scrollContainer = document.getElementById('scroll-container');
    const position = scrollContainer 
      ? scrollContainer.scrollTop 
      : (window.pageYOffset || document.documentElement.scrollTop);
    
    this.scrollPositions.set(url, position);
    sessionStorage.setItem(`scroll_${url}`, position.toString());
  }

  /**
   * Restore scroll position for a given URL
   */
  restoreScrollPosition(url: string): void {
    let position = this.scrollPositions.get(url);
    
    // Try sessionStorage if not in memory
    if (position === undefined) {
      const saved = sessionStorage.getItem(`scroll_${url}`);
      if (saved) {
        position = parseInt(saved, 10);
      }
    }

    if (position !== undefined && position !== null) {
      setTimeout(() => {
        const scrollContainer = document.getElementById('scroll-container');
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: position, behavior: 'auto' });
        } else {
          window.scrollTo({ top: position, behavior: 'auto' });
        }
      }, 50);
    }
  }

  /**
   * Get the URL to return to after viewing a case study
   */
  getReturnUrl(): string | null {
    return this.returnUrl;
  }

  /**
   * Clear return URL after navigation
   */
  clearReturnUrl(): void {
    this.returnUrl = null;
  }

  /**
   * Save target card ID for portfolio scroll
   */
  setTargetCardId(cardId: string): void {
    this.targetCardId = cardId;
    sessionStorage.setItem('portfolio_target_card', cardId);
  }

  /**
   * Get target card ID for portfolio scroll
   */
  getTargetCardId(): string | null {
    if (this.targetCardId) {
      return this.targetCardId;
    }
    return sessionStorage.getItem('portfolio_target_card');
  }

  /**
   * Clear target card ID
   */
  clearTargetCardId(): void {
    this.targetCardId = null;
    sessionStorage.removeItem('portfolio_target_card');
  }

  /**
   * Clear all saved positions
   */
  clearAll(): void {
    this.scrollPositions.clear();
    this.targetCardId = null;
    // Clear from sessionStorage
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key?.startsWith('scroll_') || key === 'portfolio_target_card') {
        sessionStorage.removeItem(key);
      }
    }
  }
}
