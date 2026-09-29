import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Complaints } from './features/complaints/complaints';
import { Home } from './features/home/home';
import { Auth } from './features/auth/auth';
import { ComplaintDetails } from './features/complaints/complaint-details/complaint-details';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'complaints', component: Complaints },
  {path: '', component: Home},
  {path: 'login',component:Auth},
  {path:'complaint/:id',component:ComplaintDetails}
];