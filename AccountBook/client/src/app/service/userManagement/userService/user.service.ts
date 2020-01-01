import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = environment.apiURL + '/api/admin/users';

  constructor
    (
      private http: HttpClient
    ) { }

  getRecord(): any {
    return this.http.get<any>(this.apiUrl + '/').toPromise();
  }

  getRecordById(id): any {
    return this.http.get<any>(this.apiUrl + '/' + id).toPromise();
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

  deleteRecord(id: number): Observable<number[]> {
    return this.http
      .post<any>(this.apiUrl + '/delete', id, httpOptions)
      .pipe(tap());
  }

  resetPassword(data: any): Observable<any[]> {
    return this.http
      .post<any>(this.apiUrl + '/resetPassword', data, httpOptions)
      .pipe(tap());
  }

  changePassword(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/updatepassword', data, httpOptions)
      .pipe(tap());
  }

  updateLock(data: any): Observable<any[]> {
    return this.http
      .post<any>(this.apiUrl + '/updateLock', data, httpOptions)
      .pipe(tap());
  }

}
