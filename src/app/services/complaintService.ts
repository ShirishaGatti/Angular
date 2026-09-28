import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) {}

 getComplaints(pageNumber: number, pageSize: number) {
  return this.http.get<any>(
    'http://localhost:51733/api/citizen/complaints',
    {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize
      }
    }
  );
}
}