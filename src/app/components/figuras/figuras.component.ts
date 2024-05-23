import { Component, input, OnInit } from '@angular/core';
import { ProductResults, product } from '../../interfaces/card';
import { ServicesService } from '../../service/services.service';
import { map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CardInfoComponent } from '../card-info/card-info.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-figuras',
  standalone: true,
  imports: [AsyncPipe, CardInfoComponent, RouterLink],
  providers: [ServicesService],
  templateUrl: './figuras.component.html',
  styleUrl: './figuras.component.css'
})
export class FigurasComponent implements OnInit {
  public products$!: Observable<ProductResults>;
  public copyProducts$!: Observable<ProductResults>;
  public filteredProducts$!: Observable<ProductResults>;
  public selectedCategory: string = '';
  public availableStock: boolean = false;
  private preSale: boolean = false;


  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    this.products$ = this.service.GetProductsFigura();
    this.copyProducts$ = this.products$;
  }

  filterCategory(category: string): void {
    this.selectedCategory = category;
    console.log(`Selected category: ${this.selectedCategory}`);
    this.applyFilters();
  }

  filterAvailability(event: any): void {
    const { id, checked } = event.target;
    if (id === 'Stock') {
      this.availableStock = checked;
    } else if (id === 'segunda_mano') {
      this.preSale = checked;
    }
    console.log(`Availability filter - Stock: ${this.availableStock}, segunda_mano: ${this.preSale}`);
    this.applyFilters();
  }

  applyFilters(): void {
    this.products$ = this.copyProducts$;
    this.filteredProducts$ = this.products$.pipe(
      map(resultObject => {
        const filtered = resultObject.productos.filter(product => 
          (!this.selectedCategory || product.categoria === this.selectedCategory) &&
          (this.availableStock ? product.stock > 0 : true) &&
          (this.preSale ? product.segunda_mano === 1 : true)
        );
        return { productos: filtered };
      })
    );
    this.filteredProducts$.subscribe(filteredData => {
      console.log(filteredData.productos);
      const newProductResults: ProductResults = filteredData;
      this.products$ = of(newProductResults);
    });
  }

//   const filteredProducts = {
//     productos: Products[]
//   }

  


 }
