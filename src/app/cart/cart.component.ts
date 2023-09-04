import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartItems: any[] = [];
  subtotal: number = 0;
  vatTax: number = 0;
  discount: number = 0;
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems)
    this.calculateCartSummary();
  }

  calculateCartSummary(): void {
    // Implement your logic to calculate the summary values here
    // For example, iterate through cartItems and calculate totals
    this.subtotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // Implement VAT tax, discount, and total calculations as needed
  }
  updateItem(item: any): void {
    // Implement the logic to update the item's total when the quantity changes
    item.total = item.price * item.quantity;
    this.calculateCartSummary(); // Recalculate the cart summary after updating
  }

}
