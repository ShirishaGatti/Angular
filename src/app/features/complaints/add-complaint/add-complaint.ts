import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ComplaintService } from '../services/complaintService';
@Component({
  selector: 'app-complaint',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf  ],
  templateUrl: './add-complaint.html'
})
export class AddComplaint {
  constructor(private complaintService: ComplaintService) {}
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


  categories: any[] = [];

  priorities: any[] = [];

  cities: any[] = [];

  wards: any[] = [];


  selectedFiles: File[] = [];

  maxAttachmentSizeMB = 5;

  allowedExtensionsCsv =
    '.jpg,.jpeg,.png,.pdf,.doc,.docx';


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

    if (form.invalid) {
      return;
    }

    this.isSaving = true;

    const formData = new FormData();

    formData.append(
      'ComplaintId',
      this.complaint.ComplaintId ?? ''
    );

    formData.append(
      'Title',
      this.complaint.Title
    );

    formData.append(
      'Description',
      this.complaint.Description
    );

    formData.append(
      'CategoryId',
      this.complaint.CategoryId
    );

    formData.append(
      'PriorityId',
      this.complaint.PriorityId
    );

    formData.append(
      'CityId',
      this.complaint.CityId
    );

    formData.append(
      'WardId',
      this.complaint.WardId
    );

    formData.append(
      'AddressLine',
      this.complaint.AddressLine
    );

    formData.append(
      'Landmark',
      this.complaint.Landmark || ''
    );


    // Attachments
    this.selectedFiles.forEach(file => {

      formData.append(
        'Attachments',
        file,
        file.name
      );

    });


    
    this.complaintService.saveComplaint(formData)
      .subscribe({
         next: response => {
             this.isSaving = false;
             this.closeComplaintModal();
         },
         error: error => {
             this.isSaving = false;
             console.error(error);
         }
      });

  }


  closeComplaintModal(event?: Event): void {

    if (event) {
      event.stopPropagation();
    }

    this.showComplaintModal = false;

  }

}