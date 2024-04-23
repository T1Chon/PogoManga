import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: Login;
  constructor(private http: HttpClient ) {
    this.loginObj = new Login;
  }

  onLogin() {
    this.http.post('http://172.17.131.10:3000/api/auth/', this.loginObj).subscribe((res: any)=>{
      debugger;
      if (res.result) {
        alert("Login Success");
      }else{
        alert(res.message);
      }
    })
  }
}

export class Login {

  usuario: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  contrasena: string;

  constructor() {
    this.usuario = '';
    this.nombre = '';
    this.apellido1 = '';
    this.apellido2 = '';
    this.contrasena = '';
  }

}
