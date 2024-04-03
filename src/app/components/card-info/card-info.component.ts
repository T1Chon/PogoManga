import { Component, Input } from '@angular/core';
import { product } from '../../interfaces/card';

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.css'
})
export class CardInfoComponent {
  @Input() cardInfo!: product;

}
