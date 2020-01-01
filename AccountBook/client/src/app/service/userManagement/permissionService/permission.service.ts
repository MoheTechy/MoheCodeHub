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
export class PermissionService {

  private apiUrl = environment.apiURL + '/api/admin/permission';

  constructor(
    private http: HttpClient
  ) { }

  getRecord(): any {
    return this.http.get<any>(this.apiUrl + '/').toPromise();
  }

  getRecordByID(id): any {
    return this.http.get<any>(this.apiUrl + '/' + id).toPromise();
  }

  getUserRoleByID(id): any {
    return this.http.get<any>(this.apiUrl + '/userRolePermission/' + id).toPromise();
  }

  deleteRecord(data: any): Observable<any[]> {
    return this.http
      .post<any>(this.apiUrl + '/delete', data, httpOptions)
      .pipe(tap());
  }

  createRecord(data: any): Observable<any[]> {
    return this.http
      .post<any>(this.apiUrl + '/insert', data, httpOptions)
      .pipe(tap());
  }

}
