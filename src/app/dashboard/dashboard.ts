import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [UpperCasePipe, RouterLink],
  standalone: true,
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {

  title = 'FixMyCity Dashboard';
  totalComplaints = 3;
  userName = 'Shirisha';

}