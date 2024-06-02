import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { MainComponent } from './components/main/main.component';
import { ChildrenOutletContexts } from '@angular/router';
import { productCart } from './interfaces/carritoCard';
import { Observable, Subscription } from 'rxjs';
import { CarritoServiceService } from './service/carrito-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavComponent, CarruselComponent, MainComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  title = 'pogomanga';
  products!: productCart[];
  public products$!: Observable<productCart[]>
  public subscriptions: Subscription[] = [];

  constructor(private contexts: ChildrenOutletContexts, private service: CarritoServiceService) {}

  ngOnInit() {
    this.products$ = this.service.products;
    this.subscriptions.push(this.products$.subscribe((data: productCart[]) => this.products = data))
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }



  closeApp() {
      this.service.saveCart(this.products).subscribe(
        response => {
          console.log('Response from backend:', response);
        },
        error => {
          console.error('Error:', error);
        }
      );
    return undefined;
  }
    

}

