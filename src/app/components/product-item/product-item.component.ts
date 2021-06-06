import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { Product } from '../../interfaces/products';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  quantity:Number = 0;
  @Input() product: Product;
  @Output() newItemEvent = new EventEmitter<Number>();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(quantity): void{
    this.newItemEvent.emit(quantity);
  }

}
