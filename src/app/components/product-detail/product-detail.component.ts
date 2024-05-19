import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ServicesService } from '../../service/services.service';
import { ProductResults_detail, product, product_detail } from '../../interfaces/card';
import { RouterLink } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { threadId } from 'worker_threads';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [RouterLink],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate(300)
      ])
    ])
  ]
})

export class ProductDetailComponent implements OnInit {
  @ViewChild('mainImage') mainImage!: ElementRef;
  public products!: product | undefined;
  public products_detail!: product_detail | undefined;
  public productImages: string[] = [];
  currentImg = '';
  i = 0;


  constructor(private activatedRoute: ActivatedRoute, private servicesservice: ServicesService, private router: Router) { }

  changeImg(img: number): void {
    this.i = img;
    this.currentImg = this.productImages[this.i] + '.jpg';
    this.fadeInOut();
  }

  fadeInOut(): void {
    this.mainImage.nativeElement.style.opacity = '0';
    setTimeout(() => {
      this.mainImage.nativeElement.style.opacity = '1';
    }, 300);
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.servicesservice.GetProductById(id).pipe(
            switchMap(res => {
              if (!res) return this.router.navigateByUrl('/');
              this.products = res.productos[0];

              for (let i = 1; i <= 4; i++) {
                if (`${this.products?.img}-${i}`) {
                  this.productImages.push(`${this.products?.img}-${i}`);
                  console.log(`${this.products?.img}-${i}`);
                }
              }

              this.currentImg = this.productImages[this.i] + '.jpg';
              console.log(this.currentImg);

              return this.servicesservice.GetProducts_detail(id, this.products.tipo);
            })
          );
        })
      )
      .subscribe(resultado => {
        console.log(resultado);
        if (!resultado) {
          return 
        }
         this.products_detail = (resultado as ProductResults_detail).productos[0];
         console.log(this.products_detail);
         return this.products_detail;
      });
  }


}
