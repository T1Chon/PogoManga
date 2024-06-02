import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CarruselComponent } from '../carrusel/carrusel.component';
import { initFlowbite } from 'flowbite';
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CardComponent, CarruselComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent{

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {        
        initFlowbite();  
      }, 100);
    }
  }
}
