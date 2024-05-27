// login info: https://www.bacancytechnology.com/qanda/angular/session-storage-in-angular-application#:~:text=To%20store%20the%20data%20in,can%20use%20the%20setItem%20method.

import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { isPlatformBrowser } from "@angular/common";
import { UserService } from '../../service/user.service';
import { AuthserviceService } from '../../service/authservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
  providers: [UserService, AuthserviceService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginObj: Login;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthserviceService
  ) {
    this.loginObj = new Login();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onLogin() {
    const { usuario, contrasena } = this.loginObj;
    const url = `http://localhost:3000/api/auth/${usuario}/${contrasena}`;

    this.http.get(url).subscribe((res: any) => {
      if (res.user) {
        console.log('respuesta: ', res);
        if (this.isBrowser) {
          this.authService.login(res);
        }
        window.location.href = '/main';
      } else {
        alert(res.message);
      }
    });
  }

  loginAuth() {
    return true;
  }
}

export class Login {
  usuario: string;
  contrasena: string;

  constructor() {
    this.usuario = '';
    this.contrasena = '';
  }

}
