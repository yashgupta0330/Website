import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { PortfolioService } from '../../../portfolio.service';
import { Subscription } from 'rxjs';
import { ScrollRestorationService } from '../../../scroll-restoration.service';

@Component({
  selector: 'app-print-design',
  templateUrl: './print-design.component.html',
  styleUrls: ['./print-design.component.scss']
})
export class PrintDesignComponent implements OnInit, OnDestroy, AfterViewInit {
  approachCards = [
    {
      title: 'Creative Concepting',
      description: 'We begin with ideas — developing concepts that align with your brand strategy, audience, and communication goals.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#E3F0FF"/><path d="M24 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M21.5 23a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" fill="#121212"/><path d="M32 24c0 3.15-1.866 2.585-3.567 2.07C27.42 25.763 26.465 25.473 26 26c-.603.683-.475 1.819-.351 2.92C25.826 30.495 25.996 32 24 32a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C30.717 25.38 31 25.161 31 24a7 7 0 1 0-7 7" fill="#121212"/></svg>`
    },
    {
      title: 'Layout & Typography',
      description: 'Focused on hierarchy, balance, and readability, we design structured layouts with intentional type choices that elevate the message.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#E3F0FF"/><path d="M28 27a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H23s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C31.516 26.68 30.289 26 28 26s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" fill="#121212"/></svg>`
    },
    {
      title: 'Brand Consistency',
      description: 'Every piece we design stays aligned with your brand identity, ensuring a cohesive and recognizable visual presence.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#E3F0FF"/><path d="M20.715 22.542 19.343 23.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 24.586 21.5L24 22.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L22.88 27.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" fill="#121212"/><path d="M22.586 20.672A3 3 0 0 0 23.414 25.5l.775-.776a2 2 0 0 1-.896-3.346L25.12 19.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" fill="#121212"/></svg>`
    },
    {
      title: 'Print Prep & Support',
      description: 'From brochures to posters, we create print materials tailored to specific audiences and business goals.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#E3F0FF"/><path d="M28.146 16.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM27.207 18.5 29.5 20.793 30.793 19.5 28.5 17.207zm1.586 3L26.5 19.207 20 25.707V26h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 21 28.5V28h-.5a.5.5 0 0 1-.5-.5V27h-.5a.5.5 0 0 1-.468-.325" fill="#121212"/></svg>`
    }
  ];
  print_cards = ['chro', 'sort-design'];
  printData: any[] = [];
  private dataSub?: Subscription;
  @ViewChildren('portfolioVideo') portfolioVideos!: QueryList<ElementRef<HTMLVideoElement>>;

  constructor(public portfolioService: PortfolioService, private scrollRestoration: ScrollRestorationService) {}

  ngOnInit(): void {
    this.portfolioService.load();
    this.dataSub = this.portfolioService.cardsLoaded$.subscribe((loaded) => {
      if (loaded) {
        this.printData = this.portfolioService.getCardsByIds(this.print_cards);
      }
    });
    setTimeout(() => {
      this.scrollRestoration.restoreScrollPosition('/design/print-design');
    }, 100);
  }

  onCaseStudyClick(cardId: string): void {
    this.scrollRestoration.saveScrollPosition('/design/print-design');
    this.scrollRestoration.setTargetCardId(cardId);
  }

  ngAfterViewInit(): void {
    this.playAllVideos();
  }

  playAllVideos(): void {
    this.portfolioVideos.forEach((videoRef) => {
      const video = videoRef.nativeElement;
      video.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
  }

  trackById(index: number, item: any): string {
    return item.id;
  }
}
