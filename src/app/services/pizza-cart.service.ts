import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pizza } from '../models/pizza.model';

@Injectable({
  providedIn: 'root',
})
export class PizzaCartService {
  private cartItemsSubject = new BehaviorSubject<Pizza[]>([]);
  private _requestOpenCart = signal(false);
  cartItems$: Observable<Pizza[]> = this.cartItemsSubject.asObservable();

  isCartVisible = signal(false);

  showCart() {
    this.isCartVisible.set(true);
  }

  hideCart() {
    this.isCartVisible.set(false);
  }

  toggleCart() {
    this.isCartVisible.update(v => !v);
  }

  addPizzaToCart(pizza: Pizza) {
    const currentItems = this.cartItemsSubject.getValue();
    const existing = currentItems.find(item => item.id === pizza.id);

    if (existing) {
      existing.quantity += pizza.quantity;
    } else {
      currentItems.push({ ...pizza });
    }

    this.cartItemsSubject.next([...currentItems]);
  }

  removePizzaFromCart(pizzaId: number) {
    const updatedItems = this.cartItemsSubject
      .getValue()
      .filter(pizza => pizza.id !== pizzaId);

    this.cartItemsSubject.next(updatedItems);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

  getCartTotal(): number {
    return this.cartItemsSubject
      .getValue()
      .reduce((acc, pizza) => acc + pizza.price * pizza.quantity, 0);
  }

  resetCart(): void {
    this.cartItemsSubject.next([]);
  }

  updateQuantity(pizza: Pizza) {
    const items = [...this.cartItemsSubject.getValue()];
    const index = items.findIndex(p => p.id === pizza.id);

    if (index >= 0) {
      items[index].quantity = pizza.quantity;
      this.cartItemsSubject.next(items);
    } else {
      this.cartItemsSubject.next([...items, { ...pizza }]);
    }
  }

  get requestOpenCart() {
    return this._requestOpenCart();
  }

  triggerOpenCart() {
    this._requestOpenCart.set(true);
    setTimeout(() => this._requestOpenCart.set(false), 100);
  }
}
