import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WorkOrderService } from '../../../service/transaction/workOrderService/work-order.service';
import { CurrencyService } from '../../../service/master/currencyService/currency.service';
import { MatDialogRef, MatBottomSheet } from '@angular/material';
import { DtpBindFormatService } from '../../../service/general/dtpBindFormatService/dtp-bind-format.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:3000/api/invoiceDocuments';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-job-invoice',
  templateUrl: './add-job-invoice.component.html',
  styleUrls: ['./add-job-invoice.component.css']
})
export class AddJobInvoiceComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  invoiceForm: FormGroup;
  currencyList: any;
  file: any;
  inputData: any;
  user: any;
  statusList: any = [{ 'id': '1', 'status': 'Pending' }, { 'id': '2', 'status': 'Close' }];

  constructor(private fb: FormBuilder,
    private workOrderService: WorkOrderService,
    private currencyService: CurrencyService,
    private dialogRef: MatDialogRef<AddJobInvoiceComponent>,
    private DtpBindFormatService: DtpBindFormatService,
    private bottomSheet: MatBottomSheet,
    private authService: AuthService,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    this.invoiceForm = fb.group({
      'id': '',
      'invoiceDate': [null, Validators.compose([Validators.required])],
      'reminder': [null, Validators.compose([Validators.required])],
      'invoiceAmount': [null, Validators.compose([Validators.required])],
      'currencyCode': [null, Validators.compose([Validators.required])],
      'comment': [null, Validators.compose([Validators.required])],
      'status': [null, Validators.compose([Validators.required])],
      'invoiceDocument': [null, Validators.required]
    })
  }

  get f() {
    return this.invoiceForm.controls;
  }

  ngOnInit() {
    this.user = this.authService.getFromLocalStorage('currentUser');
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.file = file;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    };
    this.fetchAllData();
  }

  nameChanged() {
    if (this.file) {
      this.file.file.name = this.file.file.name;
    }
  }

  fetchAllData() {
    this.currencyService.getRecord().then(res => {
      this.currencyList = res;
    })
  }

  save() {
    let id = this.route.snapshot.queryParams.id;
    this.inputData = {
      jobId: id,
      invoiceDate: (this.DtpBindFormatService.convert(this.invoiceForm.value.invoiceDate)),
      reminder: this.invoiceForm.value.reminder,
      invoiceAmount: this.invoiceForm.value.invoiceAmount,
      currencyCode: this.invoiceForm.value.currencyCode,
      comments: this.invoiceForm.value.comment,
      status: this.invoiceForm.value.status,
      invoiceFileName: this.file.file.name,
      createdBy: this.user.name,
      updatedBy: this.user.name
    }
    this.workOrderService.addInvoice(this.inputData).subscribe(res => {
      if (res['statusBool'] == -1) {
        this.toaster.error(res['statusText']);
      }
      else {
        this.uploader.uploadAll();
        this.toaster.success(res['statusText']);
        this.dialogRef.close();
      }
    }, err => {
      throw err
    });
  }

  btnClose() {
    if (this.invoiceForm.dirty) {
      const bottomSheetRef = this.bottomSheet.open(ConfirmDeleteComponent, {
        data: { deleteItem: false },
        disableClose: false,
        hasBackdrop: true
      });
      bottomSheetRef.afterDismissed().subscribe(result => {
        if (result === true) {
          this.dialogRef.close();
        }
      });
    } else {
      this.dialogRef.close();
    }
  }

}
