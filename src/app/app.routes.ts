import { Routes } from '@angular/router';
import { AccueilComponent } from '../Pages/accueil/accueil';

export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  {
    path: 'accueil',
    loadComponent: () => import('../Pages/accueil/accueil').then((m) => m.AccueilComponent),
  },
];
