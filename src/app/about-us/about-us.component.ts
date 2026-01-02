
import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../shared/services/loader.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta, private loaderService: LoaderService) { }



  ngOnInit(): void {
    // Loader handled by interceptor
    // Set the page title
    this.titleService.setTitle('About Anarish');

    // Set the meta description
    this.metaService.updateTag({
      name: 'description',
      content: 'Anarish offers innovative software solutions in Delhi, delivering custom software development, enterprise applications, and IT services to meet diverse business needs. Empower your business with our tailored tech solutions. Contact us today!'
    });

    // Set Facebook Open Graph meta tags
    this.metaService.updateTag({ property: 'og:url', content: 'https://www.anarish.com/about-us' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:title', content: 'About Anarish' });
    this.metaService.updateTag({ property: 'og:description', content: 'Anarish offers innovative software solutions in Delhi, delivering custom software development, enterprise applications, and IT services to meet diverse business needs. Empower your business with our tailored tech solutions. Contact us today!' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://www.anarish.com/assets/img/og-image.jpg' });

    // Set Twitter meta tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ property: 'twitter:domain', content: 'anarish.com' });
    this.metaService.updateTag({ property: 'twitter:url', content: 'https://www.anarish.com/about-us' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'About Anarish' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Anarish offers innovative software solutions in Delhi, delivering custom software development, enterprise applications, and IT services to meet diverse business needs. Empower your business with our tailored tech solutions. Contact us today!' });
    this.metaService.updateTag({ name: 'twitter:image', content: 'https://www.anarish.com/assets/img/og-image.jpg' });
    // Loader handled by interceptor
  }

}
