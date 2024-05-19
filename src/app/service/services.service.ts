import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResults, ProductResults_detail, product } from '../interfaces/card';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private urlLocal = "http://172.17.131.10:3000/api/productos";
  // private urlProducto_figura = "http://172.17.131.10:3000/api/producto_figura";
  private urlProducto_figura = "http://localhost:3000/api/producto_figura";
  // private url_Producto_manga = "http://172.17.131.10:3000/api/producto_manga";
  private url_Producto_manga = "http://localhost:3000/api/producto_manga";
  private url_API = "http://localhost:3000/api/productos";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private http: HttpClient) { };
  
  GetProducts():Observable<ProductResults> {
    return this.http.get<ProductResults>(this.url_API);
  }

  GetProductById(productId: number): Observable<ProductResults> {
    return this.http.get<ProductResults>(`${this.url_API}/${productId}`);
  }

  searchProductsByName(nombre: string): Observable<ProductResults> {
    return this.http.get<ProductResults>(`${this.url_API}/buscar/${nombre}`);
  }

  GetProductsFigura():Observable<ProductResults> {
    return this.http.get<ProductResults>(this.urlProducto_figura);
  }

  GetProducts_detail(productId: number, tipo: number):Observable<ProductResults_detail> {
    return this.http.get<ProductResults_detail>(`${this.url_API}/producto_detail/${productId}/${tipo}`);
  }

  GetProductsManga():Observable<ProductResults> {
    return this.http.get<ProductResults>(this.url_Producto_manga);
  }
}