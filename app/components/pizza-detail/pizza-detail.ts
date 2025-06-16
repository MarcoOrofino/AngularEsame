import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pizza } from '../../models/pizza.model';
import { PizzaCartService } from '../../services/pizza-cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-detail',
    imports: [CommonModule],
  standalone: true,
  templateUrl: './pizza-detail.html',
  styleUrls: ['./pizza-detail.css']
})

export class PizzaDetail implements OnInit {
  pizze: Pizza[] = [];
  pizza: Pizza | undefined;

  constructor(
    private route: ActivatedRoute,
    private pizzaService: PizzaCartService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
  console.log('ngOnInit PizzaDetail - start');

  const id = +this.route.snapshot.paramMap.get('id')!;

  this.http.get<{ cards: Pizza[] }>('assets/db_pizza.json').subscribe({
    next: data => {
      this.pizze = data.cards.map(p => ({ ...p, quantity: 0, hidden: false }));

      this.pizza = this.pizzaService.getPizzaById(id, this.pizze);
    }
    
  });
}

}
