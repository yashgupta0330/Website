import { Component, OnInit, Renderer2 } from '@angular/core';
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
  selector: 'app-saas',
  templateUrl: './saas.component.html',
  styleUrls: ['./saas.component.scss']
})
export class SaaSComponent implements OnInit {
  logos = [
    'assets/img/main/logos/Mobilise.webp',
    'assets/img/main/logos/Path.webp',
    'assets/img/main/logos/Iotfy.webp',
    'assets/img/main/logos/Rentickle.webp',
    'assets/img/main/logos/Functionaspps.webp',
  ];

  work_cards = ['crms', 'hrms'];
  portfolioData: any[] = [];

  // ✅ FAQs array
  faqs: { question: string; answer: string | string[] }[] = [];

  constructor(private http: HttpClient, private renderer: Renderer2, private scrollRestoration: ScrollRestorationService) {}


  ngOnInit(): void {
    this.loadPortfolio();
    this.loadFaqs();
    this.addSchema();
    // Restore scroll if returning from case study
    this.tryScrollToCardFromSession();
  }

  private tryScrollToCardFromSession(): void {
    // Only run if coming back from a case study
    const nav = sessionStorage.getItem('solution_case_study_nav');
    if (!nav) return;
    let cardId: string | undefined;
    try {
      const { cardId: cid, source } = JSON.parse(nav);
      if (source === '/solutions/saas-design') {
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
    this.scrollRestoration.saveScrollPosition('/solutions/saas-design');
    // Save navigation context for solution-aware back navigation
    sessionStorage.setItem(
      'solution_case_study_nav',
      JSON.stringify({ source: '/solutions/saas-design', cardId })
    );
    // Optionally, also save the card ID for legacy scroll logic
    this.scrollRestoration.setTargetCardId(cardId);
  }
  addSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "SaaS Design Services",
      "description": "We provide expert SaaS design services for B2B businesses, creating user-friendly, scalable, and engaging SaaS platforms that improve adoption and reduce churn.",
      "url": "https://www.yourwebsite.com/services/saas-design",
      "areaServed": {
        "@type": "Country",
        "name": "India"
      },
      "provider": {
        "@type": "Organization",
        "name": "Anarish",
        "url": "https://www.anarish.com/"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.anarish.com/solutions/saas-design-service"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "SaaS Design Solutions",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "UI/UX Design for SaaS Platforms",
              "description": "End-to-end UI/UX design for SaaS platforms tailored for B2B users."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SaaS Product Design Consulting",
              "description": "Consulting services to optimize your SaaS product design for adoption and retention."
            }
          }
        ]
      },
      "mainEntity": [
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is SaaS design?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "SaaS design focuses on creating user-friendly and scalable interfaces for software-as-a-service products. It ensures your platform is easy to use, visually appealing, and drives user adoption."
              }
            },
            {
              "@type": "Question",
              "name": "Why is SaaS design important for B2B businesses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For B2B businesses, a well-designed SaaS product improves usability, reduces churn, and increases customer satisfaction, leading to better long-term retention and growth."
              }
            },
            {
              "@type": "Question",
              "name": "Do you provide custom SaaS product design services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we specialize in designing SaaS platforms tailored to your business needs, ensuring that the user experience aligns with your target audience and industry requirements."
              }
            },
            {
              "@type": "Question",
              "name": "How do you approach SaaS design projects?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We start with user research, define clear user flows, design intuitive interfaces, and validate them through usability testing to ensure the SaaS platform meets user expectations."
              }
            },
            {
              "@type": "Question",
              "name": "Can SaaS design improve user adoption?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, a well-structured SaaS design with clear navigation and seamless onboarding increases adoption rates by making it easier for users to understand and use the product."
              }
            }
          ]
        }
      ]
    };

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.renderer.appendChild(document.head, script);
  }

  loadPortfolio(): void {
    this.http.get<any>('/assets/data/portfolio/portfolio.json').subscribe((data) => {
      this.portfolioData = data['case-studies'];
    });
  }

  // ✅ Load FAQs from JSON
  loadFaqs(): void {
    const faqFilePath = '/assets/data/solutions/saas-design.json';
    this.http.get<{ faqs: { question: string; answer: string | string[] }[] }>(faqFilePath).subscribe(
      (data) => (this.faqs = data.faqs),
      () => (this.faqs = [])
    );
  }

  // ✅ Helpers for displaying answers
  isArray(val: any): val is string[] {
    return Array.isArray(val);
  }

  getAnswers(val: string[] | string): string[] {
    return Array.isArray(val) ? val : [val];
  }

  formatAnswer(text: string): string {
    return text; // Add formatting if needed
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
