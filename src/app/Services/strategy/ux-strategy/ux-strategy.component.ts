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
  selector: 'app-ux-strategy',
  templateUrl: './ux-strategy.component.html',
  styleUrls: ['./ux-strategy.component.scss'],
})
export class UxStrategyComponent implements OnInit, OnDestroy, AfterViewInit {
  ux_cards = ['hrms-strategy', 'fms'];
  uxData: any[] = [];
  private dataSub?: Subscription;

  @ViewChildren('portfolioVideo') portfolioVideos!: QueryList<
    ElementRef<HTMLVideoElement>
  >;

  constructor(public portfolioService: PortfolioService, private scrollRestoration: ScrollRestorationService) {}

  ngOnInit(): void {
    this.portfolioService.load();

    this.dataSub = this.portfolioService.cardsLoaded$.subscribe((loaded) => {
      if (loaded) {
        this.uxData = this.portfolioService.getCardsByIds(this.ux_cards);
      }
    });
    setTimeout(() => {
      this.scrollRestoration.restoreScrollPosition('/strategy/ux-strategy');
    }, 100);
  }

  onCaseStudyClick(cardId: string): void {
    this.scrollRestoration.saveScrollPosition('/strategy/ux-strategy');
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
