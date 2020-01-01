import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WorkOrderService } from '../../../service/transaction/workOrderService/work-order.service';
import { CurrencyService } from '../../../service/master/currencyService/currency.service';
import { MatDialogRef, MatBottomSheet } from '@angular/material';
import { DtpBindFormatService } from '../../../service/general/dtpBindFormatService/dtp-bind-format.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:3000/api/payment';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-payment-form',
  templateUrl: './job-payment-form.component.html',
  styleUrls: ['./job-payment-form.component.css']
})
export class JobPaymentFormComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  paymentForm: FormGroup;
  currencyList: any;
  file: any;
  types: any;
  type: any;
  inputData: any;
  user: any;

  constructor(private fb: FormBuilder,
    private workOrderService: WorkOrderService,
    private currencyService: CurrencyService,
    private dialogRef: MatDialogRef<JobPaymentFormComponent>,
    private DtpBindFormatService: DtpBindFormatService,
    private bottomSheet: MatBottomSheet,
    private authService: AuthService,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    this.paymentForm = fb.group({
      'id': '',
      'paymentDate': [null, Validators.compose([Validators.required])],
      'paymentStatus': [null, Validators.compose([Validators.required])],
      'invoiceAmount': [null, Validators.compose([Validators.required])],
      'currencyCode': [null, Validators.compose([Validators.required])],
      'status': [null, Validators.compose([Validators.required])],
      'paymentDocument': [null, Validators.required]
    })
  }

  get f() {
    return this.paymentForm.controls;
  }

  ngOnInit() {
    this.types = [
      { id: 1, name: 'Associate' },
      { id: 2, name: 'Freelancer' }
    ]
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

  getType(types) {
    this.type = types.id;
  }

  save() {
    let id = this.route.snapshot.queryParams.id;
    this.inputData = {
      jobId: id,
      paymentDate: (this.DtpBindFormatService.convert(this.paymentForm.value.paymentDate)),
      paymentStatus: this.paymentForm.value.paymentStatus,
      invoiceAmount: this.paymentForm.value.invoiceAmount,
      currencyCode: this.paymentForm.value.currencyCode,
      status: this.paymentForm.value.status,
      paymentFileName: this.file.file.name,
      createdBy: this.user.name,
      updatedBy: this.user.name,
      type: this.type
    }
    this.workOrderService.addPayment(this.inputData).subscribe(res => {
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
    if (this.paymentForm.dirty) {
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

