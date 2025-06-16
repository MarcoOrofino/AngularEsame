import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Menu } from './pages/menu/menu';
import { PizzaDetail } from './components/pizza-detail/pizza-detail';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'menu', component: Menu },
  { path: 'pizza-detail/:id', component: PizzaDetail }
];
