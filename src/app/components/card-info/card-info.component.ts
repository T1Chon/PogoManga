import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { product } from '../../interfaces/card';
import { RouterLink } from '@angular/router';
import { ServicesService } from '../../service/services.service';
import { productCart } from '../../interfaces/carritoCard';
import { CarritoServiceService } from '../../service/carrito-service.service';



@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  providers: [ServicesService],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.css'
})
export class CardInfoComponent {
  @Input() cardInfo!: product;

  constructor(private carritoService: CarritoServiceService) {}

  addToCart() {
    if (this.cardInfo != null) {
      const carritoItem: productCart = { 
        id_producto: this.cardInfo.id_producto,
        id_cesta: '', 
        id_usuario: 0,
        cantidad: 1, 
        fecha_cesta: new Date(),
        nombre: this.cardInfo.nombre,
        precio: this.cardInfo.precio,
        tamano: this.cardInfo.tamano,
        stock: this.cardInfo.stock,
        categoria: this.cardInfo.categoria,
        Segunda_mano: this.cardInfo.segunda_mano,
        img: this.cardInfo.img
      };
      this.carritoService.addNewProductToCart(carritoItem);
    }

  }

  
  
}
