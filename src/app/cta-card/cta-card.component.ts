import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cta-card',
  templateUrl: './cta-card.component.html',
  styleUrls: ['./cta-card.component.scss']
})
export class CtaCardComponent {
  @Input() noMarginBottom: boolean = false; 
}
