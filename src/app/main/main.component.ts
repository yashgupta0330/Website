import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ScrollRestorationService } from '../scroll-restoration.service';

// ✅ STEP 1: Global declaration for Masonry (Fixes the import errors)
declare var Masonry: any;

const defaultCard = {
  id: 'default',
  title: 'Coming Soon',
  summary: 'Exciting project details will be available shortly.',
  tags: ['Coming Soon'],
  url: '/work',
  'bg-img': '/assets/img/Centr image.webp',
  img: '/assets/img/Centr image.webp',
  'detail-page': {
    client: 'Confidential',
    industry: 'Various',
    region: 'Global',
    platform: 'Multiple',
    tags: ['Confidential'],
  },
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('accordionExample', { static: false }) accordion:
    | ElementRef
    | undefined;

  // ✅ TESTIMONIAL DATA (Dynamic heights)
  testimonials = [
    {
      name: 'Ashish Sharma',
      role: 'Founder - Mobilise AppLab',
      image: 'assets/img/main/ashish-sharma.jpg',
      text: 'Team Anarish is a design powerhouse! Their work exceeded our expectations, and they were completely involved until the final execution!',
    },
    {
      name: 'Nitin Gambhir',
      role: 'Founding Partner - Stem Center ACE',
      image: 'assets/img/main/nitin-gambhir.jpg',
      text: 'Team Anarish is simply exceptional! Their expertise in UI/UX design transformed our project into a user-friendly masterpiece.',
    },
    {
      name: 'Sudhanshu Jain',
      role: 'VP - Tenon Facility Management',
      image: 'assets/img/main/sudhanshu-jain.jpg',
      text: 'Working with Anarish Innovations was a breeze! Their design skills and attention to detail made our project shine.',
    },


    {
      name: 'Amit Tomar',
      role: 'Group Head of Technology, Incomlend',
      image: 'assets/img/main/amit_tomar.jpeg',
      text: 'We engaged Anarish Innovations to redesign the Incomlend finance platform, and we are thrilled with the results. The new design is not only visually impressive but has also successfully resolved several complex UX challenges we were facing. The team managed to simplify our user journey significantly, making the platform much more intuitive for our clients. A fantastic job overall.',
    },

    {
      name: 'Sanjay Datta',
      role: 'Co-Founder, SORT Supply chain Consulting',
      image: 'assets/img/main/sanjay_datta.jpeg',
      text: 'We are delighted with the branding and stationery work done for SORT. The team understood our requirements quickly and delivered a clean, corporate identity that aligns perfectly with our vision for Supply Chain Optimization. The quality of work and attention to detail were impressive.',
    },

    {
      name: 'Ajay Bansal',
      role: 'Ex- Director, PHDCCI',
      image: 'assets/img/main/ajay_bansal.jpg',
      text: 'Working with Anarish Innovations as our creative partner for the National CHRO Summit was a great experience. They handled the entire branding mandate—from conceptualizing the event logo to designing high-quality print and digital assets. Their team understood the gravity of the event and delivered creative solutions that were not only visually appealing but also perfectly aligned with our professional standards. We appreciate their responsiveness and attention to detail throughout the process.',
    },

    
  ] .reverse();;

  logos = [
    'assets/img/main/logos/Mobilise.webp',
    'assets/img/main/logos/Genpact.webp',
    'assets/img/main/logos/Path.webp',
    'assets/img/main/logos/Iotfy.webp',
    'assets/img/main/logos/Oakter.webp',
    'assets/img/main/logos/Rentickle.webp',
    'assets/img/main/logos/Functionaspps.webp',
    'assets/img/main/logos/4D Stem.webp',
    'assets/img/main/logos/AWC.webp',
    'assets/img/main/logos/Compro Technologies.webp',
  ];

  portfolioData: any[] = [];
  work_cards = ['crms', 'hrms', 'remit', 'fresh-plate', 'finc', 'klastrum'];
  private delay: number = 5000;
  private openInterval: any;
  private currentIndex: number = 0;
  showAccordionBar: boolean = true;
  swiper: Swiper | undefined;
  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  private countdownInterval: any;
  words: string[] = ['Design', 'Code', 'Strategy'];
  wait: number = 3000;

  constructor(
    private router: Router,
    private el: ElementRef,
    private http: HttpClient,
    private scrollRestoration: ScrollRestorationService
  ) {}

  ngOnInit(): void {
    this.http
      .get<any>('/assets/data/portfolio/portfolio.json')
      .subscribe((data) => {
        this.portfolioData = data['case-studies'];
      });
    setTimeout(() => {
      this.scrollRestoration.restoreScrollPosition('/');
    }, 100);
  }

  onCaseStudyClick(cardId: string): void {
    this.scrollRestoration.saveScrollPosition('/');
    this.scrollRestoration.setTargetCardId(cardId);
  }

  ngAfterViewInit(): void {
    // Initialize Accordion
    if (this.accordion) {
      const accordionElement = this.accordion.nativeElement;
      this.startAccordionLoop(accordionElement);
    }

    // Initialize Swiper
    this.initializeSwiper();

    // ✅ STEP 2: Logic for the Missionary Grid
    // horizontalOrder: true ensures Card 7 doesn't jump to the top.
    setTimeout(() => {
      const grid = document.querySelector('.masonry-row');
      if (grid && typeof Masonry !== 'undefined') {
        new Masonry(grid, {
          itemSelector: '.masonry-col',
          percentPosition: true,
          horizontalOrder: true,
          gutter: 0,
        });
      }
    }, 800);
  }

  ngOnDestroy(): void {
    if (this.openInterval) clearInterval(this.openInterval);
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    if (this.swiper) this.swiper.destroy(true, true);
  }

  // --- Helper Methods ---
  getCardsByIds(ids: string[]): any[] {
    if (!this.portfolioData || this.portfolioData.length === 0)
      return ids.map(() => defaultCard);
    return ids.map((id) => {
      const found = this.portfolioData.find((item) => item.id === id);
      return found ? this.ensureCompleteCard(found) : defaultCard;
    });
  }

  ensureCompleteCard(card: any): any {
    const merged = { ...defaultCard, ...card };
    return merged;
  }

  trackById(index: number, card: any) {
    return card.id;
  }

  startAccordionLoop(accordionElement: HTMLElement): void {
    this.showAccordionBar = true;
    const items = accordionElement.querySelectorAll('.accordion-item');
    this.openInterval = setInterval(() => {
      if (this.currentIndex >= items.length) this.currentIndex = 0;
      this.currentIndex++;
    }, this.delay);
  }

  stopAccordionLoop(): void {
    this.showAccordionBar = false;
    if (this.openInterval) clearInterval(this.openInterval);
  }

  initializeSwiper(): void {
    this.swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 3, spaceBetween: 30 },
      },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
