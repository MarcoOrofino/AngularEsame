import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PizzaDetail } from './components/pizza-detail/pizza-detail';
import { Menu } from './pages/menu/menu';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'menu', component: Menu },
  { path: 'pizza-detail/:id', component: PizzaDetail },
  { path: '**', redirectTo: '' }
];
