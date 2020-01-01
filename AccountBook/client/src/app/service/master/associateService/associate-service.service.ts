import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssociateServiceService {

  private APIUrl = environment.apiURL + '/api/master/associate';
  constructor(private http: HttpClient) { }

  getAssociates() :any{
    return this.http.get(this.APIUrl + '/').toPromise();
  }   
  
  createRecord(data: any): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/create', data).pipe(tap());
  }

  updateRecord(data: any): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/update', data).pipe(tap());
  }

  deleteRecord(data: any): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/delete', data).pipe(tap());
  }

  getRecordByID(id): any {
    return this.http.get<any>(this.APIUrl + '/' + id).toPromise();
  }

}
