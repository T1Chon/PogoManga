import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  // private apiUrl = 'http://172.17.131.10:3000/api/direcciones';
  private apiUrl = 'http://localhost:3000/api/direcciones';

  constructor(private http: HttpClient) {}

  getDirecciones(userId: number): Observable<any> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }

  updateDireccion(direccionId: number, direccion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${direccionId}`, direccion);
  }

  addDireccion(userId: number, nuevaDireccion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?userId=${userId}`, nuevaDireccion);
  }

  deleteDireccion(direccionId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${direccionId}`);
  }


}
