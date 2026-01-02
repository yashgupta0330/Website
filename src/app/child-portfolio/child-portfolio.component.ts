import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { PortfolioService } from '../../app/portfolio.service';
import { ScrollRestorationService } from '../scroll-restoration.service';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-child-portfolio',
  templateUrl: './child-portfolio.component.html',
  styleUrls: ['./child-portfolio.component.scss']
})
export class ChildPortfolioComponent implements OnInit {
  slug: string = '';
  portfolioData: any;
  relatedCards: any[] = [];
  caseStudyHtml: SafeHtml | null = null;


  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private location: Location,
    private router: Router,
    public portfolioService: PortfolioService,
    private scrollRestoration: ScrollRestorationService,
    private loaderService: LoaderService
  ) {}


ngOnInit(): void {
  // Loader handled by interceptor
  this.portfolioService.load();

  this.route.paramMap.subscribe(params => {
    this.slug = params.get('slug') || '';

    this.portfolioService.cardsLoaded$.subscribe((loaded) => {
      if (loaded) {
        const allData = this.portfolioService.getAllPortfolioData();
        this.portfolioData = allData.find((item: any) => item.url === `/${this.slug}`);

        if (this.portfolioData?.id) {
          const folderPath = `/assets/data/portfolio/${this.portfolioData.id}`;
          this.loadCaseStudyHtml(folderPath);
          this.injectCaseStudyCss(folderPath);
        }

        const relatedIds = this.portfolioData?.['detail-page']?.['related-cards'] || [];
        this.relatedCards = this.portfolioService.getCardsByIds(relatedIds);
        // Loader handled by interceptor
      }
    });
  });
}


  getCaseStudyImage(): string {
  const detail = this.portfolioData?.['detail-page'];
  return detail?.['case-study-img']?.trim() || this.portfolioData?.['bg-img'];
}

  getAllTags(): string[] {
    // Merge top-level tags with detail-page tags
    const topLevelTags = this.portfolioData?.tags || [];
    const detailPageTags = this.portfolioData?.['detail-page']?.tags || [];
    
    // Combine both arrays and remove duplicates
    const allTags = [...topLevelTags, ...detailPageTags];
    return [...new Set(allTags)];
  }

  loadCaseStudyHtml(folderPath: string) {
    const htmlPath = `${folderPath}/case-study.html`;
    // Loader handled by interceptor
    fetch(htmlPath)
      .then((res) => res.text())
      .then((html) => {
        this.caseStudyHtml = this.sanitizer.bypassSecurityTrustHtml(html);
        // Loader handled by interceptor
        // Initialize hover effects after HTML is loaded
        setTimeout(() => this.initializeHoverEffects(), 100);
      })
      .catch(() => {
        // Loader handled by interceptor
      });
  }

  injectCaseStudyCss(folderPath: string) {
    const cssPath = `${folderPath}/case-study.css`;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  initializeHoverEffects() {
    const masks = document.querySelectorAll(".lw-image-mask");
    const SPEED = 0.015;
    let rafId: number | null = null;
    const states = new Map();

    function getMaxPan(img: HTMLElement, mask: HTMLElement) {
      return Math.max(0, img.offsetHeight - mask.offsetHeight);
    }

    function animate() {
      let animating = false;
      states.forEach((state: any, img: HTMLElement) => {
        state.current += (state.target - state.current) * SPEED;
        img.style.transform = `translateY(${-state.current}px)`;
        if (Math.abs(state.target - state.current) > 0.5) {
          animating = true;
        }
      });
      if (animating) {
        rafId = requestAnimationFrame(animate);
      } else {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    document.querySelectorAll(".lw-img").forEach((img: any) => {
      states.set(img, { current: 0, target: 0 });
    });

    masks.forEach((mask: any) => {
      const img = mask.querySelector("img");
      mask.addEventListener("mouseenter", () => {
        const maxPan = getMaxPan(img, mask);
        states.forEach((state: any, otherImg: HTMLElement) => {
          state.target = otherImg === img ? maxPan : 0;
        });
        if (!rafId) animate();
      });
      mask.addEventListener("mouseleave", () => {
        states.get(img).target = 0;
        if (!rafId) animate();
      });
    });
  }

  goBack(): void {
    // Check if we have a solution source and cardId in sessionStorage
    const solutionNav = sessionStorage.getItem('solution_case_study_nav');
    if (solutionNav) {
      try {
        const { source, cardId } = JSON.parse(solutionNav);
        if (source && cardId) {
          // Remove after use
          sessionStorage.removeItem('solution_case_study_nav');
          // Navigate to the solution page and scroll to the card after navigation
          this.router.navigateByUrl(source).then(() => {
            setTimeout(() => {
              const el = document.querySelector(`[data-card-id="${cardId}"]`);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 400);
          });
          return;
        }
      } catch {}
    }
    // Default: go to portfolio
    this.scrollRestoration.clearReturnUrl();
    this.router.navigate(['/portfolio']);
  }
}
