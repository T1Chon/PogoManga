import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { productCart } from '../../interfaces/carritoCard';
import { CarritoServiceService } from '../../service/carrito-service.service';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  public products$!: Observable<productCart[]>;
  public productsCart: productCart[] = [];
  public total: number = 0;
  public totalPrice$!: Observable<Number>;

  constructor(private carritoService: CarritoServiceService) {}

  ngOnInit(): void {
    this.products$ = this.carritoService.products;
    this.products$.subscribe( data => this.productsCart = data);
    this.totalPrice$ = this.carritoService.totalPrice;

  }

  onClick(index: number):void {
    this.carritoService.deleteProductOfCart(index);
  }

}
