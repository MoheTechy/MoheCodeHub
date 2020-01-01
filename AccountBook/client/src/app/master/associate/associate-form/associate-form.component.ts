import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatBottomSheet } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { AssociateServiceService } from '../../../service/master/associateService/associate-service.service';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { CustomValidators } from '../../../general/customValidators';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-associate-form',
  templateUrl: './associate-form.component.html',
  styleUrls: ['./associate-form.component.css']
})
export class AssociateFormComponent implements OnInit {

  associateForm: any;
  user: any;
  isUpdate: boolean = false;
  isNew: boolean = false;
  inputData: any;

  constructor(private globals: Globals,
    private bottomSheet: MatBottomSheet,
    private dialogRef: MatDialogRef<AssociateFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private toaster: ToastrService,
    private authService: AuthService,
    private fb: FormBuilder,
    private associateSerrvice: AssociateServiceService) {
    this.globals.viewName = 'Associate';
    this.associateForm = fb.group({
      'firstName': [null, Validators.compose([Validators.required,CustomValidators.nospaceValidator()])],
      'contactPerson': [null, Validators.compose([Validators.required,CustomValidators.nospaceValidator()])],
      'email': [null, Validators.compose([Validators.required,CustomValidators.emailPattern()])],
      'mobile': [null, Validators.compose([Validators.required,CustomValidators.phoneNumberPattern()])],
      'address': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.user = this.authService.getFromLocalStorage('currentUser');
    if (Object.keys(this.data).length !== 0) {
      this.isUpdate = true;
      this.associateForm.patchValue({
        firstName: this.data.firstName,
        contactPerson: this.data.contactPerson,
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
    return this.associateForm.controls;
  }

  btnClose() {
    if (this.associateForm.dirty) {
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
    this.inputData = Object.assign({}, this.associateForm.value);
    this.inputData.contactCode = '';
    this.inputData.createdBy = this.user.name;
    this.inputData.updatedBy = this.user.name;
    let id: number = this.data.id;
    if (id) {
      this.inputData.id = this.data.id;
      this.associateSerrvice.updateRecord(this.inputData).subscribe(res => {
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
        }
      }, err => {
        throw err
      });
    } else {
      this.associateSerrvice.createRecord(this.inputData).subscribe(res => {
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
        }
      }, err => {
        throw err
      });
    }
  }

}
