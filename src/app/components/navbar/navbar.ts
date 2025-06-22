import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PizzaCartService } from '../../services/pizza-cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  constructor(private cartService: PizzaCartService) {}
  
  @Output() closeCartEvent = new EventEmitter<void>();
  @Output() toggleCartEvent = new EventEmitter<void>();

  openCartFromNavbar() {
    this.cartService.showCart();
  }

  closeCart() {
    this.closeCartEvent.emit();
  }

  toggleCart() {
    this.toggleCartEvent.emit();
  }
}
