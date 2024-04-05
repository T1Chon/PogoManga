import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ServicesService } from '../../service/services.service';
import { product } from '../../interfaces/card';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public products!: product | undefined;
  constructor(private activatedRoute: ActivatedRoute, private servicesservice:ServicesService, private router:Router) {  }

    ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.servicesservice.GetProductById(id)),
      )
      .subscribe( res => {
        if ( !res) return this.router.navigateByUrl('/')
  
        this.products = res.productos[0];
        console.log(this.products);
        return true
      })
  }

  
}
