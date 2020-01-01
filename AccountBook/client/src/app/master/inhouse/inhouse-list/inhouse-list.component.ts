import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatBottomSheet, MatDialog } from "@angular/material";
import { InhouseService } from '../../../service/master/inhouseService/inhouse.service';
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ExcelService } from '../../../service/general/excelService/excel.service';
import { InhouseFormComponent } from '../inhouse-form/inhouse-form.component';
import { FormControl } from "@angular/forms";
import { Globals } from '../../../globals';
import { FileService } from '../../../service/general/fileService/file.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-inhouse-list',
  templateUrl: './inhouse-list.component.html',
  styleUrls: ['./inhouse-list.component.css']
})
export class InhouseListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;
  user: any;
  isRead: Boolean;
  isWrite: Boolean;
  temp = [];
  displayedColumns = ["edit", "firstName", "lastName", "email", "mobile", "address"];
  doFilter: Boolean;

  constructor(
    private bottomSheet: MatBottomSheet,
    private InhouseService: InhouseService,
    private router: Router,
    private toaster: ToastrService,
    private authService: AuthService,
    private excelService: ExcelService,
    private _fileService:FileService,
    private dialog: MatDialog,
    private globals: Globals
  ) {
    this.globals.viewName = 'Inhouse';
  }

  ngOnInit() {
    var permission = this.authService.getFromLocalStorage('permissionList');
    this.user = this.authService.getFromLocalStorage('currentUser');
    permission.forEach(element => {
      if (element.childrens.route == this.router.url.substr(1)) {
        this.isRead = element.childrens.isRead;
        this.isWrite = element.childrens.isWrite;
        if (!this.isWrite) {
          this.displayedColumns = ["firstName", "lastName", "email", "mobile", "address"];
        }
      }
    })
    this.InhouseService.getRecord().then(results => {
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
    let dialogRef = this.dialog.open(InhouseFormComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  getTable(row) {
    let dialogRef = this.dialog.open(InhouseFormComponent, {
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
        this.InhouseService.deleteRecord(item).subscribe(res => {
          if (res['statusBool'] == 1) {
            this.toaster.success(res['statusText'])
            this.ngOnInit();
            var filename = item.resumeFileName;
            this._fileService.deleteResumeFile(filename)
              .subscribe(
                data => saveAs(data, filename),
                error => console.error(error)
              );
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
        "First name": element.firstName,
        "Last  name": element.lastName,
        "Email": element.email,
        "Mobile": element.mobile,
        "Address": element.address
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
      return (d.firstName.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.lastName.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.email.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.mobile.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.address.toLowerCase().indexOf(val) !== -1 || !val)
    });
    this.dataSource = new MatTableDataSource(temp1);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}



