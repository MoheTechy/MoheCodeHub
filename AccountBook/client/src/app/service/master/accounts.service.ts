import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private apiUrl = environment.apiURL + '/api/accounts';

  constructor(
    private http: HttpClient
  ) { }

  getRecord(): any {
    return this.http.get<any>(this.apiUrl + '/getAccountHeads', httpOptions).toPromise();
  }

  getAccounts(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/getAccounts', httpOptions).pipe(tap());
  }

  getVehicles(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/getVehicles', httpOptions).pipe(tap());
  }

  getAccountByID(id): any {
    return this.http.get<any>(this.apiUrl + '/getAccountByID/' + id , httpOptions).toPromise();
  }

  createRecord(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addAccount', data, httpOptions).pipe(tap());
  }

  updateRecord(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/updateAccount', data, httpOptions).pipe(tap());
  }

  removeAccount(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/deleteAccount', data, httpOptions).pipe(tap());
  }

}
