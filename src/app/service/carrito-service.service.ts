import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CarritocardResults, productCart } from '../interfaces/carritoCard';

@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {

  private urlLocal = "http:localhost:3000/api/cesta";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { };

  private cartProducts: productCart[] = [];
  private products$: BehaviorSubject<productCart[]> = new BehaviorSubject<productCart[]>([])
  private numberProduct$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private totalPrice$: BehaviorSubject<number> = new BehaviorSubject<number>(0)


  get products() {
    return this.products$.asObservable();
  }

  get productsNumber() {
    return this.numberProduct$.asObservable();
  }

  get totalPrice() {
    return this.totalPrice$.asObservable();
  }

  saveCart(cart: productCart[]) {
    return this.http.post<productCart[]>(this.urlLocal, cart);
  }

  private updateTotalPrecio() {
    const total = this.cartProducts.reduce((sum, product) => sum + (product.precio * product.cantidad), 0);
    this.totalPrice$.next(total);
  }

  addNewProductToCart(product: productCart): void {
    console.log("hola");
    this.cartProducts.push(product);
    this.products$.next(this.cartProducts);
    this.numberProduct$.next(this.cartProducts.length);
    this.updateTotalPrecio();
  }

  deleteProductOfCart(index: number) {
    this.cartProducts.splice(index, 1);
    this.products$.next(this.cartProducts);
    this.numberProduct$.next(this.cartProducts.length);
    this.updateTotalPrecio();
  }
  
  GetCarrito():Observable<CarritocardResults> {
    return this.http.get<CarritocardResults>(this.urlLocal);
  }

  GetCestaById(id_usuario: number): Observable<CarritocardResults> {
    return this.http.get<CarritocardResults>(`${this.urlLocal}/${id_usuario}`);
  }

  AddProductCarrito(id_usuario: number): Observable<CarritocardResults> {
    return this.http.get<CarritocardResults>(`${this.urlLocal}/${id_usuario}`);
  }

  obtenerDatosCarrito(): Observable<CarritocardResults> {
    return this.http.get<CarritocardResults>(this.urlLocal)
      .pipe(
        tap((resultados: CarritocardResults) => {
          this.products$.next(resultados.cesta);
        }),
      );
  }
}
