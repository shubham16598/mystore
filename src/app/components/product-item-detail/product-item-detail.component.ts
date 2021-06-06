import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/products';
import { CartItem } from '../../interfaces/cart';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  quantity:Number = 0;
  productList: Product[] = [];
  selectedProduct: CartItem;
  product: Product = {id: null, name:null, url:null, description: null, price:null};
  private routeSub: Subscription;
  id:Number;
  constructor(private http:HttpClient,private route: ActivatedRoute,private router: Router, private cartService:CartService) { }

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });

    if(this.id){
        this.http.get<Product[]>('http://localhost:4200/assets/data.json').subscribe((data:Product[])=>{
        this.productList = data;
        const index = this.productList.findIndex(role => role.id == this.id);

        if (index > -1) {
          this.product = this.productList[index];
        }else{
          this.router.navigate(['/product-list']);
        }
      });

    } else {
      this.router.navigate(['/product-list']);
    }
  }
  onSubmit(quantity): void{
    if(quantity<1){
      alert("Minimum quantity required is 1");
      return;
    }
    this.selectedProduct = {...this.product,quantity};
    this.cartService.addItemtoCart(this.selectedProduct);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
