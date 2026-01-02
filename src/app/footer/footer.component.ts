
import { Component } from '@angular/core';
import { Router } from '@angular/router';
 import { faCoffee } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(public router: Router) {}
   faCoffee = faCoffee; // Assign the icon to a class property
  get shouldShowCTA(): boolean {
    const url = this.router.url;
    return url !== '/contact-us';
  }

  scrollToTop() {
    setTimeout(() => {
      const container = document.getElementById('scroll-container');
      container?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }

}
