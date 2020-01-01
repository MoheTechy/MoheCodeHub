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

export class EnduserServiceService {

  private APIUrl = environment.apiURL + '/api/masters';
  constructor(private http: HttpClient) { }

  getVehiclesList() :any{
    return this.http.get(this.APIUrl + '/getVehicles').toPromise();
  }

  createVehicle(data: any): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/addVehicle', data, httpOptions).pipe(tap());
  }

  updateVehicle(data: any): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/updateVehicle', data, httpOptions).pipe(tap());
  }

  deleteVehicle(data: any): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/deleteVehicle', data, httpOptions).pipe(tap());
  }

  // getRecordByID(id): any {
  //   return this.http.get<any>(this.APIUrl + '/' + id).toPromise();
  // }
}
