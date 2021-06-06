import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/products';
import { CartItem } from '../../interfaces/cart';
import { HttpClient } from '@angular/common/http';
import {CartService} from '../../services/cart/cart.service'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  selectedProduct: CartItem;
  constructor(private http:HttpClient, private cartService:CartService) { }

  ngOnInit(): void {
    this.http.get<Product[]>('http://localhost:4200/assets/data.json').subscribe((data:Product[])=>{
      this.productList = data;
    });
  }

  addItem(quantity,product):void{
     if(quantity<1){
       alert("Minimum quantity required is 1");
       return;
     }
     this.selectedProduct = product;
     this.selectedProduct.quantity = quantity;
     this.cartService.addItemtoCart(this.selectedProduct);
  }

}
