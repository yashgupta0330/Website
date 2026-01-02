import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isSolutionsMenuOpen: boolean = false;
  isServicesMenuOpen: boolean = false;
  isPortfolioActive: boolean = false;
  showVisitorCounter: boolean = false;
  isOffcanvasOpen = false;

  // Track both dropdowns
  @ViewChildren('dropdownElement') dropdownElementsRef!: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    console.log("******* I am here ****** "); 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isPortfolioActive = this.router.url.startsWith('/portfolio');

        const offcanvasElement = document.getElementById('offcanvasNavbar2');
        if (offcanvasElement) {
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
          if (offcanvasInstance) {
            offcanvasInstance.hide();
          }
        }


      }
    });
  }

  ngAfterViewInit(): void {
    const dropdownEls = this.dropdownElementsRef.toArray();

    // Assuming 0 index = Solutions, 1 index = Services
    if (dropdownEls[0]) {
      this.renderer.listen(
        dropdownEls[0].nativeElement,
        'shown.bs.dropdown',
        () => {
          this.isSolutionsMenuOpen = true;
        }
      );
      this.renderer.listen(
        dropdownEls[0].nativeElement,
        'hidden.bs.dropdown',
        () => {
          this.isSolutionsMenuOpen = false;
        }
      );
    }

    if (dropdownEls[1]) {
      this.renderer.listen(
        dropdownEls[1].nativeElement,
        'shown.bs.dropdown',
        () => {
          this.isServicesMenuOpen = true;
        }
      );
      this.renderer.listen(
        dropdownEls[1].nativeElement,
        'hidden.bs.dropdown',
        () => {
          this.isServicesMenuOpen = false;
        }
      );
    }
  }

  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }

  handletabs(tabValue: string) {
    // Navigate to the route instead of using fragment
    this.router.navigate([tabValue]);
  }
}
