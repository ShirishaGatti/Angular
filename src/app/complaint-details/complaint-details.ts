import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-complaint-details',
  styleUrl: './complaint-details.css',
  templateUrl: './complaint-details.html',
})
export class ComplaintDetails {

   complaint: any;

  constructor(private router: Router) {
    this.complaint = this.router.getCurrentNavigation()?.extras.state?.['complaint'];
  }
}
