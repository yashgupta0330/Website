import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveDemosComponent } from './interactive-demos.component';

describe('InteractiveDemosComponent', () => {
  let component: InteractiveDemosComponent;
  let fixture: ComponentFixture<InteractiveDemosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InteractiveDemosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InteractiveDemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
