// login info: https://www.bacancytechnology.com/qanda/angular/session-storage-in-angular-application#:~:text=To%20store%20the%20data%20in,can%20use%20the%20setItem%20method.

import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginObj: Login;

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.loginObj = new Login();
  }


  

  async onLogin() {

    const { usuario, contrasena } = this.loginObj;
    const url = `http://172.17.131.10:3000/api/auth/${usuario}/${contrasena}`;

    await this.http.get(url).subscribe((res: any) => {
      if (res.user) {
        console.log('respuesta: ',res);
         sessionStorage.setItem('user' , JSON.stringify(res));
         const session = sessionStorage.getItem('user');
         
         if (session !== null) {
            console.log('Guardado en sesión:', JSON.parse(session));
            this.router.navigate(['/']);
            setTimeout(function(){
              window.location.reload();
           }, 100);
         } else {
             console.log('No se encontró ningún usuario en la sesión.');
         }

      } else {
        alert(res.message);
      }
    });
    
  }

  loginAuth(){
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
