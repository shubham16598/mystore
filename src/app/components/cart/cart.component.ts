import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartItem } from '../../interfaces/cart';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  total:number = 0;
  cartProducts: CartItem[] = [];
  name: string;
  email: string;
  selectedProduct: CartItem;
  constructor(private cartService:CartService,private router: Router) { }

  ngOnInit(): void {
    this.cartProducts = this.cartService.cartProducts;
    this.cartProducts.map((i)=>{
      let price = i.quantity*i.price;
      this.total = this.total + price;
    })
  }

  removeProduct(id):void{
    let product = this.cartService.removeItemfromCart(id);
    this.cartProducts = product;
    this.totalPrice();
    setTimeout(()=>alert("Product Removed from the cart"),500);
    
  }

  onChange(product, quantity):void{
     this.selectedProduct = product;
     this.selectedProduct.quantity = quantity
     this.cartProducts = this.cartService.modifyIteminCart(this.selectedProduct);
     this.totalPrice();
     setTimeout(()=>alert("Quantity Modified for the product"),500);
  }
  totalPrice(): void{
    this.total = 0;
    this.cartProducts.map((i)=>{
      let price = i.quantity*i.price;
      this.total = this.total + price;
    })
  }
  checkoutSuccess(): void{
    console.log("hey");
    this.router.navigate(['confirmation'],{ queryParams: { name: this.name, total: this.total} });
  }
}
