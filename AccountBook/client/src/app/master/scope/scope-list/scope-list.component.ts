import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatBottomSheet, MatDialog } from "@angular/material";
import { ScopeService } from '../../../service/master/scopeService/scope.service';
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ExcelService } from '../../../service/general/excelService/excel.service';
import { ScopeFormComponent } from '../scope-form/scope-form.component';
import { FormControl } from "@angular/forms";
import { Globals } from '../../../globals';

@Component({
  selector: 'app-scope-list',
  templateUrl: './scope-list.component.html',
  styleUrls: ['./scope-list.component.css']
})
export class ScopeListComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource; user: any;
  isRead: Boolean;
  isWrite: Boolean;
  temp = [];
  displayedColumns = ["edit", "incomeBill", "others", "createdDate"];
  doFilter: Boolean;
  
  constructor(private globals: Globals,
    private bottomSheet: MatBottomSheet,
    private ScopeService: ScopeService,
    private router: Router,
    private toaster: ToastrService,
    private authService: AuthService,
    private excelService: ExcelService,
    private dialog: MatDialog) {
    this.globals.viewName = 'Income Bill Entry';
  }

  ngOnInit() {
    var permission = this.authService.getFromLocalStorage('permissionList');
    this.user = this.authService.getFromLocalStorage('currentUser');
    permission.forEach(element => {
      if (element.childrens.route == this.router.url.substr(1)) {
        this.isRead = element.childrens.isRead;
        this.isWrite = element.childrens.isWrite;
        // if (!this.isWrite) {
        //   this.displayedColumns = ["scopeName", "scopeShortName"];
        // }
      }
    })
    this.fetchFormData();
  }

  fetchFormData() {
    this.ScopeService.getIncomeBills().then(res => {
      console.log(res);
      if (res.status == 200) {
        this.temp = res.result;
        this.dataSource = new MatTableDataSource(res.result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;  
      }
    });
  }

  btnAddNewClick = () => {
    let dialogRef = this.dialog.open(ScopeFormComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  getTable(row) {
    let dialogRef = this.dialog.open(ScopeFormComponent, {
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
        this.ScopeService.deleteIncomeBills(item).subscribe(res => {
          // if (res.status == 200) {
            this.toaster.success("Deleted Successfully!");
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
    var data: any[] = [];
    this.temp.forEach(element => {
      var val = {
        "Income Bill": element.billEntry,
        "Others": element.others,
        "Created Date": element.createdDate
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
      return (d.billEntry.toLowerCase().indexOf(val) !== -1 || !val) ||
            (d.others.toLowerCase().indexOf(val) !== -1 || !val) ||
            (d.createdDate.toLowerCase().indexOf(val) !== -1 || !val);
    });
    this.dataSource = new MatTableDataSource(temp1);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}



