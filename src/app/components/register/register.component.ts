import { Component  } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersService } from '../../service/users.service';
import { clear } from 'console';

@Component({
  selector: 'app-Register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.registerForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      apellido1: ['', [Validators.required, Validators.maxLength(20)]],
      apellido2: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ]]
    });
  }

  onRegister() {
    this.errorMessage = '';
    if (this.registerForm.valid) {
      const username = this.registerForm.get('usuario')?.value;
      this.userService.checkUsernameExists(username).subscribe(response => {
        if (response.exists) {
          this.errorMessage = 'El usuario ya existe';
          this.registerForm.reset();
        } else {
          this.userService.AddUser(this.registerForm.value).subscribe(res => {
            if (res.message === 'Usuario creado con éxito') {
              alert("Registro exitoso");
            } else {
              this.errorMessage = res.message;
            }
          });
        }
      });
    } else {
      this.errorMessage = 'Formulario no válido';
    }
  }

}
