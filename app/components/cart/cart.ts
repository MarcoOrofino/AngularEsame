import { Component, Output, EventEmitter } from '@angular/core';
import { PizzaCartService } from '../../services/pizza-cart.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})

export class Cart {
  cartItems$: Observable<Pizza[]>;
  total: number = 0;

  constructor(private cartService: PizzaCartService) {
    this.cartItems$ = this.cartService.cartItems$;
    this.cartItems$.subscribe(items => {
      this.total = this.cartService.getTotal();
    });
  }

  removePizza(pizza: Pizza) {
    this.cartService.removePizzaFromCart(pizza.id);
  }

  @Output() close = new EventEmitter<void>();

  @Output() confirmBuy = new EventEmitter<void>();

  @Output() closeCart = new EventEmitter<void>();

  chiudi() {
    this.closeCart.emit();
  }

  getTotal(items: Pizza[]): number {
    return items.reduce((acc: number, item: Pizza) => acc + item.price * item.quantity, 0);
  }


}
