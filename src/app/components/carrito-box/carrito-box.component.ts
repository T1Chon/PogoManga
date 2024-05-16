import { Component, OnInit } from '@angular/core';
import { CarritocardResults } from '../../interfaces/carritocard';
import { CarritoService } from '../../service/carrito.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CarritoCardComponent } from '../carrito-card/carrito-card.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-carrito-box',
  standalone: true, 
  imports: [AsyncPipe, CarritoCardComponent, RouterLink],
  providers: [CarritoService],
  templateUrl: './carrito-box.component.html',
  styleUrl: './carrito-box.component.css'
})
export class CarritoBoxComponent implements OnInit {
  public carrito$!: Observable<CarritocardResults>;
  constructor(private service: CarritoService) { }

  ngOnInit(): void {
    var userSession = sessionStorage.getItem('user');
    if (userSession) {
      var userData = JSON.parse(userSession);
      var user = userData.user[0];
      console.log(user.id_usuario);
      
      
      this.carrito$ = this.service.GetCestaById(user.id_usuario);
      console.log(this.carrito$);
    };
  }
};

