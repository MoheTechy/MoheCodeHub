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

export class RoleManagementService {

  private apiUrl = environment.apiURL + '/api/admin/roles';

  constructor(
    private http: HttpClient
  ) { }

  getRecord(): any {
    return this.http.get<any>(this.apiUrl + '/').toPromise();
  }

  createRecord(data: any): Observable<any[]> {
    return this.http
      .post<any>(this.apiUrl + '/insert', data, httpOptions)
      .pipe(tap());
  }

  updateRecord(data: any): Observable<any[]> {
    return this.http
      .post<any>(this.apiUrl + '/update', data, httpOptions)
      .pipe(tap());
  }

  deleteRecord(data: any): Observable<any[]> {
    return this.http
      .post<any>(this.apiUrl + '/delete', data, httpOptions)
      .pipe(tap());
  }

  getRecordByID(id): any {
    return this.http.get<any>(this.apiUrl + '/' + id).toPromise();
  }

  updateRolePermissionRecord(data: any): Observable<any[]> {
    return this.http
      .post<any>(this.apiUrl + '/updateRolePermission', data, httpOptions)
      .pipe(tap());
  }

}
