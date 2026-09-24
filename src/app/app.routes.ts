import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Complaints } from './complaints/complaints';
import { Home } from './home/home';
import { Auth } from './auth/auth';
import { ComplaintDetails } from './complaint-details/complaint-details';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'complaints', component: Complaints },
  {path: '', component: Home},
  {path: 'login',component:Auth},
  {path:'complaint/:id',component:ComplaintDetails}
];