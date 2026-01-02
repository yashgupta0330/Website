import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { PortfolioService } from '../../portfolio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-design',
  templateUrl: './uiuxdesign.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit, OnDestroy {
  activeSection: string = '';

  uiux_cards = ['network', 'remit'];
  print_cards = ['chro', 'sort-design'];
  identity_cards = ['lmsbranding', 'finc-identity'];

  uiuxData: any[] = [];
  printData: any[] = [];
  identityData: any[] = [];

  private dataSub?: Subscription;

  constructor(public portfolioService: PortfolioService, private loaderService: LoaderService) {}

  ngOnInit(): void {
    // Loader handled by interceptor
    this.portfolioService.load();

    this.dataSub = this.portfolioService.cardsLoaded$.subscribe((loaded) => {
      if (loaded) {
        this.uiuxData = this.portfolioService.getCardsByIds(this.uiux_cards);
        this.printData = this.portfolioService.getCardsByIds(this.print_cards);
        this.identityData = this.portfolioService.getCardsByIds(
          this.identity_cards
        );
        // Loader handled by interceptor
      }
    });

    window.addEventListener('scroll', this.onScroll, true);
  }

  ngOnDestroy(): void {
    this.dataSub?.unsubscribe();
    window.removeEventListener('scroll', this.onScroll, true);
  }

  onScroll = (): void => {
    const sectionIds = ['uiux-design', 'print-design', 'identity-design'];
    for (let id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = id;
          break;
        }
      }
    }
  };

  trackById(index: number, card: any) {
    return card.id;
  }
}

// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { RouterModule, Router } from '@angular/router';

// // Default fallback card
// const defaultCard = {
//   id: 'default',
//   title: 'Coming Soon',
//   summary: 'Exciting project details will be available shortly.',
//   tags: ['Coming Soon'],
//   url: '/portfolio',
//   'bg-img': '/assets/img/Centr image.webp',
//   img: '/assets/img/Centr image.webp',
//   'detail-page': {
//     client: 'Confidential',
//     industry: 'Various',
//     region: 'Global',
//     platform: 'Multiple',
//     tags: ['Confidential']
//   }
// };

// @Component({
//   selector: 'app-design',
// templateUrl: './design.component.html',
// styleUrls: ['./design.component.scss']
// })
// export class DesignComponent implements OnInit, OnDestroy {
//   activeSection: string = '';

//   uiux_cards = ['finc', 'remit'];
//   print_cards = ['chro', 'sort-design'];
//   identity_cards = ['lms-branding', 'sort-identity'];

//   portfolioData: any[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.http.get<any>('/assets/data/portfolio/portfolio.json').subscribe((data) => {
//       this.portfolioData = data['case-studies'];
//     });

//     window.addEventListener('scroll', this.onScroll, true);
//   }

//   ngOnDestroy(): void {
//     window.removeEventListener('scroll', this.onScroll, true);
//   }

//   onScroll = (): void => {
//     const sectionIds = ['uiux-design', 'print-design', 'identity-design'];
//     for (let id of sectionIds) {
//       const el = document.getElementById(id);
//       if (el) {
//         const rect = el.getBoundingClientRect();
//         if (rect.top <= 100 && rect.bottom >= 100) {
//           this.activeSection = id;
//           break;
//         }
//       }
//     }
//   };

// getCardsByIds(ids: string[]): any[] {
//   // If Portfolio JSON is not available, pass the defult card.
//   if (!this.portfolioData || this.portfolioData.length === 0) {
//     return ids.map(() => defaultCard);
//   }

//   //Check for the card value in the Portfilo JSON.
//   return ids.map((id) => {
//     const [baseId] = id.split('-');
//     const baseCard = this.portfolioData.find((item) => item.id === baseId);
//     // If passed Id is not present in Portfolio JSON, then pass the Default card.
//     if (!baseCard) return defaultCard;

//     // Check for the variants w.r.t. page, if defined for the base card.
//     const variant = baseCard.variants?.[id];
//     //Override variants value in the base card if available.
//     const mergedCard = { ...baseCard, ...variant };

//     //Check for all the values needed to be painted in the browser are available in final card output, if not override the default card values
//     return this.ensureCompleteCard(mergedCard);
//   });
// }

// // Check for missing values in card and fill them with default card
// ensureCompleteCard(card: any): any {
//   const merged = { ...defaultCard, ...card };
//   merged.title = card.title?.trim() || defaultCard.title;
//   merged.summary = card.summary?.trim() || defaultCard.summary;
//   merged.url = card.url?.trim() || defaultCard.url;
//   merged['bg-img'] = card['bg-img']?.trim() || defaultCard['bg-img'];
//   merged.img = card.img?.trim() || defaultCard.img;
//   merged.tags = Array.isArray(card.tags) && card.tags.length > 0 ? card.tags : defaultCard.tags;

//   const detail = card['detail-page'] || {};
//   merged['detail-page'] = {
//     ...defaultCard['detail-page'],
//     client: detail.client?.trim() || defaultCard['detail-page'].client,
//     industry: detail.industry?.trim() || defaultCard['detail-page'].industry,
//     region: detail.region?.trim() || defaultCard['detail-page'].region,
//     platform: detail.platform?.trim() || defaultCard['detail-page'].platform,
//     tags: Array.isArray(detail.tags) && detail.tags.length > 0
//       ? detail.tags
//       : defaultCard['detail-page'].tags
//   };

//   return merged;
// }

//   trackById(index: number, card: any) {
//     return card.id;
//   }
// }
