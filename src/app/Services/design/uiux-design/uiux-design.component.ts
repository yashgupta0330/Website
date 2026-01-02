import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { PortfolioService } from '../../../portfolio.service';
import { Subscription } from 'rxjs';
import { ScrollRestorationService } from '../../../scroll-restoration.service';

@Component({
  selector: 'app-uiux-design',
  templateUrl: './uiux-design.component.html',
  styleUrls: ['./uiux-design.component.scss']
})
export class UiuxDesignComponent implements OnInit, OnDestroy, AfterViewInit {
  uiux_cards = ['network', 'remit'];
  uiuxData: any[] = [];
  private dataSub?: Subscription;
  @ViewChildren('portfolioVideo') portfolioVideos!: QueryList<ElementRef<HTMLVideoElement>>;

  constructor(public portfolioService: PortfolioService, private scrollRestoration: ScrollRestorationService) {}

  ngOnInit(): void {
    this.portfolioService.load();
    this.dataSub = this.portfolioService.cardsLoaded$.subscribe((loaded) => {
      if (loaded) {
        this.uiuxData = this.portfolioService.getCardsByIds(this.uiux_cards);
      }
    });
    setTimeout(() => {
      this.scrollRestoration.restoreScrollPosition('/design/uiux-design');
    }, 100);
  }

  onCaseStudyClick(cardId: string): void {
    this.scrollRestoration.saveScrollPosition('/design/uiux-design');
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
