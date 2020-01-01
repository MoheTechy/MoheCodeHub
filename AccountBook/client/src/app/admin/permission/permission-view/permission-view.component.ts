import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatBottomSheet } from "@angular/material";
import { PermissionService } from '../../../service/userManagement/permissionService/permission.service';
import { PermissionUserAndRolelistComponent } from '../permission-user-and-rolelist/permission-user-and-rolelist.component';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { PermissionFormComponent } from '../permission-form/permission-form.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ExcelService } from '../../../service/general/excelService/excel.service';
import { Globals } from '../../../globals';
@Component({
  selector: 'app-permission-view',
  templateUrl: './permission-view.component.html',
  styleUrls: ['./permission-view.component.css']
})

export class PermissionViewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;
  isRead: Boolean;
  isWrite: Boolean;
  user: any;
  temp = [];
  selectedPermission = [];
  displayedColumns = ["module", "name", "userAndRoles", "delete"];

  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private PermissionService: PermissionService,
    private toaster: ToastrService,
    private excelService: ExcelService,
    private authService: AuthService,
    private router: Router,
    private globals: Globals
  ) {
    this.globals.viewName = 'Permission';
  }

  ngOnInit() {
    this.user = this.authService.getFromLocalStorage('currentUser');
    var permission = this.authService.getFromLocalStorage('permissionList');
    permission.forEach(element => {
      if (element.childrens.route == this.router.url.substr(1)) {
        this.isRead = element.childrens.isRead;
        this.isWrite = element.childrens.isWrite;
        if (!this.isWrite) {
          this.displayedColumns = ["module", "name", "userAndRoles"];
        }
      }
    })
    this.PermissionService.getRecord().then(results => {
      if (!results) {
        return
      }
      this.temp = results;
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getUserAndRoles = (row) => {
    this.PermissionService.getUserRoleByID(row.id).then(res => {
      this.selectedPermission = res;
      if (this.selectedPermission.length > 0) {
        let dialogRef = this.dialog.open(PermissionUserAndRolelistComponent, {
          width: '500px',
          data: row.id,
          disableClose: false
        });
        dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
        });
      }
      else {
        this.toaster.info('No User or Role assigned');
        this.ngOnInit();
      }
    })
  }

  btnAddNewClick() {
    let dialogRef = this.dialog.open(PermissionFormComponent, {
      data: {},
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
        this.PermissionService.deleteRecord(item).subscribe(res => {
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
        "Module": element.module,
        "Name": element.name
      }
      data.push(val);
    });
    this.excelService.saveAsExcelFile(data, this.globals.viewName);
  }

}
