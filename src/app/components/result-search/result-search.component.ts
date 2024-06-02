import { Component, Input, OnInit } from '@angular/core';
import { ProductResults, product } from '../../interfaces/card';
import { ServicesService } from '../../service/services.service';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CardInfoComponent } from '../card-info/card-info.component';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-result-search',
  standalone: true,
  imports: [AsyncPipe, CardInfoComponent, RouterLink],
  providers: [ServicesService],
  templateUrl: './result-search.component.html',
  styleUrl: './result-search.component.css'
})
export class ResultSearchComponent {
  public filterProducts$: Observable<ProductResults> | undefined;
  searchValue: string = '';

  constructor(private service: ServicesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchValue = params['parametro1'];
      console.log(this.searchValue);
    });
    this.filterProducts$ = this.service.GetProducts();
    this.filterProducts(this.searchValue);
  }

  filterProducts(searchValue: string): void {
    if (this.filterProducts$) {
        this.filterProducts$ = this.filterProducts$.pipe(
            map(data => {
                const filteredProducts = data.productos.filter(product => 
                    product.nombre.toLowerCase().includes(searchValue.toLowerCase())
                );
                return { productos: filteredProducts };
            })
        );  
    }
  }



}
