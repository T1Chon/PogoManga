import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CarruselComponent } from '../carrusel/carrusel.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CardComponent, CarruselComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent{

}
