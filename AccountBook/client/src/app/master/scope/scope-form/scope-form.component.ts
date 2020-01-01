import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatBottomSheet } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ScopeService } from '../../../service/master/scopeService/scope.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { CustomValidators } from '../../../general/customValidators';
import { Globals } from '../../../globals';
@Component({
  selector: 'app-scope-form',
  templateUrl: './scope-form.component.html',
  styleUrls: ['./scope-form.component.css']
})
export class ScopeFormComponent implements OnInit {

  scopeForm: any;
  user: any;
  isUpdate: boolean = false;
  isNew: boolean = false;
  inputData: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialogRef: MatDialogRef<ScopeFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private scopeService: ScopeService,
    private toaster: ToastrService,
    private authService: AuthService,
    private fb: FormBuilder,
    private globals: Globals
  ) {
    this.globals.viewName = 'Income Bill Add';
    this.scopeForm = fb.group({
      'billEntry': [null, Validators.compose([Validators.required, CustomValidators.nospaceValidator()])],
      'others': [null, Validators.compose([Validators.required, CustomValidators.nospaceValidator()])]
    });
  }

  ngOnInit() {
    this.user = this.authService.getFromLocalStorage('currentUser');
    if (Object.keys(this.data).length !== 0) {
      this.isUpdate = true;
      this.scopeForm.patchValue({
        billEntry: this.data.billEntry,
        others: this.data.others,
      });
    }
    else {
      this.isNew = true;
    }
  }

  get f() {
    console.log(this.scopeForm.value);
    return this.scopeForm.controls;
  }

  btnClose() {
    if (this.scopeForm.dirty) {
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

  save() {
    let obj = Object.assign({}, this.scopeForm.value);
    obj.createdBy = this.user.name;
    obj.updatedBy = this.user.name;
    
    if (this.isUpdate) {
      obj.id = this.data.id;
      this.scopeService.updateIncomeBills(obj).subscribe(res => {
        this.toaster.success("Successfully Updated!");
        this.dialogRef.close();
      }, err => {
        throw err;
      });
    } else {
      this.scopeService.createIncomeBills(obj).subscribe(res => {
        this.toaster.success("Successfully Saved!");
        this.dialogRef.close();
      }, err => {
        throw err;
      });
    }
  }

}


