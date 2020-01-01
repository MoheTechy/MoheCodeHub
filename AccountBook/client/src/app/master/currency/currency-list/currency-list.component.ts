import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatBottomSheet, MatDialog } from "@angular/material";
import { CurrencyService } from '../../../service/master/currencyService/currency.service';
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ExcelService } from '../../../service/general/excelService/excel.service';
import { CurrencyFormComponent } from '../currency-form/currency-form.component';
import { FormControl } from "@angular/forms";
import { Globals } from '../../../globals';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource; user: any;
  isRead: Boolean;
  isWrite: Boolean;
  temp = [];
  displayedColumns = ["edit", "currencyCode", "currencyName"];
  doFilter: Boolean;

  constructor(
    private bottomSheet: MatBottomSheet,
    private CurrencyService: CurrencyService,
    private router: Router,
    private toaster: ToastrService,
    private authService: AuthService,
    private excelService: ExcelService,
    private dialog: MatDialog,
    private globals: Globals
  ) {
    this.globals.viewName = 'Currency';
  }

  ngOnInit() {
    var permission = this.authService.getFromLocalStorage('permissionList');
    this.user = this.authService.getFromLocalStorage('currentUser');
    permission.forEach(element => {
      if (element.childrens.route == this.router.url.substr(1)) {
        this.isRead = element.childrens.isRead;
        this.isWrite = element.childrens.isWrite;
        if (!this.isWrite) {
          this.displayedColumns = ["currencyCode", "currencyName"];
        }
      }
    })
    this.CurrencyService.getRecord().then(results => {
      if (!results) {
        return
      }
      this.temp = results;
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  btnAddNewClick = () => {
    let dialogRef = this.dialog.open(CurrencyFormComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  getTable(row) {
    let dialogRef = this.dialog.open(CurrencyFormComponent, {
      data: row,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteTable = (item) => {
    let bottomSheetRef = this.bottomSheet.open(ConfirmDeleteComponent, {
      data: { deleteItem: true },
      disableClose: false,
      hasBackdrop: true
    });
    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result === true) {
        item.updatedBy = this.user.name;
        this.CurrencyService.deleteRecord(item).subscribe(res => {
          if (res['statusBool'] == 1) {
            this.toaster.success(res['statusText'])
            this.ngOnInit();
          }
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
    var data: any[] = [];
    this.temp.forEach(element => {
      var val = {
        "Currency code": element.currencyCode,
        "Currency name": element.currencyName
      }
      data.push(val);
    });
    this.excelService.saveAsExcelFile(data, this.globals.viewName);
  }

  btnFilter = () => {
    this.doFilter = (this.doFilter) ? false : true;
  }

  updateFilter(event) {  // Filter Function
    const val = event.target.value.toLowerCase();
    let temp1: any[] = this.temp.filter(function (d) {
      return (d.currencyCode.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.currencyName.toLowerCase().indexOf(val) !== -1 || !val)
    });
    this.dataSource = new MatTableDataSource(temp1);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}




