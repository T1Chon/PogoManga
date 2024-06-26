import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { usersResults, user } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // private urlLocal = "http://172.17.131.10:3000/api/usuarios";
  private urlLocal = "http://192.168.1.42:3000/api/usuarios";
  private urlLocal2 = "http://192.168.1.42:3000/api";
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

  updateUser(userId: number, userData: any): Observable<usersResults> {
    return this.http.put<usersResults>(`${this.urlLocal}/${userId}`, userData, this.httpOptions);
  }

  checkUsernameExists(username: string): Observable<any> {
    return this.http.get<any>(`${this.urlLocal2}/check-username/${username}`);
  }

  AddUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.urlLocal2}/newuser`, userData, this.httpOptions);
  }


}
