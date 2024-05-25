import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarritocardResults } from '../interfaces/carritocard';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {

  private urlLocal = "http://172.17.131.10:3000/api/cesta";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private http: HttpClient) { };
  
  GetCarrito():Observable<CarritocardResults> {
    return this.http.get<CarritocardResults>(this.urlLocal);
  }

  GetCestaById(id_usuario: number): Observable<CarritocardResults> {
    return this.http.get<CarritocardResults>(`${this.urlLocal}/${id_usuario}`);
  }

  AddProductCarrito(id_usuario: number): Observable<CarritocardResults> {
    return this.http.get<CarritocardResults>(`${this.urlLocal}/${id_usuario}`);
  }

}