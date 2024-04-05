import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { product } from '../../interfaces/card';
import { RouterLink } from '@angular/router';
import { ServicesService } from '../../service/services.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  providers: [ServicesService],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.css'
})
export class CardInfoComponent {
  @Input() cardInfo!: product;

  
}
