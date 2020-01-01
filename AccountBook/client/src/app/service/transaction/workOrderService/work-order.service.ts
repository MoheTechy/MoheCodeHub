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
export class WorkOrderService {

  private datas;
  private apiUrl = environment.apiURL + '/api/transaction/workOrder';

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

  getJobById(id): any {
    return this.http.get<any>(this.apiUrl + '/' + id).toPromise();
  }

  addComment(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/comment/create', data, httpOptions).pipe(tap());
  }

  addResume(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/resume/create', data, httpOptions).pipe(tap());
  }

  getCommentByJobId(id): any {
    return this.http.get<any>(this.apiUrl + '/comment/' + id).toPromise();
  }

  deleteComment(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/comment/delete', data).pipe(tap());
  }


  deleteResume(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/resume/delete', data).pipe(tap());
  }

  addSchedule(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/schedule/create', data, httpOptions).pipe(tap());
  }

  getScheduleByJobId(id): any {
    return this.http.get<any>(this.apiUrl + '/schedule/' + id).toPromise();
  }

  getResumeByJobId(id): any {
    return this.http.get<any>(this.apiUrl + '/resume/' + id).toPromise();
  }
  getdata(data) {
    this.datas = data;
  }
  setData() {
    let temp = this.datas;
    this.clearData();
    return temp;
  }
  clearData() {
    this.datas = undefined;
  }

  // Invoice Services
  getInvoiceByJobId(id): any {
    return this.http.get<any>(this.apiUrl + '/invoice/' + id).toPromise();
  }

  addInvoice(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/invoice/create', data, httpOptions).pipe(tap());
  }

  deleteInvoice(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/invoice/delete', data).pipe(tap());
  }

  addReport(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/report/create', data, httpOptions).pipe(tap());
  }

  getReportByJobId(id): any {
    return this.http.get<any>(this.apiUrl + '/report/' + id).toPromise();
  }

  deleteReport(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/report/delete', data).pipe(tap());
  }

  addPayment(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/payment/create', data, httpOptions).pipe(tap());
  }

  getPaymentByJobId(id): any {
    return this.http.get<any>(this.apiUrl + '/payment/' + id).toPromise();
  }

}