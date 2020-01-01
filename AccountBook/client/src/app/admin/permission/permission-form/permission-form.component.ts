import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatBottomSheet, MatDialogRef } from '@angular/material';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { PermissionService } from '../../../service/userManagement/permissionService/permission.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { CustomValidators } from '../../../general/customValidators';
import { Globals } from '../../../globals';
@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.css']
})

export class PermissionFormComponent implements OnInit {

  inputData: any;
  user: any;
  permissionForm: FormGroup;

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialogRef: MatDialogRef<PermissionFormComponent>,
    private permissionService: PermissionService,
    private toaster: ToastrService,
    private authService: AuthService,
    private fb: FormBuilder,
    private globals: Globals
  ) {
    this.globals.viewName = 'Permission';
    this.permissionForm = fb.group({
      'id': '',
      'module': [null, Validators.compose([Validators.required, CustomValidators.nospaceValidator()])],
      'name': [null, Validators.compose([Validators.required, CustomValidators.nospaceValidator()])],
    });
  }

  ngOnInit() {
    this.user = this.authService.getFromLocalStorage('currentUser');
  }

  btnClose() {
    if (this.permissionForm.dirty) {
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
      module: this.permissionForm.value.module,
      name: this.permissionForm.value.name,
      createdBy: this.user.name
    }
    this.permissionService.createRecord(this.inputData).subscribe(res => {
      if (res['statusBool'] == -1) {
        this.toaster.error(res['statusText']);
      }
      else {
        this.toaster.success(res['statusText']);
        this.dialogRef.close();
      }
    }, err => {
      throw err
    })
  }

  get f() {
    return this.permissionForm.controls;
  }

}
