import { LoaderService } from '../../shared/services/loader.service';






import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import { PortfolioService } from '../../portfolio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss'],
})
export class StrategyComponent implements OnInit, OnDestroy, AfterViewInit {
  activeSection: string = '';

  // Card ID arrays for each section
  brand_cards = ['sort', 'autonativeai'];
  ux_cards = ['hrms-strategy', 'fms'];
  audit_cards = ['eazy-Recruitz', 'path-strategy'];

  brandData: any[] = [];
  uxData: any[] = [];
  auditData: any[] = [];

  private dataSub?: Subscription;

  @ViewChildren('portfolioVideo') portfolioVideos!: QueryList<
    ElementRef<HTMLVideoElement>
  >;

  constructor(public portfolioService: PortfolioService, private renderer: Renderer2, private loaderService: LoaderService) {}

  ngOnInit(): void {
    // Loader handled by interceptor
    this.portfolioService.load();

    this.dataSub = this.portfolioService.cardsLoaded$.subscribe((loaded) => {
      if (loaded) {
        this.brandData = this.portfolioService.getCardsByIds(this.brand_cards);
        this.uxData = this.portfolioService.getCardsByIds(this.ux_cards);
        this.auditData = this.portfolioService.getCardsByIds(this.audit_cards);
        // Loader handled by interceptor
      }
    });

    window.addEventListener('scroll', this.onScroll, true);
    this.addSchema();
  }
  addSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Anarish | Top UX Strategy Provider for Enterprises",
      "url": "https://www.anarish.com/services/ux-strategy-services",
      "telephone": "+91-9899844180",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sector 31",
        "addressLocality": "Faridabad",
        "addressRegion": "Haryana",
        "postalCode": "121003",
        "addressCountry": "IN"
      },
      "description": "Discover UX strategy services that align user needs with business goals. Drive engagement, growth, and ROI with research-driven experience design.",
      "areaServed": {
        "@type": "Place",
        "name": "India"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Brand & UX Strategy Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "UX Strategy Consulting",
              "serviceType": "UX Strategy Consulting Services",
              "description": "Discover UX strategy services that align user needs with business goals. Drive engagement, growth, and ROI with research-driven experience design."
            },
            "availability": "https://schema.org/InStock",
            "url": "https://www.anarish.com/services/ux-strategy-services"
          }
        ]
      }
    };

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.renderer.appendChild(document.head, script);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.playAllVideos();
    }, 0);
  }

  ngOnDestroy(): void {
    this.dataSub?.unsubscribe();
    window.removeEventListener('scroll', this.onScroll, true);
  }

  onScroll = (): void => {
    const sectionIds = ['brand-strategy', 'ux-strategy', 'uiux-audit'];
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

  playAllVideos(): void {
    this.portfolioVideos?.forEach((videoRef) => {
      const video = videoRef.nativeElement;
      if (video) {
        video.play().catch((err) => {
          console.warn('Autoplay failed', err);
        });
      }
    });
  }
}
