import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { PortfolioService } from '../portfolio.service';
import { Subscription } from 'rxjs';
import { ScrollRestorationService } from '../scroll-restoration.service';

@Component({
  selector: 'app-app-design',
  templateUrl: './app-design.component.html',
  styleUrls: ['./app-design.component.scss']
})
export class AppDesignComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('heroVideo') heroVideoRef!: ElementRef<HTMLVideoElement>;

  logos = [
    'assets/img/main/logos/Mobilise.webp',
    'assets/img/main/logos/Genpact.webp',
    'assets/img/main/logos/Path.webp',
    'assets/img/main/logos/Iotfy.webp',
    'assets/img/main/logos/Rentickle.webp',
    'assets/img/main/logos/Functionaspps.webp',
    'assets/img/main/logos/Compro Technologies.webp'
  ];

  work_cards = ['crms-app', 'fresh-plate'];
  workData: any[] = [];

  faqs: { question: string; answer: string | string[] }[] = [];

  private dataSub?: Subscription;

  constructor(public portfolioService: PortfolioService, private scrollRestoration: ScrollRestorationService) {}

  ngOnInit(): void {
    this.portfolioService.load();

    this.dataSub = this.portfolioService.cardsLoaded$.subscribe((loaded) => {
      if (loaded) {
        this.workData = this.portfolioService.getCardsByIds(this.work_cards);
        this.tryScrollToCardFromSession();
      }
    });

    this.loadFaqs();
  }

  private tryScrollToCardFromSession(): void {
    // Only run if coming back from a case study
    const nav = sessionStorage.getItem('solution_case_study_nav');
    if (!nav) return;
    let cardId: string | undefined;
    try {
      const { cardId: cid, source } = JSON.parse(nav);
      if (source === '/solutions/app-design') {
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
    this.scrollRestoration.saveScrollPosition('/solutions/app-design');
    // Save navigation context for solution-aware back navigation
    sessionStorage.setItem(
      'solution_case_study_nav',
      JSON.stringify({ source: '/solutions/app-design', cardId })
    );
    // Optionally, also save the card ID for legacy scroll logic
    this.scrollRestoration.setTargetCardId(cardId);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.heroVideoRef?.nativeElement.play().catch((err) => {
        console.warn('Autoplay blocked:', err);
      });
    }, 0);
  }

  ngOnDestroy(): void {
    this.dataSub?.unsubscribe();
  }

  loadFaqs(): void {
    const faqFilePath = '/assets/data/solutions/app-design.json';
    fetch(faqFilePath)
      .then(res => res.json())
      .then(data => this.faqs = data.faqs || [])
      .catch(() => this.faqs = []);
  }

  isArray(val: any): val is string[] {
    return Array.isArray(val);
  }

  getAnswers(val: string[] | string): string[] {
    return Array.isArray(val) ? val : [val];
  }

  safeFormatAnswer(text: string | string[]): string {
    return Array.isArray(text) ? text.join('<br>') : text;
  }

  trackById(index: number, card: any) {
    return card.id;
  }
}
