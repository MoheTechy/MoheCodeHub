import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private _http: HttpClient) { }

  downloadFile(file: String) {
    var body = { filename: file };

    return this._http.post('http://localhost:3000/api/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  downloadResumeFile(file: String) {
    var body = { filename: file };

    return this._http.post('http://localhost:3000/api/resumeDownload', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  downloadReportFile(file: String) {
    var body = { filename: file };

    return this._http.post('http://localhost:3000/api/reportDownload', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  downloadInvoice(file: String) {
    var body = { filename: file };

    return this._http.post('http://localhost:3000/api/invoiceDocumentsDownload', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  downloadPayment(file: String) {
    var body = { filename: file };

    return this._http.post('http://localhost:3000/api/paymentDownload', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  deleteReportFile(file: String) {
    var body = { filename: file };
    return this._http.post('http://localhost:3000/api/deleteReport', body, {
    });
  }

  deleteResumeFile(file: String) {
    var body = { filename: file };
    return this._http.post('http://localhost:3000/api/deleteResume', body, {
    });
  }

  deleteTemplateFile(file: String) {
    var body = { filename: file };
    return this._http.post('http://localhost:3000/api/deleteTemplate', body, {
    });
  }

}
