import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ComplaintService } from './services/complaintService';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import {  DatePipe } from '@angular/common';

@Component({
  imports: [NgIf, NgFor, NgClass, FormsModule, RouterLink, NgbPaginationModule, DatePipe],
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

constructor(
    private complaintService: ComplaintService,
    private cdr: ChangeDetectorRef
  ) {}


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
          this.complaints = data.Complaints;
          this.totalComplaints = data.TotalCount;
          this.cdr.markForCheck();   // <-- add this
        },
        error: (error) => {
          console.error('API ERROR:', error);
        }
      });
  }

 onPageChange(page: number) {
  if (page === this.page && this.complaints.length) return;
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

  newComplaint = {
    title: '',
    status: 'Open'
  };
openDetails(complaint: any) {

console.log('Open complaint:', complaint);

// Same approach you were already using
// to pass complaint data to the details page.

}

openChat(complaint: any) {

console.log(
'Open chat:',
complaint.ComplaintId,
complaint.ComplaintNumber
);

}

editComplaint(complaint: any) {

if (complaint.StatusName !== 'Open') {
return;
}

console.log(
'Edit complaint:',
complaint.ComplaintId
);

}

deleteComplaint(id: number) {

if (!confirm('Are you sure you want to delete this complaint?')) {
return;
}

console.log('Delete complaint:', id);

}

confirmResolution(id: number) {

console.log(
'Confirm resolution:',
id
);

}

rejectResolution(id: number) {

console.log(
'Reject resolution:',
id
);

}

exportPdf(id: number) {

console.log(
'Export PDF:',
id
);

}

getPriorityClass(priority: string): string {

if (!priority) {
return '';
}

return priority
.toLowerCase()
.replace(/\s+/g, '');

}

getStatusClass(status: string): string {

switch (status) {

case 'Open':
  return 'open';

case 'In Progress':
  return 'inprogress';

case 'Resolved':
  return 'resolved';

case 'Closed':
  return 'closed';

case 'Awaiting Customer Confirmation':
  return 'awaiting';

default:
  return '';

}

}

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
