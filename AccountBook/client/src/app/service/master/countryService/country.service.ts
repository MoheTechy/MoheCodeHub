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

export class CountryService {


  private apiUrl = environment.apiURL + '/api/masters';

  constructor(
    private http: HttpClient
  ) { }

  getRecord(): any {
    return this.http.get<any>(this.apiUrl + '/').toPromise();
  }

  getExpenses(): any {
    return this.http.get<any>(this.apiUrl + '/getExpenses').toPromise();
  }

  createExpense(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addExpense', data, httpOptions).pipe(tap());
  }

  updateExpense(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/updateExpense', data, httpOptions).pipe(tap());
  }

  deleteExpense(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/deleteExpense', data, httpOptions).pipe(tap());
  }

  getRecordByID(id): any {
    return this.http.get<any>(this.apiUrl + '/' + id).toPromise();
  }

  getExpenseHeads(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/getExpenseHeads').pipe(tap());
  }

}


