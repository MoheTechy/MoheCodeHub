import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource, MatBottomSheet } from "@angular/material";
import { RoleManagementService } from '../../../service/userManagement/roleManagementService/role-management.service';
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ExcelService } from '../../../service/general/excelService/excel.service';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-role-management-view',
  templateUrl: './role-management-view.component.html',
  styleUrls: ['./role-management-view.component.css']
})

export class RoleManagementViewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;
  user: any;
  isRead: Boolean;
  isWrite: Boolean;
  temp = [];
  displayedColumns = ["edit", "name", "description", "createdDate"];
  doFilter: Boolean;

  constructor(
    private bottomSheet: MatBottomSheet,
    private RoleManagementService: RoleManagementService,
    private router: Router,
    private toaster: ToastrService,
    private authService: AuthService,
    private excelService: ExcelService,
    private globals: Globals
  ) {
    this.globals.viewName = 'Roles'
  }

  ngOnInit() {
    var permission = this.authService.getFromLocalStorage('permissionList');
    this.user = this.authService.getFromLocalStorage('currentUser');
    permission.forEach(element => {
      if (element.childrens.route == this.router.url.substr(1)) {
        this.isRead = element.childrens.isRead;
        this.isWrite = element.childrens.isWrite;
        if (!this.isWrite) {
          this.displayedColumns = ["name", "description", "createdDate"];
        }
      }
    })
    this.RoleManagementService.getRecord().then(results => {
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
    this.router.navigateByUrl('admin/roleForm');
  }

  getTable = (row) => {
    this.router.navigate(['admin/roleForm'], { queryParams: { id: row.id } });
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
        this.RoleManagementService.deleteRecord(item).subscribe(res => {
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
        "Role name": element.name,
        "Role description": element.description,
        "Created date": element.createdDate
      }
      data.push(val);
    });
    this.excelService.saveAsExcelFile(data, this.globals.viewName);
  }

  btnFilter = () => {
    this.doFilter = (this.doFilter) ? false : true;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    let temp1: any[] = this.temp.filter(function (d) {
      return (d.name.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.description.toLowerCase().indexOf(val) !== -1 || !val)||
        (d.createdDate.toLowerCase().indexOf(val) !== -1 || !val)
    });
    this.dataSource = new MatTableDataSource(temp1);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}


