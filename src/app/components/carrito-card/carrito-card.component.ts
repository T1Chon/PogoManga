import { Component, Input } from '@angular/core';
import { Carritocard } from '../../interfaces/carritocard';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CarritoService } from '../../service/carrito.service';

@Component({
  selector: 'app-carrito-card',
  standalone: true,
  imports: [RouterLink, RouterOutlet],  
  providers: [CarritoService],
  templateUrl: './carrito-card.component.html',
  styleUrl: './carrito-card.component.css'
})
export class CarritoCardComponent {
  @Input() carritocardInfo!: Carritocard;
}
