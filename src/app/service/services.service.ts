import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResults, product } from '../interfaces/card';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private urlLocal = "http://172.17.131.10:3000/api/productos";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private http: HttpClient) { };
  
  GetProducts():Observable<ProductResults> {
    return this.http.get<ProductResults>(this.urlLocal);
  }

  GetProductById(productId: number): Observable<ProductResults> {
    return this.http.get<ProductResults>(`${this.urlLocal}/${productId}`);
  }
  
}