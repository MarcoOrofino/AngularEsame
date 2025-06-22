import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pizza } from '../models/pizza.model';

@Injectable({ providedIn: 'root' })
export class PizzaCartService {
  private cartItemsSubject = new BehaviorSubject<Pizza[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  getCartItems(): Pizza[] {
    return this.cartItemsSubject.getValue();
  }

   getPizzaById(id: number, pizze: Pizza[]): Pizza | undefined {
    return pizze.find((p: Pizza) => p.id === id);
    }


  setCartItems(items: Pizza[]) {
    this.cartItemsSubject.next([...items]);
  }

  getTotal(): number {
    return this.getCartItems()
      .reduce((acc, pizza) => acc + pizza.price * (pizza.quantity || 0), 0);
  }

  addPizza(pizza: Pizza) {
    if (!pizza.quantity || pizza.quantity <= 0) return;

    const items = [...this.getCartItems()];
    const index = items.findIndex(p => p.id === pizza.id);

    if (index > -1) {
      items[index].quantity += pizza.quantity;
    } else {
      items.push({...pizza});
    }

    this.cartItemsSubject.next(items);
  }

clearCart(): void {
  this.cartItemsSubject.next([]);
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

    removePizzaFromCart(pizzaId: number) {
        const items = this.cartItemsSubject.getValue().filter(pizza => pizza.id !== pizzaId);
        this.cartItemsSubject.next(items);
    }


}

