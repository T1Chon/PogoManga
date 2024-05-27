import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { AddressService } from '../../service/address.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { UsersService } from '../../service/users.service';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../service/user.service';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoginComponent, HeaderComponent, FormsModule, HttpClientModule],
  providers: [AddressService, UsersService, UserService, AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  direcciones: any[] = [];
  userId: number = 0;

  constructor(
    private addressService: AddressService,
    private usersService: UsersService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userSession = sessionStorage.getItem('user');
      if (userSession) {
        const userData = JSON.parse(userSession);
        if (userData && userData.user) {
          this.userId = userData.user.id_usuario;
          this.getUserAndDirecciones(this.userId);
          console.log('Usuario logueado:', this.user);
        } else {
          console.log('No hay usuario logueado');
        }
      } else {
        console.log('No hay usuario logueado');
      }
    }
  }

  getUserAndDirecciones(userId: number): void {
    this.addressService.getDirecciones(userId).subscribe({
      next: (data) => {
        this.user = { ...this.user, ...data.user };
        this.direcciones = data.direcciones;
        console.log('Datos obtenidos:', data);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener datos:', error.message);
      }
    });
  }

  updateUser(): void {
    if (this.userId && this.user) {
      this.usersService.updateUser(this.userId, this.user).subscribe({
        next: (response) => {
          console.log('Usuario actualizado con éxito:', response);
          this.user = { ...this.user, ...response };
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al actualizar usuario:', error.message);
        }
      });
    }
  }

  updateDireccion(direccionId: number, direccion: any): void {
    console.log('Datos antes de enviar:', direccion);
    this.addressService.updateDireccion(direccionId, direccion).subscribe({
      next: (response) => {
        console.log('Dirección actualizada con éxito:', response);
        const index = this.direcciones.findIndex(d => d.id_direccion === direccionId);
        if (index !== -1) {
          this.direcciones[index] = { ...this.direcciones[index], ...direccion };
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al actualizar dirección:', error.message);
      }
    });
  }
}
