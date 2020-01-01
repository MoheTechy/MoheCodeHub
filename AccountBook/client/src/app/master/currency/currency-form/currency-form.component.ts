import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatBottomSheet } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { CurrencyService } from '../../../service/master/currencyService/currency.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { CustomValidators } from '../../../general/customValidators';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.css']
})
export class CurrencyFormComponent implements OnInit {

  currencyForm: any;
  user: any;
  isUpdate: boolean = false;
  isNew: boolean = false;
  inputData: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialogRef: MatDialogRef<CurrencyFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private currencyService: CurrencyService,
    private toaster: ToastrService,
    private authService: AuthService,
    private fb: FormBuilder,
    private globals: Globals
  ) {
    this.globals.viewName = 'Currency';
    this.currencyForm = fb.group({
      'currencyCode': [null, Validators.compose([Validators.required, CustomValidators.nospaceValidator()])],
      'currencyName': [null, Validators.compose([Validators.required, CustomValidators.nospaceValidator()])]
    });
  }

  ngOnInit() {
    this.user = this.authService.getFromLocalStorage('currentUser');
    if (Object.keys(this.data).length !== 0) {
      this.isUpdate = true;
      this.currencyForm.patchValue({
        currencyCode: this.data.currencyCode,
        currencyName: this.data.currencyName,
      })
    }
    else {
      this.isNew = true;
    }
  }

  get f() {
    return this.currencyForm.controls;
  }

  btnClose() {
    if (this.currencyForm.dirty) {
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
    this.inputData = {
      currencyCode: this.currencyForm.value.currencyCode,
      currencyName: this.currencyForm.value.currencyName,
      createdBy: this.user.name,
      updatedBy: this.user.name
    };
    let id: number = this.data.id;
    if (id) {
      this.inputData.id = this.data.id;
      this.currencyService.updateRecord(this.inputData).subscribe(res => {
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
      this.currencyService.createRecord(this.inputData).subscribe(res => {
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


