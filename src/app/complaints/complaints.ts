import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ComplaintService } from '../services/complaintService';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  imports: [NgIf, NgFor, NgClass, FormsModule, RouterLink, NgbPaginationModule],
  selector: 'app-complaints',
  styleUrl: './complaints.css',
  templateUrl: './complaints.html',
})
export class Complaints implements OnInit {

  title = 'FixMyCity Complaints';
  page = 1;
  pageSize = 5;
  complaints: any[] = [];
  totalComplaints = 0;

  constructor(private complaintService: ComplaintService) { }



  // ngOnInit() {
  //   this.complaintService.getComplaints().subscribe(data => {

  //     console.log(data);

  //     this.complaints = data.Complaints;
  //     this.totalComplaints = data.TotalCount;

  //     this.loading = false;
  //   });
  // }

  ngOnInit() {
    this.loadComplaints();
  }

  loadComplaints() {
    

    this.complaintService
      .getComplaints(this.page, this.pageSize)
      .subscribe({
        next: (data) => {
          console.log('DATA:', data);
          this.complaints = data.Complaints;
          this.totalComplaints = data.TotalCount ;

          console.log('Complaints:', this.complaints);
          console.log('TotalCount:', this.totalComplaints);
          console.log('Page:', this.page);
          console.log('PageSize:', this.pageSize);

       
        },

        error: (error) => {
          console.error('API ERROR:', error);
         
        }
      });
  }

  onPageChange(page: number) {
    this.page = page;
    this.loadComplaints();
  }

  onPageSizeChange(newSize: any) {
    this.pageSize = Number(newSize);
    this.page = 1;
    this.loadComplaints();
  }

  getEndRecord(): number {
    return Math.min(
      this.page * this.pageSize,
      this.totalComplaints
    );
  }
  showComplaints = true;
   viewComplaints(): void {
     this.showComplaints = !this.showComplaints;
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
