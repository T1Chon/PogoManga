import { Component } from '@angular/core';
import { content } from '../../interfaces/card';
import { ServicesService } from '../../service/services.service';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  providers: [ServicesService],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  productos: content[] = [
    {
      img: 'https://m.media-amazon.com/images/I/61tIXl--j4L._AC_UF894,1000_QL80_.jpg',
      nombre: 'Kirishima',
      price: 16.95
    },
    {
      img: 'https://www.toysrus.es/medias/?context=bWFzdGVyfHByb2R1Y3RfaW1hZ2VzfDExODczM3xpbWFnZS9qcGVnfGFHVTJMMmd5TVM4NE9UZ3pNRFUyTWpJd01Ua3d8ODJkMWM2ODAzYjIyOWI4YWRjYTcyZDY3ZGIyM2QyYTBiOGE3ZTI1M2JkNTM0YzIxYzQ0YzYxMDM0NjllMmM1MQ',
      nombre: 'Freezer',
      price: 23.99
    },
    {
      img: 'https://m.media-amazon.com/images/I/61y7KIDP5oL._AC_UF894,1000_QL80_.jpg',
      nombre: 'Zero two',
      price: 32.50
    },
    {
      img: 'https://bizakshop.com/12102-large_default/demon-slayer-figura-18cm-tanjiro-kamado.jpg',
      nombre: 'Tanjiro',
      price: 15.99
    },


  ];

  constructor(private service: ServicesService) {
    service.GetProducts().subscribe(product => { 
      console.log(product);
    });

  
  };
};

