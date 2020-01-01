import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatBottomSheet } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { EnduserServiceService } from '../../../service/master/enduserService/enduser-service.service';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { CustomValidators } from '../../../general/customValidators';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-enduser-form',
  templateUrl: './enduser-form.component.html',
  styleUrls: ['./enduser-form.component.css']
})
export class EnduserFormComponent implements OnInit {

  enduserForm: any;
  user: any;
  isUpdate: boolean = false;
  isNew: boolean = false;
  inputData: any;

  constructor(private globals: Globals,
    private bottomSheet: MatBottomSheet,
    private dialogRef: MatDialogRef<EnduserFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private toaster: ToastrService,
    private authService: AuthService,
    private fb: FormBuilder,
    private enduserService: EnduserServiceService
  ) { 
    this.globals.viewName = 'Add Vehicle';
    this.enduserForm = fb.group({
      'vehicle': [null, Validators.compose([Validators.required,CustomValidators.nospaceValidator()])]
    });
  }

  ngOnInit() {
    this.user = this.authService.getFromLocalStorage('currentUser');
    console.log(this.data);
    if (Object.keys(this.data).length !== 0) {
      this.isUpdate = true;
      this.enduserForm.patchValue({
        vehicle: this.data.vehicle
      });
    }
    else {
      this.isNew = true;
    }
  }

  get f() {
    return this.enduserForm.controls;
  }

  btnClose() {
    if (this.enduserForm.dirty) {
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
    let obj = Object.assign({}, this.enduserForm.value);
    if (this.isUpdate) {
      obj.id = this.data.id;
      this.enduserService.updateVehicle(obj).subscribe(res => {
          this.toaster.success("Updated Successfully!");
          this.dialogRef.close();
      }, err => {
        throw err
      });
    } else {
      this.enduserService.createVehicle(obj).subscribe(res => {
          this.toaster.success("Added Successfully!");
          this.dialogRef.close();
      }, err => {
        throw err
      });
    }
  }

}
