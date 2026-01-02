import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiuxDesignComponent } from './uiux-design.component';

describe('UiuxDesignComponent', () => {
  let component: UiuxDesignComponent;
  let fixture: ComponentFixture<UiuxDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiuxDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiuxDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
