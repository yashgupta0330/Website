import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCodeDevelopmentComponent } from './no-code-development.component';

describe('NoCodeDevelopmentComponent', () => {
  let component: NoCodeDevelopmentComponent;
  let fixture: ComponentFixture<NoCodeDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoCodeDevelopmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCodeDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
