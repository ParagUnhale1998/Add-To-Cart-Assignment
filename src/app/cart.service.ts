import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public saleProcessedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  get saleProcessedUpdates(): Observable<boolean> {
    return this.saleProcessedSubject.asObservable();
  }
  setSaleProcessed(status: boolean): void {
    this.saleProcessedSubject.next(status);
  }
  cartItems: any[] = [
  
  ];
 

  addToCart(product: any): void {
    // this.getCartItems()
    const existingProduct = this.cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      alert(`Product "${product.title}" is already in the cart.`);
    } else {
      this.cartItems.push(product);
    }
  }
  
  removeFromCart(product: any): void {
    const index = this.cartItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }
 
  clearCart(): void {
    this.cartItems = []; // Set the cartItems array to an empty array
  }

  getCartItems(): any[] {
    return this.cartItems;
  }


  private cartSummarySubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined); // Change null to undefined

  constructor() {}

  // Observable to listen for cart summary updates
  get cartSummaryUpdates(): Observable<void> {
    return this.cartSummarySubject.asObservable();
  }

  // Trigger a cart summary update
  updateCartSummary(): void {
    this.cartSummarySubject.next(undefined); // Change null to undefined
  }

}
