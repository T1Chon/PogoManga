import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { productCart } from '../../interfaces/carritoCard';
import { CarritoServiceService } from '../../service/carrito-service.service';
import { CarritoCardComponent } from "../carrito-card/carrito-card.component";
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-carrito-box',
    standalone: true,
    templateUrl: './carrito-box.component.html',
    styleUrl: './carrito-box.component.css',
    imports: [CarritoCardComponent, AsyncPipe, RouterLink]
})
export class CarritoBoxComponent implements OnInit {

  products!: productCart[];
  public products$!: Observable<productCart[]>
  public precioTotal$!: Observable<Number>;
  public subscriptions: Subscription[] = [];

  // public carrito$!: Observable<CarritocardResults>;
  constructor(private service: CarritoServiceService) { }

  ngOnInit(): void {
    this.precioTotal$ = this.service.totalPrice;
    this.products$ = this.service.products;
    this.subscriptions.push(this.products$.subscribe((data: productCart[]) => this.products = data))
    
    
    //console.log(this.products);
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      const userData = JSON.parse(userSession);
      const user = userData.user[0];
      console.log(user.id_usuario);
      
      
      // this.carrito$ = this.service.GetCestaById(user.id_usuario);
      
    };
  }

  ngOnDestroy() {
    this.subscriptions.forEach(e => e.unsubscribe());
  } 

  onClick(index: number):void {
    this.service.deleteProductOfCart(index);
  }
}
