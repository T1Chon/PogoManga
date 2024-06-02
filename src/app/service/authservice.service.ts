import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const session = sessionStorage.getItem('user');
      if (session) {
        this.userSubject.next(JSON.parse(session).user);
        // console.log('session: ', session);
      }
    }
  }

  login(userData: any) {
    if (this.isBrowser) {
      sessionStorage.setItem('user', JSON.stringify(userData));
    }
    this.userSubject.next(userData.user);
  }

  logout() {
    if (this.isBrowser) {
      sessionStorage.removeItem('user');
    }
    this.userSubject.next(null);
  }

}
