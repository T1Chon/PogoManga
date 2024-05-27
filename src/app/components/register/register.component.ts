import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-Register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerObj: Register;
  constructor(private http: HttpClient) {
    this.registerObj = new Register;
  }

  onRegister() {
    // this.http.post('http://172.17.131.10:3000/api/newuser', this.registerObj).subscribe((res: any)=>{
    this.http.post('http://localhost:3000/api/newuser', this.registerObj).subscribe((res: any)=>{
      if (res.result) {
        alert("Register Success");

      }else{
        alert(res.message);
      }
    })
  }
}

export class Register {

  usuario: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  correo: string;
  contrasena: string;

  constructor() {
    this.usuario = '';
    this.nombre = '';
    this.apellido1 = '';
    this.apellido2 = '';
    this.correo = '';
    this.contrasena = '';
  }

}
