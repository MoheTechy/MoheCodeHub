import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatBottomSheet, MatDialogRef } from "@angular/material";
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { WorkOrderService } from '../../../service/transaction/workOrderService/work-order.service';
const URL = 'http://localhost:3000/api/report';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-report-form',
  templateUrl: './job-report-form.component.html',
  styleUrls: ['./job-report-form.component.css']
})
export class JobReportFormComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  reportForm: any;
  user: any;
  inputData: any;
  file: any;
  temp: any;

  constructor(
    private fb: FormBuilder,
    private workOrderService: WorkOrderService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<JobReportFormComponent>,
    private bottomSheet: MatBottomSheet,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) {
    this.reportForm = fb.group({
      'reportName': [null, Validators.required],
      'report': [null],
      'clientVerified': [null, Validators.required]
    });
  }

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.file = file;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    };
    this.user = this.authService.getFromLocalStorage('currentUser');
  }

  nameChanged() {
    if (this.file) {
      this.file.file.name = this.reportForm.value.reportName + '_' + this.file.file.name;
    }
  }

  get f() {
    return this.reportForm.controls;
  }

  btnClose() {
    if (this.reportForm.dirty) {
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

  save(): void {
    let id: number = this.route.snapshot.queryParams.id;
    this.nameChanged();
    this.inputData = {
      jobId: id,
      reportName: this.reportForm.value.reportName,
      reportFileName: this.file.file.name,
      clientVerified: this.reportForm.value.clientVerified,
      createdBy: this.user.name,
      updatedBy: this.user.name
    };
    this.workOrderService.addReport(this.inputData).subscribe(res => {
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

}

