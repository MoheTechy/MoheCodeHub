import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatBottomSheet } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { CountryService } from '../../../service/master/countryService/country.service';
import { LocationService } from '../../../service/master/locationService/location.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { CustomValidators } from '../../../general/customValidators';
import { Globals } from '../../../globals';
import { EnduserServiceService } from '../../../service/master/enduserService/enduser-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})
export class CountryFormComponent implements OnInit {

  countryForm: any;
  user: any;
  isUpdate: boolean = false;
  isNew: boolean = false;
  inputData: any;
  expenseHeads: any;
  types: any;
  vehicles: any;
  staffsList: any;
  boolObj = {
    rawMaterials: false,
    companyName: false,
    billNo: false,
    billDate: false,
    vehicle: false,
    bunkDetails: false,
    miscDesc: false,
    staffType: false,
    staffName: false,
    expenseDate: false,
    others: false,
    amount: false
  };

  constructor(
    private bottomSheet: MatBottomSheet,
    private locationService: LocationService,
    private dialogRef: MatDialogRef<CountryFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private countryService: CountryService,
    private toaster: ToastrService,
    private authService: AuthService,
    private fb: FormBuilder,
    private globals: Globals,
    private endUserService: EnduserServiceService
  ) {
    this.globals.viewName = 'Add Expenses';
    this.countryForm = fb.group({
      'expenseType': [null, Validators.compose([Validators.required])],
      'rawMaterials': [null],
      'companyName': [null],
      'billNo': [null],
      'billDate': [null],
      'vehicle': [null],
      'bunkDetails': [null],
      'miscDesc': [null],
      'staffType': [null],
      'staffName': [null],
      'expenseDate': [null],
      'others': [null],
      'amount': [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.user = this.authService.getFromLocalStorage('currentUser');
    this.getFromOptions();
    if (Object.keys(this.data).length !== 0) {
      this.isUpdate = true;
      this.countryForm.patchValue({
        expenseType: this.data.expenseType,
        others: this.data.others
      });
    } else {
      this.isNew = true;
    }
    this.types = [{id: 1, type: 'Office Staffs', value: 'office'}, {id: 2, type: 'Vehicle Staffs', value: 'labour'}];
  }

  staffTypeChanged() {
    const staffType = this.countryForm.value.staffType;
    if (staffType == 'labour') {
      this.boolObj.vehicle = true;
      this.countryForm.get('vehicle').reset();
    } else if (staffType == 'office') {
      this.boolObj.vehicle = false;
    }
    this.locationService.getStaffByType(staffType).then(res => {
      if (res.status == 200) {
        this.staffsList = res.result;
      }
    });
  }

  getFromOptions() {
    this.countryService.getExpenseHeads().subscribe( res => {
      if (res.status == 200) {
        this.expenseHeads = res.result;
      }
    });

    this.endUserService.getVehiclesList().then( res => {
      if (res.status == 200) {
        this.vehicles = res.result;
      }
    });
  }

  get f() {
    return this.countryForm.controls;
  }

  btnClose() {
    if (this.countryForm.dirty) {
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

  typeChanged() {
    // this.countryForm.reset();
    const type = this.countryForm.value.expenseType;
    if (type == 1) { // purchase
      // enabled controls
      this.boolObj.rawMaterials = true;
      this.boolObj.companyName = true;
      this.boolObj.billNo = true;
      this.boolObj.billDate = true;
      this.boolObj.vehicle = true;
      this.boolObj.amount = true;
      this.boolObj.expenseDate = true;
      // disabled controls
      this.boolObj.bunkDetails = false;
      this.boolObj.miscDesc = false;
      this.boolObj.staffName = false;
      this.boolObj.staffType = false;
      this.boolObj.others = false;
    } else if (type == 2) { // Diesel
      // enabled controls
      this.boolObj.billNo = true;
      this.boolObj.billDate = true;
      this.boolObj.vehicle = true;
      this.boolObj.amount = true;
      this.boolObj.expenseDate = true;
      this.boolObj.bunkDetails = true;
      // disabled controls
      this.boolObj.rawMaterials = false;
      this.boolObj.companyName = false;
      this.boolObj.miscDesc = false;
      this.boolObj.staffName = false;
      this.boolObj.staffType = false;
      this.boolObj.others = false;
    } else if (type == 3) { // miscellenious
      // enabled controls
      this.boolObj.billNo = true;
      this.boolObj.billDate = true;
      this.boolObj.vehicle = true;
      this.boolObj.amount = true;
      this.boolObj.expenseDate = true;
      this.boolObj.miscDesc = true;
      // disabled controls
      this.boolObj.rawMaterials = false;
      this.boolObj.companyName = false;
      this.boolObj.bunkDetails = false;
      this.boolObj.staffName = false;
      this.boolObj.staffType = false;
      this.boolObj.others = false;
    } else if (type == 4) { // salary
      // enabled controls
      this.boolObj.amount = true;
      this.boolObj.expenseDate = true;
      this.boolObj.staffName = true;
      this.boolObj.staffType = true;
      // disabled controls
      this.boolObj.billNo = false;
      this.boolObj.billDate = false;
      this.boolObj.miscDesc = false;
      this.boolObj.vehicle = false;
      this.boolObj.rawMaterials = false;
      this.boolObj.companyName = false;
      this.boolObj.bunkDetails = false;
      this.boolObj.others = false;
    } else if (type == 5) {
      // enabled controls
      this.boolObj.billNo = true;
      this.boolObj.billDate = true;
      this.boolObj.amount = true;
      this.boolObj.expenseDate = true;
      this.boolObj.others = true;
      // disabled controls
      this.boolObj.miscDesc = false;
      this.boolObj.vehicle = false;
      this.boolObj.rawMaterials = false;
      this.boolObj.companyName = false;
      this.boolObj.bunkDetails = false;
      this.boolObj.staffName = false;
      this.boolObj.staffType = false;
    }

  }

  save(): void {
    const obj = Object.assign({}, this.countryForm.value);
    obj.createdBy = this.user.name;
    obj.updatedBy = this.user.name;
    obj.billDate =  obj.billDate === null ? null : moment(obj.billDate).format('YYYY-MM-DD');
    obj.expenseDate = obj.expenseDate === null ? null : moment(obj.expenseDate).format('YYYY-MM-DD');
    if (this.isUpdate) {
      obj.id = this.data.id;
      this.countryService.updateExpense(obj).subscribe(res => {
        if (res.status == 200) {
          this.toaster.success('Successfully Updated!');
          this.dialogRef.close();
        }
      }, err => { throw err; });
    } else {
      this.countryService.createExpense(obj).subscribe(res => {
        if (res.status == 200) {
          this.toaster.success('Successfully Added!');
          this.dialogRef.close();
        } else if (res.status == 409) {
          this.toaster.warning(res.msg);
        }
      }, err => { throw err; });
    }
  }

}

