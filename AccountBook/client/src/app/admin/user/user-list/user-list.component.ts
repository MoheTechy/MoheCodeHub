import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatBottomSheet } from '@angular/material';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ConfirmDialogComponent } from '../../../general/confirm-dialog/confirm-dialog.component';
import { UserService } from '../../../service/userManagement/userService/user.service';
import { LockConfigComponent } from '../../../general/lock-config/lock-config.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ExcelService } from '../../../service/general/excelService/excel.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;
  user: any;
  doFilter: Boolean;
  isRead: Boolean;
  isWrite: Boolean;
  temp = [];
  displayedColumns = ['edit', 'name', 'loginId', 'roles', 'emailId', 'contactNumber', 'isLocked', 'resetPassword', 'lastLoginTime','passwordChangedOn'];

  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private userService: UserService,
    private excelService: ExcelService,
    private toaster: ToastrService,
    private authService: AuthService,
    private router: Router,
    private globals: Globals
  ) {
    this.globals.viewName = 'User';
  }

  ngOnInit() {
    this.user = this.authService.getFromLocalStorage('currentUser');
    var permission = this.authService.getFromLocalStorage('permissionList');
    permission.forEach(element => {
      if (element.childrens.route == this.router.url.substr(1)) {
        this.isRead = element.childrens.isRead;
        this.isWrite = element.childrens.isWrite;
        if (!this.isWrite) {
          this.displayedColumns = ['name', 'loginId', 'roles', 'emailId', 'contactNumber', 'isLocked', 'lastLoginTime','passwordChangedOn'];
        }
      }
    })
    this.userService.getRecord().then(results => {
      if (!results) {
        return;
      }
      this.temp = results;
      console.log(results);
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  btnAddNewClick() {
    let dialogRef = this.dialog.open(UserFormComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  getTable(row) {
    let dialogRef = this.dialog.open(UserFormComponent, {
      data: row,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
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
        item.updatedBy = this.user.name;
        this.userService.deleteRecord(item).subscribe(res => {
          if (res['statusBool'] == 1) {
            this.toaster.success(res['statusText']);
            this.ngOnInit();
          }
        }, err => {
          throw err
        });
      }
      if (result === false) {
        this.ngOnInit();
      }
    });
  }

  resetPassword = (item) => {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.userService.resetPassword(item).subscribe(res => {
          this.toaster.success('Password reseted successfully')
          this.ngOnInit();
        }, err => {
          throw err
        });
      }
      if (result === false) {
        this.ngOnInit();
      }
    });
  }

  manageLockAccount = (row) => {
    if (this.isWrite == true) {
      let dialogRef = this.dialog.open(LockConfigComponent, {
        data: row.isLocked,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          row.updatedBy = this.user.name;
          this.userService.updateLock(row).subscribe(res => {
            this.toaster.success('User lock updated successfully');
            this.ngOnInit();
          }, err => {
            throw err
          });
        }
        if (result === false) {
          this.ngOnInit();
        }
      });
    }
    else {
      this.toaster.error('Permission denied');
    }
  }


  btnFilter = () => {
    this.doFilter = (this.doFilter) ? false : true;
  }

  updateFilter(event) {  // Filter Function
    const val = event.target.value.toLowerCase();
    let temp1: any[] = this.temp.filter(function (d) {
      return (d.name.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.emailId.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.loginId.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.lastLoginTime.toLowerCase().indexOf(val) !== -1 || !val) ||
        // (d.passwordChangedOn.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.contactNumber.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.roles.toLowerCase().indexOf(val) !== -1 || !val)
    });
    this.dataSource = new MatTableDataSource(temp1);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  exportXlsx() {
    var data: any[] = [];
    this.temp.forEach(element => {
      var val = {
        "Name": element.name,
        "Login id": element.loginId,
        "Email": element.emailId,
        "Mobile number": element.contactNumber,
        "Roles": element.roles,
        "Lock status": element.isLocked,
        "Password changed on": element.lastPassword,
        "Last logged on": element.lastLogged
      }
      data.push(val);
    });
    this.excelService.saveAsExcelFile(data, this.globals.viewName);
  }

}
