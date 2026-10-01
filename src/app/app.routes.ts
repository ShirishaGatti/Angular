import { Routes } from '@angular/router';
export const routes: Routes = [
  {    path: 'dashboard',loadComponent: () =>import('./features/dashboard/dashboard')
        .then(m => m.Dashboard)
  },
  {
    path: 'complaints', loadComponent: () => import('./features/complaints/complaints')
        .then(m => m.Complaints)
  },
  {
    path: 'complaint/:id', loadComponent: () => import('./features/complaints/complaint-details/complaint-details')
        .then(m => m.ComplaintDetails)
  },
  {
    path: 'login',loadComponent: () =>import('./features/auth/auth')
        .then(m => m.Auth)
  },
  {
    path: '', loadComponent: () =>import('./features/home/home')
        .then(m => m.Home)
  },
  // {
  //   path:'complaints/add', loadComponent: () => import('./features/complaints/add-complaint/add-complaint')
  //       .then(m => m.AddComplaint)
  // }
];
