import { Component,OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  cartItems: any[] = [];
  subtotal: number = 0;
  vatTax: number = 0;
  vatTaxRate: number = 0.1;
  discount: number = 0;
  total: number = 0;
  price: number = 0;
  saleProcessed: boolean = false;
  currentDate!:any;
  saleNumber!:string;
  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();

    this.cartItems.forEach(item => {
      if( this.cartItems.length === 1 ){
        this.total = item.price
        this.vatTax = this.total * this.vatTaxRate;
        this.discount = item.discountPercentage

      }
      
    })
    this.calculateCartSummary();
    
    this.cartService.cartSummaryUpdates.subscribe(() => {
      this.calculateCartSummary();
    });

  }


  calculateCartSummary(): void {
    this.subtotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    this.vatTax = this.subtotal * this.vatTaxRate;
    // this.discount = this.cartItems.reduce((acc, item) => acc + (item.discountPercentage / 100) * item.total, 0);
    if(this.cartItems.length > 0){
      this.discount = 12.96
      this.total = this.subtotal + this.vatTax - this.discount;
    }
    console.log( this.discount,this.total )
  }

  updateItem(item: any): void {
    this.price = item.price
    // Implement the logic to update the item's total when the quantity changes
    item.total = item.price * item.quantity;
    this.calculateCartSummary(); // Recalculate the cart summary after updating
  }

  removeAllItems(){
    this.cartService.clearCart();
    this.cartItems = [];
    this.subtotal = 0;
  this.vatTax = 0;  
  this.discount = 0;
  this.total = 0;
  this.cartItems = this.cartService.getCartItems();
  }

  processSale(): void {

    this.cartService.setSaleProcessed(true)
  }
  
   generateSaleNumber(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().substr(-2); // Last two digits of the year
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month (padded with zero)
    const day = currentDate.getDate().toString().padStart(2, '0'); // Day (padded with zero)
    const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Random 4-digit number
  
    // Combine all parts to create the sale number
    const saleNumber = `${year}${month}${day}-${randomDigits}`;
  
    return saleNumber;
  }
  
  closeReceipt(): void {
    // Set saleProcessed flag to hide the receipt
    this.saleProcessed = false;
  }
  
}
