import { Routes } from '@angular/router';
import { FinanceComponent } from "./finance/finance.component";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'finance', component: FinanceComponent }
];
