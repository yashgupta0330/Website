import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UxStrategyComponent } from './ux-strategy.component';

describe('UxStrategyComponent', () => {
  let component: UxStrategyComponent;
  let fixture: ComponentFixture<UxStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UxStrategyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UxStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
