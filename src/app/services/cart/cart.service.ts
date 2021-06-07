import { Injectable } from '@angular/core';
import { CartItem } from '../../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartProducts: CartItem[] = [];
  constructor() { }
  
  addItemtoCart(cartItem):void{
    const index = this.cartProducts.findIndex(role=> role.id === cartItem.id);
    if (index >-1) {
      this.cartProducts[index].quantity += cartItem.quantity;
    }else{
      this.cartProducts.push(cartItem);
    }
  }

  removeItemfromCart(id):CartItem[]{
    if(this.cartProducts.length>0){
      const index = this.cartProducts.findIndex(role=> role.id === id);
      this.cartProducts.splice(index, 1);
      return this.cartProducts;  
    }
    return [];
  }

  modifyIteminCart(cartItem):CartItem[]{
    const index = this.cartProducts.findIndex(role=> role.id === cartItem.id);
    if (index >-1) {
      this.cartProducts[index].quantity = cartItem.quantity;
    }else{
      this.cartProducts.push(cartItem);
    }
    return this.cartProducts;
  }
}
