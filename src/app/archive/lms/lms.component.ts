// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-lms',
//   templateUrl: './lms.component.html',
//   styleUrl: './lms.component.scss'
// })
// export class LmsComponent {

//   constructor() { }
// }
 

import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lms',
  templateUrl: './lms.component.html',
  styleUrls: ['./lms.component.scss']
})
export class LmsComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    // Set the page title dynamically
    this.titleService.setTitle('Learning Management System Software in Delhi - LMS - Anarish');

    // Set the meta description dynamically
    this.metaService.updateTag({ name: 'description', content: 'Leading Learning Management Software (LMS) Solution Providers in Delhi, offering customizable platforms for online training, course management, and employee learning with our innovative LMS solutions. Get started today!' });

    // Set the Open Graph (Facebook) meta tags
    this.metaService.updateTag({ property: 'og:url', content: 'https://www.anarish.com/services/learning-management-system' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:title', content: 'Learning Management System Software in Delhi - LMS - Anarish' });
    this.metaService.updateTag({ property: 'og:description', content: 'Leading Learning Management Software (LMS) Solution Providers in Delhi, offering customizable platforms for online training, course management, and employee learning with our innovative LMS solutions. Get started today!' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://www.anarish.com/assets/img/og-image.jpg' });

    // Set the Twitter meta tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ property: 'twitter:domain', content: 'anarish.com' });
    this.metaService.updateTag({ property: 'twitter:url', content: 'https://www.anarish.com/services/learning-management-system' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'Learning Management System Software in Delhi - LMS - Anarish' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Leading Learning Management Software (LMS) Solution Providers in Delhi, offering customizable platforms for online training, course management, and employee learning with our innovative LMS solutions. Get started today!' });
    this.metaService.updateTag({ name: 'twitter:image', content: 'https://www.anarish.com/assets/img/og-image.jpg' });
  }
}
