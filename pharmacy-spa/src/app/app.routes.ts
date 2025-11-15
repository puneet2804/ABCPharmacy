import { Routes } from '@angular/router';
import { MedicinesComponent } from './pages/medicines/medicines.component';
import { SalesComponent } from './pages/sales/sales.component';

export const routes: Routes = [
  { path: '', component: MedicinesComponent },
  { path: 'sales', component: SalesComponent },
  { path: '**', redirectTo: '' }
];