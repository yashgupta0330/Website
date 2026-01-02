import { LoaderService } from '../../shared/services/loader.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { PortfolioService } from '../../portfolio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.scss']
})
export class DevelopmentComponent implements OnInit, OnDestroy, AfterViewInit {
  activeSection: string = '';

  // Card ID arrays for each section
  noCode_cards = ['comprotechnology', 'path'];
  frontend_cards = ['hrms-development', 'crms'];
  backend_cards = ['lms-dev', 'klastrum-development'];

  noCodeData: any[] = [];
  frontendData: any[] = [];
  backendData: any[] = [];

  private dataSub?: Subscription;

  @ViewChildren('portfolioVideo') portfolioVideos!: QueryList<
    ElementRef<HTMLVideoElement>
  >;

  constructor(public portfolioService: PortfolioService, private loaderService: LoaderService) {}

  ngOnInit(): void {
    // Loader handled by interceptor
    this.portfolioService.load();

    this.dataSub = this.portfolioService.cardsLoaded$.subscribe((loaded) => {
      if (loaded) {
        this.noCodeData = this.portfolioService.getCardsByIds(this.noCode_cards);
        this.frontendData = this.portfolioService.getCardsByIds(this.frontend_cards);
        this.backendData = this.portfolioService.getCardsByIds(this.backend_cards);
        // Loader handled by interceptor
      }
    });

    window.addEventListener('scroll', this.onScroll, true);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.playAllVideos();
    }, 0);
  }

  ngOnDestroy(): void {
    this.dataSub?.unsubscribe();
    window.removeEventListener('scroll', this.onScroll, true);
  }

  onScroll = (): void => {
    const sectionIds = ['No-Code-Development', 'Frontend-Development', 'Backend-Development'];
    for (let id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = id;
          break;
        }
      }
    }
  };

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
