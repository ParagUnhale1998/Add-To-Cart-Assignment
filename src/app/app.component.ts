import { Component,OnDestroy } from '@angular/core';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'products-cart';
  saleProcessed: boolean = false;
  saleProcessedSubscription: Subscription; // To hold the subscription

  constructor(private cartService: CartService) {
    this.saleProcessedSubscription = this.cartService.saleProcessedUpdates.subscribe((status) => {
      this.saleProcessed = status;
      if (this.saleProcessed) {
        // Sale has been processed, you can perform actions here
      }
    });
  }
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    // Unsubscribe from the subscription to avoid memory leaks
    this.saleProcessedSubscription.unsubscribe();}
}
