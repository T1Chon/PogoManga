import { Component, Input, OnInit } from '@angular/core';
import { ProductResults, product } from '../../interfaces/card';
import { ServicesService } from '../../service/services.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CardInfoComponent } from '../card-info/card-info.component';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [AsyncPipe, CardInfoComponent],
  providers: [ServicesService],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  public products$!: Observable<ProductResults>;
  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    this.products$ = this.service.GetProducts();
  }
};

