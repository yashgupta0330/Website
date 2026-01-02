import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiuxAuditComponent } from './uiux-audit.component';

describe('UiuxAuditComponent', () => {
  let component: UiuxAuditComponent;
  let fixture: ComponentFixture<UiuxAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiuxAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiuxAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
