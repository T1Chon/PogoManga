import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { usersResults, user } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlLocal = "http://172.17.131.10:3000/api/usuarios";
  //private urlLocal = "http://localhost:3000/api/usuarios";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private http: HttpClient) { };


  GetUsers():Observable<usersResults> {
    return this.http.get<usersResults>(this.urlLocal);
  }

  GetUserById(User: number): Observable<usersResults> {
    return this.http.get<usersResults>(`${this.urlLocal}/${User}`);
  }
  // AddUser(usuario: string, nombre: string,apellido1: string, apellido2: string, contrasena: string): Observable<usersResults> {
  //   return this.http.get<usersResults>(`${this.urlLocal}/${usuario}`);
  // }
  

  
}