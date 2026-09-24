import { Component, OnInit } from '@angular/core';
import { NgIf,NgFor } from '@angular/common';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ComplaintService } from '../services/complaintService';
@Component({
  imports: [NgIf, NgFor,  NgClass, FormsModule, RouterLink],
  selector: 'app-complaints',
  styleUrl: './complaints.css',
  templateUrl: './complaints.html',
})
export class Complaints implements OnInit {

  title = 'FixMyCity Complaints';

  complaints: any[] = [];
  totalComplaints = 0;

  constructor(private complaintService: ComplaintService) {}

  loading = true;

ngOnInit() {
  this.complaintService.getComplaints().subscribe(data => {

    console.log(data);

    this.complaints = data.Complaints;
    this.totalComplaints = data.TotalCount;

    this.loading = false;
  });
}
   showComplaints = false;
  viewComplaints():void {
   this.showComplaints=!this.showComplaints;
  }
  
  // totalComplaints = this.complaints.length;
  
  isDisabled = false; 
  hasComplaints() {
    return this.totalComplaints > 0;
  }
  add=false
  addComplaint() {
    this.add=!this.add;
  }
 newComplaint = {
  title: '',
  status: 'Open'
};

submitComplaint() {

  const complaint = {
    id: this.totalComplaints + 101,
    title: this.newComplaint.title,
    status: this.newComplaint.status
  };

  this.complaints.push(complaint);
  this.totalComplaints++;

  // Clear form after submit
  this.newComplaint = {
    title: '',
    status: 'Open'
  };
}
}
