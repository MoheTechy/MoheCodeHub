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

export class FreelancerService {


  private apiUrl = environment.apiURL + '/api/master/freelancer';

  constructor(
    private http: HttpClient
  ) { }

  getRecord(): any {
    return this.http.get<any>(this.apiUrl + '/').toPromise();
  }

  createRecord(data: any): Observable<any[]> {
    return this.http
      .post<any>(this.apiUrl + '/create', data, httpOptions)
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

}


