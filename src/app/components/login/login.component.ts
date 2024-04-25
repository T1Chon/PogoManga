import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { json } from 'stream/consumers';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginObj: Login;

  constructor(private http: HttpClient) {
    this.loginObj = new Login();
  }

  async onLogin() {
    const { usuario, contrasena } = this.loginObj;
    const url = `http://172.17.131.10:3000/api/auth/${usuario}/${contrasena}`;

    await this.http.get(url).subscribe((res: any) => {
      if (res.user) {
        alert("Login Success");
        console.log('respuesta: ',res);
         sessionStorage.setItem('user' , JSON.stringify(res));
         const session = sessionStorage.getItem('user');

         if (session !== null) {
             console.log('Guardado en sesión:', JSON.parse(session));
         } else {
             console.log('No se encontró ningún usuario en la sesión.');
         }
      } else {
        alert(res.message);
      }
    });
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
