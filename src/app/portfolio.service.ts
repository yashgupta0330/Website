import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoaderService } from './shared/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  public portfolioData$ = new BehaviorSubject<any[]>([]);
  private allPortfolioData: any[] = []; // Store all data
  private isLoaded = false;
  private loaded$ = new BehaviorSubject<boolean>(false);
  private currentPage = 0;
  private pageSize = 6;
  private totalItems = 0;

  private defaultCard = {
    "id": 'default',
    "title": 'Coming Soon',
    "summary": 'Exciting project details will be available shortly.',
    "tags": ['Coming Soon'],
    "url": '/portfolio',
    "bg-img": '/assets/img/Centr image.webp',
    "img": '/assets/img/Centr image.webp',
    "detail-page": {
      client: 'Confidential',
      industry: 'Various',
      region: 'Global',
      platform: 'Multiple',
      tags: ['Confidential']
    }
  };

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  public load(): void {
    if (this.isLoaded) return;
    // Loader handled by interceptor
    this.http.get<any>('/assets/data/portfolio/portfolio.json').subscribe({
      next: (data) => {
        this.allPortfolioData = data['case-studies'] || [];
        // If display_order is provided, sort by it (ascending). Missing values go to the end.
        this.allPortfolioData.sort((a: any, b: any) => {
          const aOrder = (typeof a.display_order === 'number') ? a.display_order : Number.MAX_SAFE_INTEGER;
          const bOrder = (typeof b.display_order === 'number') ? b.display_order : Number.MAX_SAFE_INTEGER;
          return aOrder - bOrder;
        });
        this.totalItems = this.allPortfolioData.length;
        this.isLoaded = true;
        this.loaded$.next(true);
        // Load first page automatically
        this.loadPage(0);
        // Loader handled by interceptor
      },
      error: (err) => {
        this.isLoaded = false;
        // Loader handled by interceptor
      }
    });
  }

  public loadPage(page: number): any[] {
    const startIndex = page * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const pageData = this.allPortfolioData.slice(startIndex, endIndex);
    
    this.currentPage = page;
    
    // Append to existing data
    const currentData = this.portfolioData$.getValue();
    const newData = [...currentData, ...pageData];
    this.portfolioData$.next(newData);
    
    return pageData;
  }

  public loadNextPage(): any[] {
    return this.loadPage(this.currentPage + 1);
  }

  public hasMorePages(): boolean {
    return (this.currentPage + 1) * this.pageSize < this.totalItems;
  }

  public getCurrentLoadedCount(): number {
    return this.portfolioData$.getValue().length;
  }

  public getTotalCount(): number {
    return this.totalItems;
  }

  public getAllCardIds(): string[] {
    return this.portfolioData$.getValue().map(card => card.id);
  }

  public getAllPortfolioData(): any[] {
    return this.allPortfolioData;
  }


  // public getCardsByIds(ids: string[]): any[] {
  //   const data = this.portfolioData$.getValue();

  //   if (!data || data.length === 0) {
  //     return ids.map(() => this.defaultCard);
  //   }

  //   return ids.map(id => {
  //     const [baseId] = id.split('-');
  //     const baseCard = data.find(item => item.id === baseId);
  //     if (!baseCard) return this.defaultCard;

  //     const variant = baseCard.variants?.[id];
  //     const merged = { ...baseCard, ...variant };

  //     return this.ensureCompleteCard(merged);
  //   });
  // }

  public getCardsByIds(ids: string[]): any[] {
  const data = this.portfolioData$.getValue();

  if (!data || data.length === 0) {
    return ids.map(() => this.defaultCard);
  }

  return ids.map(id => {
    // 1. Try to find card directly by full ID
    const fullMatch = data.find(item => item.id === id);
    if (fullMatch) {
      return this.ensureCompleteCard(fullMatch);
    }

    // 2. If not found, fallback to base ID (variant logic)
    const [baseId] = id.split('-');
    const baseCard = data.find(item => item.id === baseId);

    if (!baseCard) return this.defaultCard;

const variant = baseCard['page-variants']?.[id];
    const merged = { ...baseCard, ...variant };

    return this.ensureCompleteCard(merged);
  });
}

  private ensureCompleteCard(card: any): any {
    const merged = { ...this.defaultCard, ...card };

    merged.title = card.title?.trim() || this.defaultCard.title;
    merged.summary = card.summary?.trim() || this.defaultCard.summary;
    merged.url = card.url?.trim() || this.defaultCard.url;
    merged['bg-img'] = card['bg-img']?.trim() || this.defaultCard['bg-img'];
    merged.img = card.img?.trim() || this.defaultCard.img;
    merged.tags = Array.isArray(card.tags) && card.tags.length > 0 ? card.tags : this.defaultCard.tags;

    const detail = card['detail-page'] || {};
    merged['detail-page'] = {
      ...this.defaultCard['detail-page'],
      client: detail.client?.trim() || this.defaultCard['detail-page'].client,
      industry: detail.industry?.trim() || this.defaultCard['detail-page'].industry,
      region: detail.region?.trim() || this.defaultCard['detail-page'].region,
      platform: detail.platform?.trim() || this.defaultCard['detail-page'].platform,
      tags: Array.isArray(detail.tags) && detail.tags.length > 0 ? detail.tags : this.defaultCard['detail-page'].tags
    };

    return merged;
  }

  public get cardsLoaded$(): Observable<boolean> {
    return this.loaded$.asObservable();
  }
  

  public hasLoaded(): boolean {
    return this.isLoaded;
  }
}
