import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { on } from 'events';
import { AddressService } from '../../service/address.service';
import { HttpErrorResponse } from '@angular/common/http';
import { usersResults } from '../../interfaces/users';
import { UsersService } from '../../service/users.service';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoginComponent],
  providers: [AddressService, UsersService, UserService, AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: any = null;
  direcciones: any[] = [];
  userId: number = 0;

  constructor(
    private addressService: AddressService,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userSession = sessionStorage.getItem('user');
      if (userSession) {
        const userData = JSON.parse(userSession);
        const user = userData.user[0];
        console.log(user.id_usuario);
        this.userId = user.id_usuario;
        this.getDirecciones(this.userId);
      } else {
        console.log('No hay usuario logueado');
      }
    }
  }

  getDirecciones(userId: number): void {
    this.addressService.getDirecciones(userId).subscribe({
      next: (data) => {
        this.user = data.user;
        this.direcciones = data.direcciones;
        console.log('Usuario obtenido:', this.user);
        console.log('Direcciones obtenidas:', this.direcciones);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener direcciones:', error.message);
      }
    });
  }
}
