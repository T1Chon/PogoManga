import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CarritoBoxComponent } from '../carrito-box/carrito-box.component';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../../service/services.service';
import { AuthserviceService } from '../../service/authservice.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CarritoBoxComponent, FormsModule],
  providers: [AuthserviceService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userInfo: any = {};
  isHidden = true;
  searchInput: string | undefined;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: AuthserviceService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.authService.user$.subscribe(user => {
        if (user && user.length > 0) {
          this.userInfo = user[0];
        } else {
          this.userInfo = {}; // o algún valor por defecto
        }
      });
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/main']);
  }

  showBox(): void {
    this.isHidden = !this.isHidden;
  }

  searchProduct(searchInput: string): void {
    if (searchInput !== undefined) {
      this.searchInput = searchInput;
      this.router.navigate(['/result-search'], { queryParams: { parametro1: this.searchInput } });
    }
  }
}