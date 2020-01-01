import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatBottomSheet } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { LocationService } from '../../../service/master/locationService/location.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { CustomValidators } from '../../../general/customValidators';
import { Globals } from '../../../globals';
import * as moment from 'moment';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit {

  locationForm: any;
  user: any;
  isUpdate: boolean = false;
  isNew: boolean = false;
  inputData: any;
  types = [];

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialogRef: MatDialogRef<LocationFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private locationService: LocationService,
    private toaster: ToastrService,
    private authService: AuthService,
    private fb: FormBuilder,
    private globals: Globals
  ) {
    this.globals.viewName = 'Staffs Details';
    this.locationForm = fb.group({
      'id': '',
      'staffName': [null, Validators.compose([Validators.required, CustomValidators.nospaceValidator()])],
      'staffType': [null, Validators.compose([Validators.required])],
      'dob': [null, Validators.compose([Validators.required])],
      'street': [null],
      'city': [null],
      'state': [null],
      'pincode': [null, Validators.compose([Validators.required])],
      'contact': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.user = this.authService.getFromLocalStorage('currentUser');
    if (Object.keys(this.data).length !== 0) {
      this.isUpdate = true;
      this.locationForm.patchValue({
        locationName: this.data.locationName,
        locationShortName: this.data.locationShortName,
      });
    } else {
      this.isNew = true;
    }
    this.types = [{id: 1, type: 'Office Staffs', value: 'office'}, {id: 2, type: 'Vehicle Staffs', value: 'labour'}];
  }

  get f() {
    return this.locationForm.controls;
  }

  btnClose() {
    if (this.locationForm.dirty) {
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
    const obj = Object.assign({}, this.locationForm.value);
    obj.dob = moment(obj.dob).format('YYYY-MM-DD');
    obj.createdBy = this.user.name;
    obj.updatedBy = this.user.name;
    if (this.isUpdate) {
      obj.id = this.data.id;
      this.locationService.updateStaff(obj).subscribe(res => {
        this.toaster.success('Successfully Updated!');
        this.dialogRef.close();
      }, err => { throw err; });
    } else {
      this.locationService.createStaff(obj).subscribe(res => {
        this.toaster.success('Successfully Saved!');
        this.dialogRef.close();
      }, err => { throw err; });
    }
  }

}

