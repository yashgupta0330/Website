import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaCardComponent } from './cta-card.component';

describe('CtaCardComponent', () => {
  let component: CtaCardComponent;
  let fixture: ComponentFixture<CtaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CtaCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CtaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
