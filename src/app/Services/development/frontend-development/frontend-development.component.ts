import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { PortfolioService } from '../../../portfolio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-frontend-development',
  templateUrl: './frontend-development.component.html',
  styleUrls: ['./frontend-development.component.scss']
})
export class FrontendDevelopmentComponent implements OnInit, OnDestroy, AfterViewInit {
  frontend_cards = ['hrms-development', 'crms'];
  frontendData: any[] = [];
  private dataSub?: Subscription;
  @ViewChildren('portfolioVideo') portfolioVideos!: QueryList<ElementRef<HTMLVideoElement>>;

  constructor(public portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.load();
    this.dataSub = this.portfolioService.cardsLoaded$.subscribe((loaded) => {
      if (loaded) {
        this.frontendData = this.portfolioService.getCardsByIds(this.frontend_cards);
      }
    });
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
