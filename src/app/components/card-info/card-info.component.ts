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

  ngOnInit() {
    let sessionFormat:any;

    const session = sessionStorage.getItem('user');
    if(session != null) {
      sessionFormat = JSON.parse(session);
      this.carritoService.GetCestaById(sessionFormat.user[0].id_usuario);

    }

  }

  addToCart() {
    const session = sessionStorage.getItem('user');
    if (session) {
      const sessionFormat = JSON.parse(session);
      if (this.cardInfo != null) {
        const carritoItem: productCart = {
          id_producto: this.cardInfo.id_producto,
          id_cesta: '',
          id_usuario: sessionFormat.user[0].id_usuario,
          cantidad: 1,
          fecha_cesta: this.carritoService.date,
          nombre: this.cardInfo.nombre,
          precio: parseFloat(this.cardInfo.precio),
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
}
