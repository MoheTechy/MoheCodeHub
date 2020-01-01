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

export class ScopeService {


  private apiUrl = environment.apiURL + '/api/masters';

  constructor(
    private http: HttpClient
  ) { }

  getRecord(): any {
    return this.http.get<any>(this.apiUrl + '/').toPromise();
  }

  getIncomeBills(): any {
    return this.http.get<any>(this.apiUrl + '/getIncomeBills').toPromise();
  }

  createIncomeBills(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/addInomeBill', data, httpOptions).pipe(tap());
  }

  updateIncomeBills(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/updateIncomeBill', data, httpOptions).pipe(tap());
  }

  deleteIncomeBills(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/deleteIncomeBill', data, httpOptions).pipe(tap());
  }

  getRecordByID(id): any {
    return this.http.get<any>(this.apiUrl + '/' + id).toPromise();
  }

}


