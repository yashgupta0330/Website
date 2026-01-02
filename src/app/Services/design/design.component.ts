import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { PortfolioService } from '../../portfolio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit, OnDestroy {
    faqs = [
      {
        question: 'How long does it take to design a website?',
        answer: 'The timeline depends on the project scope, but most websites take 2-6 weeks from initial discussion to final delivery.',
        open: false
      },
      {
        question: 'Do I need to provide all the content?',
        answer: 'We can work with your content or help you develop it. We recommend providing as much as possible for best results.',
        open: false
      },
      {
        question: 'Will my website work on mobile?',
        answer: 'Absolutely! All our designs are fully responsive and optimized for mobile devices.',
        open: false
      },
      {
        question: 'Can you update my existing website?',
        answer: 'Yes, we can redesign or refresh your current website to improve its look, feel, and performance.',
        open: false
      },
      {
        question: 'Do you also develop the website or just design?',
        answer: 'We offer both design and development services, so we can take your project from concept to launch.',
        open: false
      },
      {
        question: 'What happens after the website goes live?',
        answer: 'We provide support, updates, and can help with ongoing improvements or maintenance as needed.',
        open: false
      }
    ];
  activeSection: string = '';

  uiux_cards = ['network', 'remit'];
  print_cards = ['chro', 'sort-design'];
  identity_cards = ['lmsbranding', 'finc-identity'];

  uiuxData: any[] = [];
  printData: any[] = [];
  identityData: any[] = [];

  private dataSub?: Subscription;

  constructor(public portfolioService: PortfolioService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.portfolioService.load();

    this.dataSub = this.portfolioService.cardsLoaded$.subscribe((loaded) => {
      if (loaded) {
        this.uiuxData = this.portfolioService.getCardsByIds(this.uiux_cards);
        this.printData = this.portfolioService.getCardsByIds(this.print_cards);
        this.identityData = this.portfolioService.getCardsByIds(
          this.identity_cards
        );
      }
    });

    window.addEventListener('scroll', this.onScroll, true);
    this.addSchema();
  }
  addSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Anarish - UI UX Design Agency",
      "image": "https://www.anarish.com/path-to-your-image.jpg",
      "@id": "https://www.anarish.com/services/design#uiux-design",
      "url": "https://www.anarish.com/services/design#uiux-design",
      "telephone": "+91-9899844180",
      "priceRange": "$$",
      "description": "Top UI UX design agency crafting intuitive, engaging digital experiences. We blend strategy, aesthetics, and technology to deliver results.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sector 3",
        "addressLocality": "Faridabad",
        "addressRegion": "Haryana",
        "postalCode": "121004",
        "addressCountry": {
          "@type": "Country",
          "name": "IN"
        }
      },
      "areaServed": {
        "@type": "Place",
        "name": "India"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "UI UX Design Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "UI UX Design",
              "serviceType": "UI UX Design Services",
              "description": "Top UI UX design agency crafting intuitive, engaging digital experiences. We blend strategy, aesthetics, and technology to deliver results.",
              "provider": {
                "@type": "Organization",
                "name": "Anarish"
              }
            },
            "availability": "http://schema.org/InStock",
            "url": "https://www.anarish.com/services/design#uiux-design"
          }
        ]
      }
    };

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.renderer.appendChild(document.head, script);
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

  onLearnMoreClick(route: string, event?: Event) {
    if (event) {
      console.log('Learn more clicked:', route);
    }
  }
}

