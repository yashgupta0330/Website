import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScrollRestorationService } from '../scroll-restoration.service';

const defaultCard = {
  id: 'default',
  title: 'Coming Soon',
  summary: 'Exciting project details will be available shortly.',
  tags: ['Coming Soon'],
  url: '/portfolio',
  'bg-img': '/assets/img/Centr image.webp',
  img: '/assets/img/Centr image.webp',
  'detail-page': {
    client: 'Confidential',
    industry: 'Various',
    region: 'Global',
    platform: 'Multiple',
    tags: ['Confidential']
  }
};

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent implements OnInit {
  logos = [
    'assets/img/main/logos/Mobilise.webp',
    'assets/img/main/logos/Genpact.webp',
    'assets/img/main/logos/Path.webp',
    'assets/img/main/logos/Iotfy.webp',
    'assets/img/main/logos/Rentickle.webp',
    'assets/img/main/logos/Functionaspps.webp',
    'assets/img/main/logos/Compro Technologies.webp'
  ];

  work_cards = ['crms', 'hrms'];
  portfolioData: any[] = [];

  faqs: { question: string; answer: string | string[] }[] = [];

  constructor(private http: HttpClient, private scrollRestoration: ScrollRestorationService) {}

  ngOnInit(): void {
    this.loadPortfolio();
    this.loadFaqs();
    this.tryScrollToCardFromSession();
  }

  private tryScrollToCardFromSession(): void {
    // Only run if coming back from a case study
    const nav = sessionStorage.getItem('solution_case_study_nav');
    if (!nav) return;
    let cardId: string | undefined;
    try {
      const { cardId: cid, source } = JSON.parse(nav);
      if (source === '/solutions/branding') {
        cardId = cid;
      }
    } catch {}
    if (!cardId) return;
    // Remove nav context so it doesn't repeat
    sessionStorage.removeItem('solution_case_study_nav');
    // Poll for the card element as soon as possible
    let tries = 0;
    const maxTries = 20;
    const scrollToCard = () => {
      const el = document.querySelector(`[data-card-id="${cardId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'center' });
      } else if (++tries < maxTries) {
        setTimeout(scrollToCard, 30);
      }
    };
    scrollToCard();
  }

  onCaseStudyClick(cardId: string): void {
    // Save scroll position (optional, for restoration)
    this.scrollRestoration.saveScrollPosition('/solutions/branding');
    // Save navigation context for solution-aware back navigation
    sessionStorage.setItem(
      'solution_case_study_nav',
      JSON.stringify({ source: '/solutions/branding', cardId })
    );
    // Optionally, also save the card ID for legacy scroll logic
    this.scrollRestoration.setTargetCardId(cardId);
  }

  loadPortfolio(): void {
    this.http.get<any>('/assets/data/portfolio/portfolio.json').subscribe((data) => {
      this.portfolioData = data['case-studies'];
    });
  }

  loadFaqs(): void {
    const faqFilePath = '/assets/data/solutions/branding.json';
    this.http.get<{ faqs: { question: string; answer: string | string[] }[] }>(faqFilePath).subscribe(
      (data) => (this.faqs = data.faqs),
      () => (this.faqs = [])
    );
  }

  isArray(val: any): val is string[] {
    return Array.isArray(val);
  }

  getAnswers(val: string[] | string): string[] {
    return Array.isArray(val) ? val : [val];
  }

  formatAnswer(text: string): string {
    return text;
  }

  safeFormatAnswer(text: string | string[]): string {
    return Array.isArray(text) ? text.join('<br>') : text;
  }

  getCardsByIds(ids: string[]): any[] {
    if (!this.portfolioData || this.portfolioData.length === 0) {
      return ids.map(() => defaultCard);
    }

    return ids.map((id) => {
      const found = this.portfolioData.find((item) => item.id === id);
      return found ? this.ensureCompleteCard(found) : defaultCard;
    });
  }

  ensureCompleteCard(card: any): any {
    const merged = { ...defaultCard, ...card };

    merged.title = card.title?.trim() || defaultCard.title;
    merged.summary = card.summary?.trim() || defaultCard.summary;
    merged.url = card.url?.trim() || defaultCard.url;
    merged['bg-img'] = card['bg-img']?.trim() || defaultCard['bg-img'];
    merged.img = card.img?.trim() || defaultCard.img;
    merged.tags = Array.isArray(card.tags) && card.tags.length > 0 ? card.tags : defaultCard.tags;

    const detail = card['detail-page'] || {};
    merged['detail-page'] = {
      ...defaultCard['detail-page'],
      client: detail.client?.trim() || defaultCard['detail-page'].client,
      industry: detail.industry?.trim() || defaultCard['detail-page'].industry,
      region: detail.region?.trim() || defaultCard['detail-page'].region,
      platform: detail.platform?.trim() || defaultCard['detail-page'].platform,
      tags: Array.isArray(detail.tags) && detail.tags.length > 0
        ? detail.tags
        : defaultCard['detail-page'].tags
    };

    return merged;
  }

  trackById(index: number, card: any) {
    return card.id;
  }
}
