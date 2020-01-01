import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatBottomSheet } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ClientService } from '../../../service/master/clientService/client.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { CustomValidators } from '../../../general/customValidators';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  clientForm: any;
  user: any;
  isUpdate: boolean = false;
  isNew: boolean = false;
  inputData: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private clientService: ClientService,
    private toaster: ToastrService,
    private authService: AuthService,
    private fb: FormBuilder,
    private globals:Globals
  ) {
    this.globals.viewName = 'Client'
    this.clientForm = fb.group({
      'clientName': [null, Validators.compose([Validators.required,CustomValidators.nospaceValidator()])],
      'clientShortName': [null, Validators.compose([Validators.required,CustomValidators.nospaceValidator()])],
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
      this.clientForm.patchValue({
        clientName: this.data.clientName,
        clientShortName: this.data.clientShortName,
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
    return this.clientForm.controls;
  }

  btnClose() {
    if (this.clientForm.dirty) {
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
      clientName: this.clientForm.value.clientName,
      clientShortName: this.clientForm.value.clientShortName,
      contactPerson: this.clientForm.value.contactPerson,
      email: this.clientForm.value.email,
      contactCode:null,
      mobile: this.clientForm.value.mobile,
      address: this.clientForm.value.address,
      createdBy: this.user.name,
      updatedBy: this.user.name
    };
    let id: number = this.data.id;
    if (id) {
      this.inputData.id = this.data.id;
      this.clientService.updateRecord(this.inputData).subscribe(res => {
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
      this.clientService.createRecord(this.inputData).subscribe(res => {
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
