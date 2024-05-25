import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CarritoBoxComponent } from '../carrito-box/carrito-box.component';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../../service/services.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CarritoBoxComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userInfo: any;
  isHidden = true;
  searchInput: string | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router, private service: ServicesService // Inyecta el servicio Router aquí
  ) { }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const session = window.sessionStorage.getItem('user');
      if (session !== null) {
        this.userInfo = JSON.parse(session).user[0];
      }
    }
  }

  onLogout(): void {
    // Eliminar la información del usuario de sessionStorage
    sessionStorage.removeItem('user');
    // Redirigir al usuario a la página de inicio de sesión o a la página principal
    this.router.navigate(['/main']); // Ahora this.router está definido y puedes usarlo

  }

  showBox(): void {
    if (this.isHidden == true) {
      this.isHidden = false;
    } else if (this.isHidden == false) {
      this.isHidden = true;
    }

    console.log(this.isHidden)
  }

  searchProduct(searchInput: string):void {
    if(searchInput != undefined ) {
      this.searchInput = searchInput;
      this.router.navigate(['/result-search'], { queryParams: { parametro1: this.searchInput } });
    }
  }


}