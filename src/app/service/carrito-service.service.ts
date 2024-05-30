import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CarritocardResults, productCart } from '../interfaces/carritoCard';

@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {

  private urlLocal = "http://172.17.131.10:3000/api/cesta";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { };

  private cartProducts: productCart[] = [];
  private priceProducts: productCart[] = [];
  private products$: BehaviorSubject<productCart[]> = new BehaviorSubject<productCart[]>(this.cartProducts)
  private numberProduct$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private totalPrice$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  public date = new Date()

  public cestaisnotnull: boolean = false;


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

  updateCart(cart: productCart[]) {
    return this.http.put<productCart[]>(this.urlLocal, cart);
  }

  private updateTotalPrecio() {
    this.cartProducts.forEach(data => {
      console.log(data.precio)
    })
    let total = this.cartProducts.reduce((sum, product) => sum + product.precio, 0);
    //total = parseFloat(total.toFixed(2));
    this.totalPrice$.next(total);
  }

  private updateNumber() {
    const total = this.cartProducts.reduce((sum, product) => sum + product.cantidad, 0);
    this.numberProduct$.next(total);
  }

  private findProduct(product: productCart) {
    for (let i = 0; i < this.cartProducts.length; i++) {
      if (this.cartProducts[i].id_producto === product.id_producto) {
        console.log('Encontrado');
        return i;
      }
    }
    return -1;
  }

  addNewProductToCart(product: productCart): void {
    let isFound = this.findProduct(product);

    if (isFound != -1) {
      this.cartProducts[isFound].cantidad += 1;
      this.cartProducts[isFound].precio += product.precio;
      console.log(typeof (product.precio))
    } else {
      console.log('no son iguales');
      this.cartProducts.push(product);
      this.priceProducts.push(product)
    }
    this.updateNumber();
    this.products$.next(this.cartProducts);
    this.updateTotalPrecio();

  }

  deleteProductOfCart(index: number) {
    if (index < 0 || index >= this.cartProducts.length) {
      return;
    }
    let product = this.cartProducts[index];

    if (product.cantidad > 1) {
      product.cantidad -= 1;
      product.precio -= product.precio / (product.cantidad + 1); 
    } else {
      this.cartProducts.splice(index, 1);
    }

    this.products$.next(this.cartProducts);
    this.updateNumber();
    this.updateTotalPrecio();
  }

  GetCestaById(id_usuario: number): void {
    this.http.get<productCart[]>(`${this.urlLocal}/${id_usuario}`).subscribe( data => {
      if (data && data.length > 0) {
        this.cartProducts = data;
        this.products$.next(this.cartProducts);
        this.updateNumber();
        this.updateTotalPrecio();
        this.cestaisnotnull = true;
        console.log(data);
      } else {
       this.cestaisnotnull = false;
      }
    })
  }
  // AddProductCarrito(id_usuario: number): Observable<CarritocardResults> {
  //   return this.http.get<CarritocardResults>(`${this.urlLocal}/${id_usuario}`);
  // }

  // obtenerDatosCarrito(): Observable<CarritocardResults> {
  //   return this.http.get<CarritocardResults>(this.urlLocal)
  //     .pipe(
  //       tap((resultados: CarritocardResults) => {
  //         this.products$.next(resultados.cesta);
  //       }),
  //     );
  // }
}
