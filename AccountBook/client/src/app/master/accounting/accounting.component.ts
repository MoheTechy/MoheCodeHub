import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatBottomSheet } from '@angular/material';
import { ConfirmDeleteComponent } from '../../general/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from '../../service/master/accounts.service';
import { EnduserServiceService } from '../../service/master/enduserService/enduser-service.service';
import { ScopeService } from '../../service/master/scopeService/scope.service';
import { CountryService } from '../../service/master/countryService/country.service';
import { Globals } from '../../globals';
import { CountryFormComponent } from '../../master/country/country-form/country-form.component';
import { ScopeFormComponent } from '../../master/scope/scope-form/scope-form.component';
import { EnduserFormComponent } from '../../master/enduser/enduser-form/enduser-form.component';
import { AuthService } from '../../service/userManagement/authService/auth.service';
import { _ } from 'underscore';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  accountForm: FormGroup;
  accountHeads: any[];
  vehiclesList: any[];
  tempVehicleList: any[];
  billEntries: any[];
  tmpBillEntries: any[];
  expenseList: any[];
  tmpExpenseList: any[];
  dataSource; temp: any[];
  user: any;
  displayedColumns = ["edit", "sNo", "capital", "vehicle", "income", "expenseCategory", "expenseAmount"];

  constructor(private globals: Globals,
              private accountService: AccountsService,
              private toaster: ToastrService,
              private dialog: MatDialog,
              private authService: AuthService,
              private CountryService: CountryService,
              private ScopeService: ScopeService,
              private bottomSheet: MatBottomSheet,
              private endUserService: EnduserServiceService,
              private fb: FormBuilder) {
                this.accountForm = this.fb.group({
                  'id': [null],
                  'capitalId': [null, Validators.compose([Validators.required])],
                  'vehicleId': [null, Validators.compose([Validators.required])],
                  'billId': [null, Validators.compose([Validators.required])],
                  'expenseId': [null, Validators.compose([Validators.required])],
                  'others': [null],
                  'amount': [null, Validators.compose([Validators.required])]
                });
              }

  ngOnInit() {
    this.fetchFormData();
  }

  get f() {
    return this.accountForm.controls;
  }

  fetchFormData() {
    this.user = this.authService.getFromLocalStorage('currentUser');
    this.getListOfAccounts();
    this.accountService.getRecord().then(res => {
      console.log(res);
      if(res.status == 200){
        this.accountHeads = res.result;
      }
    });

    this.endUserService.getVehiclesList().then(res => {
      if(res.status == 200){
        console.log(res.result);
        this.vehiclesList = res.result;
        this.tempVehicleList = res.result;
      }
    });

    this.ScopeService.getIncomeBills().then(res => {
      if (res.status == 200) {
        console.log(res.result);
        this.billEntries = res.result;
        this.tmpBillEntries =res.result;
      }
    });

    this.CountryService.getExpenses().then(res => {
      if(res.status == 200){
        console.log(res.result);
        this.expenseList = res.result;
        this.tmpExpenseList = res.result;
      }
    });

  }

  changeFilter() {
    let val = this.accountForm.value.vehicle;
    let results = _.filter(this.tempVehicleList, function(element) {
      val = val.toLocaleLowerCase();
      return element.vehicle.toLocaleLowerCase().indexOf(val) > -1;
    });
    this.vehiclesList = [...results];
  }

  getListOfAccounts() {
    this.accountService.getAccounts().subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.temp = res.result;
        let sNo = 0;
        this.temp.forEach(ele => {
          ele.sNo = sNo + 1;
          sNo++;
        });
        this.dataSource = new MatTableDataSource(this.temp);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  save() {
    let obj = Object.assign({}, this.accountForm.value);
    obj.createdBy = "test";
    obj.updatedBy = "test";
    if(parseInt(obj.id) > 0){
      this.accountService.updateRecord(obj).subscribe(res => {
        if(res.status == 200){
          this.getListOfAccounts();
          this.toaster.success('Successfully updated!');
          this.accountForm.reset();
        }else{
          this.toaster.error('Something went wrong!');
        }
      });
    }else{
      this.accountService.createRecord(obj).subscribe(res => {
        if(res.status == 200){
          this.getListOfAccounts();
          this.toaster.success('Successfully Added!');
          this.accountForm.reset();
        }else{
          this.toaster.error('Something went wrong!');
        }
      });
    }
  }

  updateFilter(event) {  // Filter Function
    const val = event.target.value.toLowerCase();
    let temp1: any[] = this.temp.filter(function (d) {
      return (d.capital.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.vehicle.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.billEntry.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.expenseType.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.amount.toLowerCase().indexOf(val) !== -1 || !val);
    });
    this.dataSource = new MatTableDataSource(temp1);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getTable(row) {
    this.accountService.getAccountByID(row.id).then(res => {
      if(res.status == 200){
        let data = res.result[0];
        debugger
        this.accountForm.patchValue({
          id: data.id,
          capitalId: data.capitalId,
          vehicleId: data.vehicleId,
          billId: data.billId,
          expenseId: data.expenseId,
          others: data.others,
          amount: data.amount
        });
      }
    });
  }

  deleteTable(item) {
    let bottomSheetRef = this.bottomSheet.open(ConfirmDeleteComponent, {
      data: { deleteItem: true },
      disableClose: false,
      hasBackdrop: true
    });
    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result === true) {
        this.accountService.removeAccount(item).subscribe(res => {
          console.log(res);
          this.getListOfAccounts();
          this.toaster.success('Successfully deleted!');
        });
      }else{
        console.log(result);
      }
    });
  }

  addExpenseClick = () => {
    let dialogRef = this.dialog.open(CountryFormComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  addVehicleClick = () => {
    let dialogRef = this.dialog.open(EnduserFormComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  addBillEntryClick = () => {
    let dialogRef = this.dialog.open(ScopeFormComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
