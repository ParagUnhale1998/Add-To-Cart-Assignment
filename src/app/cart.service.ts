import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: any[] = [
  //   {
  //     "id": 8,
  //     "title": "Microsoft Surface Laptop 4",
  //     "description": "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
  //     "price": 1499,
  //     "discountPercentage": 10.23,
  //     "rating": 4.43,
  //     "stock": 68,
  //     "brand": "Microsoft Surface",
  //     "category": "laptops",
  //     "thumbnail": "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
  //     "images": [
  //         "https://i.dummyjson.com/data/products/8/1.jpg",
  //         "https://i.dummyjson.com/data/products/8/2.jpg",
  //         "https://i.dummyjson.com/data/products/8/3.jpg",
  //         "https://i.dummyjson.com/data/products/8/4.jpg",
  //         "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
  //     ]
  // }
  ];

  addToCart(product: any): void {
    this.cartItems.push(product);
  }
  
  removeFromCart(product: any): void {
    const index = this.cartItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getCartItems(): any[] {
    return this.cartItems;
  }
}
