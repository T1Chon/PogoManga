import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoBoxComponent } from './carrito-box.component';

describe('CarritoBoxComponent', () => {
  let component: CarritoBoxComponent;
  let fixture: ComponentFixture<CarritoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarritoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
