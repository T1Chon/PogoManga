import { Component, Input } from '@angular/core';
import { productCart } from '../../interfaces/carritoCard';

@Component({
  selector: 'app-carrito-card',
  standalone: true,
  imports: [],
  templateUrl: './carrito-card.component.html',
  styleUrl: './carrito-card.component.css'
})
export class CarritoCardComponent {
  @Input() carritocardInfo!: productCart;
}
