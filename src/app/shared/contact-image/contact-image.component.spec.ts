import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactImageComponent } from './contact-image.component';

describe('ContactImageComponent', () => {
  let component: ContactImageComponent;
  let fixture: ComponentFixture<ContactImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactImageComponent]
    });
    fixture = TestBed.createComponent(ContactImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
