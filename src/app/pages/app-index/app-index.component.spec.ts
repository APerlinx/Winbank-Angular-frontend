import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppIndexComponent } from './app-index.component';

describe('AppIndexComponent', () => {
  let component: AppIndexComponent;
  let fixture: ComponentFixture<AppIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppIndexComponent]
    });
    fixture = TestBed.createComponent(AppIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
