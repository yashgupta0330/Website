

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrmsComponent } from '../crms/crms.component';
import { HrmsComponent } from '../hrms/hrms.component';
import { LmsComponent } from '../lms/lms.component';
import { MsComponent } from '../ms/ms.component';
import { DigitalMarketingComponent } from '../../digital-marketing/digital-marketing.component';

@Component({
  selector: 'app-root-portfolio',
  templateUrl: './root-portfolio.component.html',
  styleUrls: ['./root-portfolio.component.scss']
})
export class RootPortfolioPageComponent implements OnInit {
  id: string | null = null; // Ensure 'id' is declared as a class property
  componentMap: { [key: string]: any } = {
    'customer-relationship-management-system': CrmsComponent,
    'hr-management-system': HrmsComponent,
    'learning-management-system': LmsComponent,
    'mobile-solutions': MsComponent,
    'digital-marketing': DigitalMarketingComponent
  };
  

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (!this.id) {
        console.error('Invalid selection or missing service ID');
      }
    });
  }
  
}
