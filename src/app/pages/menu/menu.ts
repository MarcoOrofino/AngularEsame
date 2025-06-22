import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Pizza } from '../../models/pizza.model';
import { Cart } from '../../components/cart/cart';
import { PizzaCartService } from '../../services/pizza-cart.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, Cart, RouterModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Menu implements OnInit {
  
  pizze: Pizza[] = [];

  constructor(
    public cartService: PizzaCartService, 
    private http: HttpClient, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.http.get<{ cards: Pizza[] }>('assets/db_pizza.json').subscribe(data => {
      this.pizze = data.cards.map(p => ({ ...p, quantity: 0, hidden: false }));
      this.cdr.detectChanges();
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
    this.cartService.hideCart();
  }

  eliminaPizza(pizza: Pizza): void {
    pizza.hidden = true;
    pizza.quantity = 0;
    this.cartService.removePizzaFromCart(pizza.id);
  }

  openCart() {
    this.cartService.showCart();
  }

  closeCart() {
    this.cartService.hideCart();
  }

  toggleCart() {
    this.cartService.toggleCart();
  }
}
