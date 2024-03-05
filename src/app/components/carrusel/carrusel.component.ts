import { Component } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent {
  currentIndex: number = 0;

  changeSlide(index: number): void {
    this.currentIndex = index;
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextSlide(): void {
    // Aquí necesitarías tener en cuenta el número total de diapositivas
    // Supongamos que tienes 3 diapositivas en total
    const totalSlides: number = 3;
    if (this.currentIndex < totalSlides - 1) {
      this.currentIndex++;
    }
  }
}
