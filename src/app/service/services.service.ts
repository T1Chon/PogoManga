import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductResults, ProductResults_detail } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private urlLocal = "http://localhost:3000/api/productos";
  private urlProducto_figura = "http://localhost:3000/api/producto_figura";
  private url_Producto_manga = "http://localhost:3000/api/producto_manga";
  //private url_API = "http://localhost:3000/api/productos";
  //private urlProducto_figura = "http://localhost:3000/api/producto_figura";
  //private url_Producto_manga = "http://localhost:3000/api/producto_manga";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private allProducts: ProductResults | null = null;

  constructor(private http: HttpClient) { };
  
  GetProducts():Observable<ProductResults> {
    if (this.allProducts) {
      return of(this.allProducts);
    }
    return this.http.get<ProductResults>(this.urlLocal);
  }

  GetProductById(productId: number): Observable<ProductResults> {
    return this.http.get<ProductResults>(`${this.urlLocal}/${productId}`);
  }

  searchProductsByName(nombre: string): Observable<ProductResults> {
    return this.http.get<ProductResults>(`${this.urlLocal}/buscar/${nombre}`);
  }

  GetProductsFigura():Observable<ProductResults> {
    return this.http.get<ProductResults>(this.urlProducto_figura);
  }

  GetProducts_detail(productId: number, tipo: number):Observable<ProductResults_detail> {
    return this.http.get<ProductResults_detail>(`${this.urlLocal}/producto_detail/${productId}/${tipo}`);
  }

  GetProductsManga():Observable<ProductResults> {
    return this.http.get<ProductResults>(this.url_Producto_manga);
  }
}