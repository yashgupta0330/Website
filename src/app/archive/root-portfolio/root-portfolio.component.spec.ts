import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootPortfolioComponent } from './root-portfolio.component';

describe('RootPortfolioComponent', () => {
  let component: RootPortfolioComponent;
  let fixture: ComponentFixture<RootPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootPortfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
