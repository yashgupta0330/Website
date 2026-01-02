import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityDesignComponent } from './identity-design.component';

describe('IdentityDesignComponent', () => {
  let component: IdentityDesignComponent;
  let fixture: ComponentFixture<IdentityDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentityDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
