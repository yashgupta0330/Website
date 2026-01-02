import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { PortfolioService } from '../../../portfolio.service';
import { Subscription } from 'rxjs';
import { ScrollRestorationService } from '../../../scroll-restoration.service';

@Component({
  selector: 'app-identity-design',
  templateUrl: './identity-design.component.html',
  styleUrls: ['./identity-design.component.scss']
})
export class IdentityDesignComponent implements OnInit, OnDestroy, AfterViewInit {
    approachCards = [
      {
        title: 'Brand Discovery',
        description: 'We begin with ideas — developing concepts that align with your brand strategy, audience, and communication goals.',
        icon: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#E3F0FF"/><path d="M18 28.5l5.5 5.5 14-14" stroke="#121212" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
      },
      {
        title: 'Logo Exploration',
        description: 'Focused on hierarchy, balance, and readability, we design structured layouts with intentional type choices that elevate the message.',
        icon: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#E3F0FF"/><g stroke="#121212" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M36 20l-8 8-8-8"/><path d="M20 36l8-8 8 8"/></g></svg>`
      },
      {
        title: 'Visual Language System',
        description: 'Every piece we design stays aligned with your brand identity, ensuring a cohesive and recognizable visual presence.',
        icon: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#E3F0FF"/><path d="M20 36c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#121212" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="28" cy="24" r="3" fill="#121212"/></svg>`
      },
      {
        title: 'Brand Guidelines',
        description: 'From brochures to posters, we create print materials tailored to specific audiences and business goals.',
        icon: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#E3F0FF"/><g stroke="#121212" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 36h16"/><path d="M20 28h16"/><path d="M20 20h16"/></g></svg>`
      }
    ];
  identity_cards = ['lms-branding', 'finc-identity'];
  identityData: any[] = [];
  private dataSub?: Subscription;
  @ViewChildren('portfolioVideo') portfolioVideos!: QueryList<ElementRef<HTMLVideoElement>>;

  constructor(public portfolioService: PortfolioService, private scrollRestoration: ScrollRestorationService) {}

  ngOnInit(): void {
    this.portfolioService.load();
    this.dataSub = this.portfolioService.cardsLoaded$.subscribe((loaded) => {
      if (loaded) {
        this.identityData = this.portfolioService.getCardsByIds(this.identity_cards);
      }
    });
    setTimeout(() => {
      this.scrollRestoration.restoreScrollPosition('/design/identity-design');
    }, 100);
  }

  onCaseStudyClick(cardId: string): void {
    this.scrollRestoration.saveScrollPosition('/design/identity-design');
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
