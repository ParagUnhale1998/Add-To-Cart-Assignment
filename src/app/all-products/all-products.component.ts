import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent {
  products: any[] = [];
  cartItems: any[] = [];

  constructor(private apiService: ApiService,private cartService :CartService) {}

  ngOnInit(): void {
   
    this.cartItems = this.cartService.getCartItems();

    this.apiService.getAllProducts().subscribe((data: any) => {
      this.products = data.products;
      console.log(data)
      console.log(this.products)
    });
  }
 
  
  // addToCart(product: any): void {
  //   // Check if the product is already in the cart
  //   const existingProduct = this.cartItems.find((item) => item.id === product.id);
  
  //   if (existingProduct) {
  //     // If the product is already in the cart, increment the quantity
  //     existingProduct.quantity += 1;
  //   } else {
  //     // If the product is not in the cart, add it with a quantity of 1
  //     this.cartItems.push({ ...product, quantity: 1 });
  //   }
  // }

  addToCart(product: any): void {
      product.quantity = 1
      this.cartService.addToCart(product)
    this.cartService.updateCartSummary();

  }
}
