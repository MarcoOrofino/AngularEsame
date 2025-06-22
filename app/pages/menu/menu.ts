import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Pizza } from '../../models/pizza.model';
import { Cart } from '../../components/cart/cart';
import { PizzaCartService } from '../../services/pizza-cart.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, Cart, RouterModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu implements OnInit {
  pizze: Pizza[] = [];
  showCart = false;

  cartItems$: Observable<Pizza[]>;

  constructor(private cartService: PizzaCartService, private http: HttpClient, private router: Router) {
    this.cartItems$ = this.cartService.cartItems$;
  }
  
  testClick(id: number) {
  console.log('[Menu] cliccato link pizza id:', id);
}

  ngOnInit(): void {
    this.http.get<{ cards: Pizza[] }>('assets/db_pizza.json').subscribe((data) => {
      this.pizze = data.cards.map(p => ({ ...p, quantity: 0, hidden: false }));
    });
  }

  increaseQuantity(pizza: Pizza) {
    const newQty = (pizza.quantity || 0) + 1;
    this.updatePizzaQuantity(pizza, newQty);
  }

  decreaseQuantity(pizza: Pizza) {
    const newQty = (pizza.quantity || 0) - 1;
    if (newQty <= 0) {
      this.cartService.removePizzaFromCart(pizza.id);
      pizza.quantity = 0;
    } else {
      this.updatePizzaQuantity(pizza, newQty);
    }
  }

  private updatePizzaQuantity(pizza: Pizza, quantity: number) {
    pizza.quantity = quantity;
    this.cartService.updateQuantity(pizza);
  }
  
  confermaAcquisto() {
    for (const pizza of this.pizze) {
      pizza.quantity = 0;
      pizza.hidden = false;
    }

    this.cartService.resetCart();
  }


  eliminaPizza(pizza: Pizza): void {
    pizza.hidden = true;
    pizza.quantity = 0;
    this.cartService.removePizzaFromCart(pizza.id);
  }

  openCart() {
    this.showCart = true;
  }

  closeCart() {
    this.showCart = false;
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

}
