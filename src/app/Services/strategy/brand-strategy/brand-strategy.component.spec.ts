import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandStrategyComponent } from './brand-strategy.component';

describe('BrandStrategyComponent', () => {
  let component: BrandStrategyComponent;
  let fixture: ComponentFixture<BrandStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandStrategyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
