import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pizza } from '../../models/pizza.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pizza-detail',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './pizza-detail.html',
  styleUrls: ['./pizza-detail.css']
})
export class PizzaDetail implements OnInit {
  pizza: Pizza | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get<{ cards: Pizza[] }>('assets/db_pizza.json').subscribe(data => {
      this.pizza = data.cards.find(p => p.id === id);
      this.cdr.detectChanges();
    });
  }
  
  goBackToMenu() {
    this.router.navigate(['/menu']);
  }
}
