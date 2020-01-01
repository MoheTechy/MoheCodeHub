import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatBottomSheet, MatDialog } from "@angular/material";
import { CountryService } from '../../../service/master/countryService/country.service';
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ExcelService } from '../../../service/general/excelService/excel.service';
import { CountryFormComponent } from '../country-form/country-form.component';
import { FormControl } from "@angular/forms";
import { Globals } from '../../../globals';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource; user: any;
  isRead: Boolean;
  isWrite: Boolean;
  temp = [];
  displayedColumns = ['edit', 'expenseHead', 'billNo', 'billDate', 'vehicle', 'rawMeterials', 'expenseDate', 
  'companyName', 'staffType', 'staffName', 'amount'];
  doFilter: Boolean;

  constructor(
    private bottomSheet: MatBottomSheet,
    private countryService: CountryService,
    private router: Router,
    private toaster: ToastrService,
    private authService: AuthService,
    private excelService: ExcelService,
    private dialog: MatDialog,
    private globals: Globals
  ) {
    this.globals.viewName = 'Expenses';
  }

  ngOnInit() {
    const permission = this.authService.getFromLocalStorage('permissionList');
    this.user = this.authService.getFromLocalStorage('currentUser');
    permission.forEach(element => {
      if (element.childrens.route == this.router.url.substr(1)) {
        this.isRead = element.childrens.isRead;
        this.isWrite = element.childrens.isWrite;
      }
    });

    this.fetchFormData();
  }

  fetchFormData() {
    this.countryService.getExpenses().then(res => {
      if (res.status == 200) {
        this.temp = res.result;
        this.dataSource = new MatTableDataSource(res.result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  btnAddNewClick = () => {
    const dialogRef = this.dialog.open(CountryFormComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  getTable(row) {
    const dialogRef = this.dialog.open(CountryFormComponent, {
      data: row,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteTable = (item) => {
    const bottomSheetRef = this.bottomSheet.open(ConfirmDeleteComponent, {
      data: { deleteItem: true },
      disableClose: false,
      hasBackdrop: true
    });
    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result === true) {
        item.updatedBy = this.user.name;
        this.countryService.deleteExpense(item).subscribe(res => {
          // if (res['statusBool'] == 1) {
            this.toaster.success('Deleted Successfully!');
            this.ngOnInit();
          // }
        }, err => {
          throw err;
        });
      }
      if (result === false) {
        this.ngOnInit();
      }
    });
  }

  exportXlsx() {
    const data: any[] = [];
    this.temp.forEach(element => {
      const val = {
        'Expense Head': element.expenseHead,
        'Bill No': element.billNo,
        'Bill Date': element.billDate,
        'Raw Materials': element.rawMeterials,
        'Expense Date': element.expenseDate,
        'Expense Amount': element.amount,
        'Company Name': element.companyName,
        'Vehicle': element.vehicle,
        'Staff Type': element.staffType,
        'Staff Name': element.staffName
      };
      data.push(val);
    });
    this.excelService.saveAsExcelFile(data, 'Expense Sheet');
  }

  btnFilter = () => {
    this.doFilter = (this.doFilter) ? false : true;
  }

  updateFilter(event) {  // Filter Function
    const val = event.target.value.toLowerCase();
    const temp1: any[] = this.temp.filter(function (d) {
      return (d.expenseHead.toLowerCase().indexOf(val) !== -1 || !val) ||
            (d.billNo.toLowerCase().indexOf(val) !== -1 || !val) ||
            (d.vehicle.toLowerCase().indexOf(val) !== -1 || !val) ||
            (d.staffType.toLowerCase().indexOf(val) !== -1 || !val) ||
            (d.staffName.toLowerCase().indexOf(val) !== -1 || !val) ||
            (d.rawMeterials.toLowerCase().indexOf(val) !== -1 || !val);
    });
    this.temp = temp1;
    this.dataSource = new MatTableDataSource(temp1);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}



