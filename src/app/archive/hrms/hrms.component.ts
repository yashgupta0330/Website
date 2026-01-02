import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hrms',
  templateUrl: './hrms.component.html',
  styleUrls: ['./hrms.component.scss'],
  animations: [
    trigger('moveUpDown', [
      state('up', style({
        transform: 'translateY(-20px)'
      })),
      state('down', style({
        transform: 'translateY(20px)'
      })),
      transition('up <=> down', animate('1000ms cubic-bezier(0.4, 0.0, 0.5, 5)'))
    ])
  ]
})
export class HrmsComponent {
  imgState: string[] = ['up', 'down', 'up', 'down'];

  navigateToPortfolio() {
    this.router.navigate(['portfolio/2']);
  }

  constructor(private router: Router) {
    setInterval(() => {
      this.imgState = this.imgState.map(state => state === 'up' ? 'down' : 'up');
    }, 1000); 

    
  }
}
