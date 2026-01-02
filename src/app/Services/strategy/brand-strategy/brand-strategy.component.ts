import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { PortfolioService } from '../../../portfolio.service';
import { Subscription } from 'rxjs';
import { ScrollRestorationService } from '../../../scroll-restoration.service';

@Component({
  selector: 'app-brand-strategy',
  templateUrl: './brand-strategy.component.html',
  styleUrls: ['./brand-strategy.component.scss'],
})
export class BrandStrategyComponent implements OnInit, OnDestroy, AfterViewInit {
  brand_cards = ['sort', 'autonativeai'];
  brandData: any[] = [];
  private dataSub?: Subscription;

  @ViewChildren('portfolioVideo') portfolioVideos!: QueryList<
    ElementRef<HTMLVideoElement>
  >;

  constructor(public portfolioService: PortfolioService, private scrollRestoration: ScrollRestorationService) {}

  ngOnInit(): void {
    this.portfolioService.load();

    this.dataSub = this.portfolioService.cardsLoaded$.subscribe((loaded) => {
      if (loaded) {
        this.brandData = this.portfolioService.getCardsByIds(this.brand_cards);
      }
    });
    setTimeout(() => {
      this.scrollRestoration.restoreScrollPosition('/strategy/brand-strategy');
    }, 100);
  }

  onCaseStudyClick(cardId: string): void {
    this.scrollRestoration.saveScrollPosition('/strategy/brand-strategy');
    this.scrollRestoration.setTargetCardId(cardId);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.playAllVideos();
    }, 0);
  }

  ngOnDestroy(): void {
    this.dataSub?.unsubscribe();
  }

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
