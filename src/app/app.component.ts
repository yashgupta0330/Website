import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter, map, switchMap } from 'rxjs/operators';
import { GlobalStateService } from './global-state.service';
import { LoaderService } from './shared/services/loader.service';
import { of } from 'rxjs';
import { ViewportScroller } from '@angular/common';

declare var bootstrap: any; // Declaring Bootstrap for use in TypeScript

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Anarish Innovations';
  isEmpty: boolean = false;
  querySubmited: boolean = false;
  tabs = ['services', 'portfolio', 'beliefs', 'recommendations', 'contact us'];
  private toast: any;

  constructor(
    private router: Router,
    private globalState: GlobalStateService,
    private loaderService: LoaderService,
    private titleService: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {
      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Skip scroll to top for portfolio if we have saved scroll position or target card
        const hasPortfolioScroll = sessionStorage.getItem('portfolio_scroll');
        const hasScrollRestoration = sessionStorage.getItem('scroll_/portfolio');
        const hasTargetCard = sessionStorage.getItem('portfolio_target_card');
        
        if (event.url === '/portfolio' && (hasPortfolioScroll || hasScrollRestoration || hasTargetCard)) {
          // Don't scroll to top, let portfolio component handle it
          return;
        }
        
        if (event.url !== '/portfolio') {
          const container = document.getElementById('scroll-container');
          container?.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });

  }

  ngOnInit(): void {
    // Maintain global state
    this.globalState.setState({ stateSubject: false });

    this.globalState.state$.subscribe((state) => {
      this.querySubmited = state.stateSubject;
    });

    // Hide external loader after app initialization
    setTimeout(() => {
      this.loaderService.hideExternalLoader();
    }, 1500);

    // 🚀 Set page title, meta description, and tags dynamically
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute.firstChild),
        switchMap((child) => {
          if (!child) return of({ title: this.title, description: '', keywords: '' });

          while (child.firstChild) {
            child = child.firstChild;
          }

          // Handle dynamic metadata for services
          if (child.snapshot.routeConfig?.path === 'services/:id') {
            const serviceId = child.snapshot.params['id'];
            return of(this.getServiceMetadata(serviceId));
          }

          return of({
            title: child.snapshot.data['title'] || this.title,
            description: child.snapshot.data['description'] || '',
            keywords: child.snapshot.data['keywords'] || ''
          });
        })
      )
      .subscribe((metadata) => {
        this.titleService.setTitle(metadata.title);

        // Update meta description
        this.metaService.updateTag({ name: 'description', content: metadata.description });

        // Update meta keywords
        this.metaService.updateTag({ name: 'keywords', content: metadata.keywords });
      });
  }

   ngAfterViewInit(): void {
  const toastTrigger = document.getElementById('liveToastBtn');
  const toastLiveExample = document.getElementById('liveToast');

  if (toastTrigger && toastLiveExample) {
    this.toast = new bootstrap.Toast(toastLiveExample, { delay: 60000 });
    toastTrigger.addEventListener('click', () => {
      this.toast.show();
    });
  }
}

  dismissToast() {
    if (this.toast) {
      this.toast.hide();
    }
  }

  ngOnDestroy() {}

  handletabs(tabValue: string) {
    this.router.navigateByUrl('home/#portfolio');
  }

  // Function to get the dynamic metadata for services
  private getServiceMetadata(serviceId: string): { title: string; description: string; keywords: string } {
    const serviceMetadata: { [key: string]: { title: string; description: string; keywords: string } } = {
      'customer-relationship-management-system': {
        title: 'CRM System - Anarish Innovations',
        description: 'Enhance your customer relationships with our advanced CRM system.',
        keywords: 'CRM, customer management, business solutions'
      },
      'hr-management-system': {
        title: 'HR Management System - Anarish Innovations',
        description: 'Manage your workforce efficiently with our HR management system.',
        keywords: 'HR software, employee management, HR solutions'
      },
      'website-design-and-development': {
        title: 'Website Design & Development - Anarish Innovations',
        description: 'Professional website design and development services to grow your business.',
        keywords: 'web development, website design, digital presence'
      },
      'learning-management-system': {
        title: 'Learning Management System - Anarish Innovations',
        description: 'A powerful LMS to deliver, track, and manage your training programs.',
        keywords: 'LMS, online learning, education platform'
      },
      'mobile-solutions': {
        title: 'Mobile Solutions - Anarish Innovations',
        description: 'Custom mobile applications for Android and iOS to enhance user experience.',
        keywords: 'mobile apps, app development, Android, iOS'
      },
      'digital-marketing': {
        title: 'Digital Marketing - Anarish Innovations',
        description: 'Boost your online presence with our expert digital marketing strategies.',
        keywords: 'SEO, social media marketing, PPC, content marketing'
      }
    };

    return serviceMetadata[serviceId] || {
      title: 'Services - Anarish Innovations',
      description: 'Explore our range of services to help your business grow.',
      keywords: 'business services, IT solutions, Anarish Innovations'
    };
  }
}

