import { Component, EventEmitter, Input, Output } from '@angular/core';
import { item } from '../../../interfaces/item.interface';

@Component({
  selector: 'app-child1',
  standalone: false,
  templateUrl: './child1.component.html',
  styleUrl: './child1.component.css',
})
export class Child1Component {
  @Input() products: any;
  @Output() AddInCart = new EventEmitter<item>();

  adding(selectedItem: item) {
    this.AddInCart.emit(selectedItem);
  }
}
