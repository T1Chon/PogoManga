import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://172.17.131.10:3000/api/direcciones';

  constructor(private http: HttpClient) { }

  getDirecciones(userId: number): Observable<any> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }

}
