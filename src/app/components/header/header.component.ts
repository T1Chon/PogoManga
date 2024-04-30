import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
 selector: 'app-header',
 standalone: true,
 imports: [RouterLink],
 templateUrl: './header.component.html',
 styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 userInfo: any;

 constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router // Inyecta el servicio Router aquí
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
    this.router.navigate(['/login']); // Ahora this.router está definido y puedes usarlo
    location.reload();
    
 }
}
