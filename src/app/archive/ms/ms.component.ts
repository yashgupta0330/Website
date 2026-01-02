// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-ms',
//   templateUrl: './ms.component.html',
//   styleUrl: './ms.component.scss'
// })
// export class MsComponent {

//   constructor(private router: Router) { }
// }



import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ms',
  templateUrl: './ms.component.html',
  styleUrls: ['./ms.component.scss']
})
export class MsComponent implements OnInit {

  constructor(private router: Router, private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    // Set the page title dynamically
    this.titleService.setTitle('Mobile app Development Company in Delhi | Mobile App Design in Delhi - Anarish');

    // Set the meta description dynamically
    this.metaService.updateTag({ name: 'description', content: 'Leading Mobile App Development Company in Delhi, specializing in custom iOS and Android app solutions. Delivering innovative, user-friendly, and high-performance apps tailored to your business needs. Get in touch today!' });

    // Set the Open Graph (Facebook) meta tags
    this.metaService.updateTag({ property: 'og:url', content: 'https://www.anarish.com/services/mobile-solutions' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:title', content: 'Mobile app Development Company in Delhi | Mobile App Design in Delhi - Anarish' });
    this.metaService.updateTag({ property: 'og:description', content: 'Leading Mobile App Development Company in Delhi, specializing in custom iOS and Android app solutions. Delivering innovative, user-friendly, and high-performance apps tailored to your business needs. Get in touch today!' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://www.anarish.com/assets/img/og-image.jpg' });

    // Set the Twitter meta tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ property: 'twitter:domain', content: 'anarish.com' });
    this.metaService.updateTag({ property: 'twitter:url', content: 'https://www.anarish.com/services/mobile-solutions' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'Mobile app Development Company in Delhi | Mobile App Design in Delhi - Anarish' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Leading Mobile App Development Company in Delhi, specializing in custom iOS and Android app solutions. Delivering innovative, user-friendly, and high-performance apps tailored to your business needs. Get in touch today!' });
    this.metaService.updateTag({ name: 'twitter:image', content: 'https://www.anarish.com/assets/img/og-image.jpg' });
  }
}
