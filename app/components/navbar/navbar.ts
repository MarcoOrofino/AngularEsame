import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cart } from '../cart/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, Cart, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  showCart = false;

  toggleCart() {
    this.showCart = !this.showCart;
  }
}