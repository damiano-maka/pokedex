import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: 'welcome',loadComponent: () => import('./pages/welcome.component')},
    {path: 'pokemons',loadComponent: () => import('./pages/pokemons.component')},
    {path: ':name',loadComponent: () => import('./pages/pokemon-details.component')},
];
