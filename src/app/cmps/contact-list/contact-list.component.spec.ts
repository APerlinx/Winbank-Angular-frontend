import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetListComponent } from './contact-list.component';

describe('PetListComponent', () => {
  let component: PetListComponent;
  let fixture: ComponentFixture<PetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetListComponent]
    });
    fixture = TestBed.createComponent(PetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
