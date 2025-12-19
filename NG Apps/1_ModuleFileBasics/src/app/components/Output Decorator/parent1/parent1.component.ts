import { Component } from '@angular/core';
import { item } from '../../../interfaces/item.interface';

@Component({
  selector: 'app-parent1',
  standalone: false,
  templateUrl: './parent1.component.html',
  styleUrl: './parent1.component.css',
})
export class Parent1Component {
  item: item[] = [
    {
      itemBrand: 'Iphone',
      Model: 'Iphone 17',
      description:
        'Meet the new iPhone 17. Designed with contoured edges, thinner borders and durable materials like Ceramic Shield 2 on the front, it looks — and stays — beautiful',
      price: 140000,
    },
    {
      itemBrand: 'Samsung',
      Model: 'Samsung S25',
      description:
        "Galaxy S25 Ultra's rounded design expresses a unified identity for the Galaxy S series. With its sleek and strong titanium frame and a built-in S Pen, it's an ultra-modern, vision of bold design",
      price: 100000,
    },
    {
      itemBrand: 'Vivo',
      Model: 'Vivo X300pro',
      description:
        '200MP ZEISS APO Telephoto delivers pro-level clarity at any distance. From live shows to birdwatching, smooth zoom and sharp focus turn every scene into a masterpiece.',
      price: 90000,
    },
  ];

  public YourCart: item[] = [];

  addToCartPlease(prod: item) {
    this.YourCart.push(prod);
    console.log('Incoming item: ', prod);
  }
}
