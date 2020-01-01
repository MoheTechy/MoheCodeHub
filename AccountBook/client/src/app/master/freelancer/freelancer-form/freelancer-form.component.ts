import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatBottomSheet } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { FreelancerService } from '../../../service/master/freelancerService/freelancer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { CustomValidators } from '../../../general/customValidators';
import { Globals } from '../../../globals';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:3000/api/upload';
@Component({
  selector: 'app-freelancer-form',
  templateUrl: './freelancer-form.component.html',
  styleUrls: ['./freelancer-form.component.css']
})
export class FreelancerFormComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  freelancerForm: any;
  user: any;
  isUpdate: boolean = false;
  isNew: boolean = false;
  inputData: any;
  file: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialogRef: MatDialogRef<FreelancerFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private freelancerService: FreelancerService,
    private toaster: ToastrService,
    private authService: AuthService,
    private fb: FormBuilder,
    private globals: Globals
  ) {
    this.globals.viewName = 'Freelancer';
    this.freelancerForm = fb.group({
      'firstName': [null, Validators.compose([Validators.required, CustomValidators.nospaceValidator()])],
      'lastName': [null, Validators.compose([Validators.required, CustomValidators.nospaceValidator()])],
      'email': [null, Validators.compose([Validators.required, CustomValidators.emailPattern()])],
      'mobile': [null, Validators.compose([Validators.required, CustomValidators.phoneNumberPattern()])],
      'address': [null, Validators.compose([Validators.required])],
      'resume':[null,Validators.required]
    });
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      // file.file.name = this.freelancerForm.value.firstName + '_' + this.freelancerForm.value.lastName + '_' + this.file.file.name;
      this.file = file;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
     };

    this.user = this.authService.getFromLocalStorage('currentUser');
    if (Object.keys(this.data).length !== 0) {
      this.isUpdate = true;
      this.freelancerForm.patchValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        mobile: this.data.mobile,
        address: this.data.address
      })
    }
    else {
      this.isNew = true;
    }
  }

  get f() {
    return this.freelancerForm.controls;
  }

  nameChanged() {
    if (this.file) {
      this.file.file.name = this.freelancerForm.value.firstName + '_' + this.freelancerForm.value.lastName + '_' + 'Freelancer' +'_' + this.file.file.name;
    }
  }

  btnClose() {
    if (this.freelancerForm.dirty) {
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
    this.nameChanged();
    this.inputData = {
      firstName: this.freelancerForm.value.firstName,
      lastName: this.freelancerForm.value.lastName,
      resumeFileName:this.file.file.name,
      email: this.freelancerForm.value.email,
      mobile: this.freelancerForm.value.mobile,
      address: this.freelancerForm.value.address,
      createdBy: this.user.name,
      updatedBy: this.user.name
    };
    let id: number = this.data.id;
    if (id) {
      this.inputData.id = this.data.id;
      this.freelancerService.updateRecord(this.inputData).subscribe(res => {
        if (res['statusBool'] == -1) {
          this.toaster.error(res['statusText']);
        }
        else if (res['statusBool'] == -2) {
          this.toaster.error(res['statusText']);
        }
        else if (res['statusBool'] == -3) {
          this.toaster.error(res['statusText']);
        }
        else {
          this.toaster.success(res['statusText']);
          this.dialogRef.close();
          this.uploader.uploadAll();
        }
      }, err => {
        throw err
      });
    } else {
      this.freelancerService.createRecord(this.inputData).subscribe(res => {
        if (res['statusBool'] == -1) {
          this.toaster.error(res['statusText']);
        }
        else if (res['statusBool'] == -2) {
          this.toaster.error(res['statusText']);
        }
        else if (res['statusBool'] == -3) {
          this.toaster.error(res['statusText']);
        }
        else {
          this.toaster.success(res['statusText']);
          this.dialogRef.close();
          this.uploader.uploadAll();
        }
      }, err => {
        throw err
      });
    }
  }

}
