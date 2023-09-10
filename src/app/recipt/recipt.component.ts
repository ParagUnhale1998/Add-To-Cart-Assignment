import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-recipt',
  templateUrl: './recipt.component.html',
  styleUrls: ['./recipt.component.scss']
})
export class ReciptComponent {
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
    // this.saleProcessed = this.cartService.saleProcessed;
    this.cartItems = this.cartService.getCartItems();
    this.generateSaleNumber()
    this.calculateCartSummary()
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
   generateSaleNumber(): any {
    this.currentDate = new Date();
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().substr(-2); // Last two digits of the year
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month (padded with zero)
    const day = currentDate.getDate().toString().padStart(2, '0'); // Day (padded with zero)
    const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Random 4-digit number
  
    this.saleNumber = `${year}${month}${day}-${randomDigits}`;
  }
  
  closeReceipt(): void {
    // Set saleProcessed flag to hide the receipt
    this.cartService.setSaleProcessed(false)
  }
  
}
