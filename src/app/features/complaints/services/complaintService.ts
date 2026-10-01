import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) {}

//  getComplaints(pageNumber: number, pageSize: number) {
//   return this.http.get<any>(
//     'http://localhost:51733/api/citizen/complaints',
//     {
//       params: {
//         pageNumber: pageNumber,
//         pageSize: pageSize
//       }
//     }
//   );
// }
 getComplaints(filter: any) {

  return this.http.get<any>(
    'http://localhost:51733/api/citizen/complaints',
    {
      params: filter
    }
  );
 
 }
  getWards(cityId: number) {
    return this.http.get<any>(
      `http://localhost:51733/api/citizen/wards/${cityId}`
    );
  }
  saveComplaint(complaint: any) {
    return this.http.post<any>(
      'http://localhost:51733/api/citizen/saveComplaint',
      complaint
    );
  }
}