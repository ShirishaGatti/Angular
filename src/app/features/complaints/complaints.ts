import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NgClass } from '@angular/common';
import { FormsModule,NgForm } from '@angular/forms';
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

 
loadComplaints() { // Keep pagination values inside the filter object 
 this.filters.PageNumber = this.page; 
 this.filters.PageSize = this.pageSize; 
 console.log('Sending filters:', this.filters);
  this.complaintService.getComplaints(this.filters).subscribe(
    { next: (data) => { console.log('API DATA:', data);
       this.complaints = data.Complaints || [];
        this.totalComplaints = data.TotalCount || 0; // Load dropdown values from API 
        this.statuses = data.Statuses || [];
         this.categories = data.Categories || [];
           this.categories = data.Categories || [];
  this.priorities = data.Priorities || [];
  this.cities = data.Cities || [];
          // console.log('Statuses:', this.statuses); 
          // console.log('Categories:', this.categories); 
          this.cdr.markForCheck();
         },
         error: (error) => { console.error('API ERROR:', error); 

         } 
    });
  }

onPageChange(page: number) {

  this.page = page;

  this.filters.PageNumber = page;

  this.loadComplaints();
}


onPageSizeChange(newSize: any) {

  this.pageSize = Number(newSize);

  this.page = 1;

  this.filters.PageSize = this.pageSize;
  this.filters.PageNumber = 1;

  this.loadComplaints();
}

  getEndRecord(): number {
    return Math.min(
      this.page * this.pageSize,
      this.totalComplaints
    );
  }
// ================= FILTERS =================

filters = {
  Title: '',
  StatusId: null,
  CategoryId: null,
  DateFrom: null,
  DateTo: null,
  PageNumber: 1,
  PageSize: 5,
  SortField: 'CreatedAt',
  SortDirection: 'DESC'
};


// Dropdown data
statuses: any[] = [];
categories: any[] = [];


// Today's date for date input max
today = new Date().toISOString().split('T')[0];

  newComplaint = {
    title: '',
    status: 'Open'
  };
openDetails(complaint: any) {

console.log('Open complaint:', complaint);

// Same approach you were already using
// to pass complaint data to the details page.

}
applyFilters() {

  console.log('Applying filters:', this.filters);

  // Validate dates
  if (this.filters.DateFrom && this.filters.DateTo) {

    if (this.filters.DateFrom > this.filters.DateTo) {

      alert('"From" date must be before or equal to "To" date.');

      return;
    }
  }

  // Start from first page
  this.page = 1;

  this.filters.PageNumber = 1;
  this.filters.PageSize = this.pageSize;

  this.loadComplaints();
}


clearFilters() {

  this.filters = {
    Title: '',
    StatusId: null,
    CategoryId: null,
    DateFrom: null,
    DateTo: null,
    PageNumber: 1,
    PageSize: this.pageSize,
    SortField: 'CreatedAt',
    SortDirection: 'DESC'
  };

  this.page = 1;

  this.loadComplaints();
}


  openChat(complaint: any) {

  console.log(
  'Open chat:',
  complaint.ComplaintId,
  complaint.ComplaintNumber
  );

  }

 editComplaint(complaint: any): void {

  if (complaint.StatusName !== 'Open') {
    return;
  }

  console.log('Editing complaint:', complaint);

  this.isEditMode = true;

  this.complaint = {
    ComplaintId: complaint.ComplaintId,
    Title: complaint.Title || '',
    Description: complaint.Description || '',
    CategoryId: complaint.CategoryId ?? null,
    PriorityId: complaint.PriorityId ?? null,
    CityId: complaint.CityId ?? null,
    WardId: complaint.WardId ?? null,
    AddressLine: complaint.AddressLine || '',
    Landmark: complaint.Landmark || ''
  };

  this.selectedFiles = [];

  // Open the same modal
  this.showComplaintModal = true;

  // Load wards for existing city
  this.wards = [];

  if (this.complaint.CityId) {

    this.complaintService
      .getWards(this.complaint.CityId)
      .subscribe({
        next: (response) => {

          this.wards = response || [];

          console.log('Wards loaded for edit:', this.wards);
          console.log('Selected Ward:', this.complaint.WardId);
          this.cdr.markForCheck();
        },
        error: (error) => {

          console.error('Failed to load wards:', error);

          this.showToastMessage(
            'Unable to load wards.',
            'error'
          );
        }
      });
  }
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

  showComplaintModal = false;

  isEditMode = false;

  isSaving = false;


  complaint: any = {
    ComplaintId: null,
    Title: '',
    Description: '',
    CategoryId: null,
    PriorityId: null,
    CityId: null,
    WardId: null,
    AddressLine: '',
    Landmark: ''
  };


//  categories: any[] = [];

  priorities: any[] = [];

  cities: any[] = [];

  wards: any[] = [];


  selectedFiles: File[] = [];

  maxAttachmentSizeMB = 5;

  allowedExtensionsCsv =
    '.jpg,.jpeg,.png,.pdf,.doc,.docx';
  openAddComplaint(): void {

    this.showComplaintModal = true;

    this.isEditMode = false;

    this.complaint = {
      ComplaintId: null,
      Title: '',
      Description: '',
      CategoryId: null,
      PriorityId: null,
      CityId: null,
      WardId: null,
      AddressLine: '',
      Landmark: ''
    };

    this.wards = [];

    this.selectedFiles = [];
  }

  onCityChange(): void {

    this.complaint.WardId = null;

    this.wards = [];

    if (!this.complaint.CityId) {
      return;
    }

    // Call your API here
    this.complaintService.getWards(this.complaint.CityId)
      .subscribe(response => {
         this.wards = response;
      });

  }


  onAttachmentsSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    const files = Array.from(input.files);

    // Maximum 5 files
    if (files.length > 5) {

      alert('You can upload maximum 5 files.');

      input.value = '';

      return;
    }

    this.selectedFiles = files;

  }


  removeAttachment(index: number): void {

    this.selectedFiles.splice(index, 1);

  }

saveComplaint(form: NgForm): void {

  // Required field validation
  if (form.invalid) {
    form.control.markAllAsTouched();

    this.showToastMessage(
      'Please enter all required fields.',
      'error'
    );

    return;
  }

  this.isSaving = true;

  const formData = new FormData();

  formData.append(
    'ComplaintId',
    String(this.complaint.ComplaintId ?? '')
  );

  formData.append(
    'Title',
    String(this.complaint.Title ?? '')
  );

  formData.append(
    'Description',
    String(this.complaint.Description ?? '')
  );

  formData.append(
    'CategoryId',
    String(this.complaint.CategoryId ?? '')
  );

  formData.append(
    'PriorityId',
    String(this.complaint.PriorityId ?? '')
  );

  formData.append(
    'CityId',
    String(this.complaint.CityId ?? '')
  );

  formData.append(
    'WardId',
    String(this.complaint.WardId ?? '')
  );

  formData.append(
    'AddressLine',
    String(this.complaint.AddressLine ?? '')
  );

  formData.append(
    'Landmark',
    String(this.complaint.Landmark ?? '')
  );

  this.selectedFiles.forEach(file => {
    formData.append(
      'Attachments',
      file,
      file.name
    );
  });

 this.complaintService.saveComplaint(formData)
  .subscribe({
    next: (response) => {

      this.isSaving = false;
      this.showComplaintModal = false;

      this.showToastMessage(
        'Complaint submitted successfully!',
        'success'
      );

      this.loadComplaints();
    },

    error: (error) => {

      this.isSaving = false;

      this.showToastMessage(
        'Complaint was saved, but server returned an error.',
        'error'
      );
    }
  });

}
showToastMessage(
  message: string,
  type: 'success' | 'error'
): void {
  this.toastMessage = message;
  this.toastType = type;
  this.showToast = true;

  setTimeout(() => {
    this.showToast = false;
  }, 3000);
}

showToast = false;
toastMessage = '';
toastType: 'success' | 'error' = 'success';

  closeComplaintModal(event?: Event): void {

  if (event) {
    event.stopPropagation();
  }

  this.showComplaintModal = false;
}
}
