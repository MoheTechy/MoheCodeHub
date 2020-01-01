import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class LocationService {


  private apiUrl = environment.apiURL + '/api/masters';

  constructor(
    private http: HttpClient
  ) { }

  getRecord(): any {
    return this.http.get<any>(this.apiUrl + '/').toPromise();
  }

  getAllStaffs(): any {
    return this.http.get<any>(this.apiUrl + '/getStaffs').toPromise();
  }

  createStaff(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/addStaff', data, httpOptions).pipe(tap());
  }

  updateStaff(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/updateStaff', data, httpOptions).pipe(tap());
  }

  deleteStaff(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/deleteStaff', data, httpOptions).pipe(tap());
  }

  getStaffByID(id): any {
    return this.http.get<any>(this.apiUrl + '/getStaffByID/' + id).toPromise();
  }

  getStaffByType(staffType): any {
    return this.http.get<any>(this.apiUrl + '/getStaffByType/' + staffType).toPromise();
  }

}


