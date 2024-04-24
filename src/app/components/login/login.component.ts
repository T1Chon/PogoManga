import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
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
