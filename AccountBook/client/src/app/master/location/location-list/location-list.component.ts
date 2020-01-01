import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatBottomSheet, MatDialog } from "@angular/material";
import { LocationService } from '../../../service/master/locationService/location.service';
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ExcelService } from '../../../service/general/excelService/excel.service';
import { LocationFormComponent } from '../location-form/location-form.component';
import { FormControl } from "@angular/forms";
import { Globals } from '../../../globals';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;
  user: any;
  isRead: Boolean;
  isWrite: Boolean;
  temp = [];
  displayedColumns = ['staffName', 'staffType', 'dob', 'street', 'city', 'state', 'pincode', 'contact'];
  doFilter: Boolean;
  locationName = new FormControl('');
  filteredRecords: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private LocationService: LocationService,
    private router: Router,
    private toaster: ToastrService,
    private authService: AuthService,
    private excelService: ExcelService,
    private dialog: MatDialog,
    private globals: Globals
  ) {
    this.globals.viewName = 'Staffs';
  }

  ngOnInit() {
    const permission = this.authService.getFromLocalStorage('permissionList');
    this.user = this.authService.getFromLocalStorage('currentUser');
    permission.forEach(element => {
      if (element.childrens.route == this.router.url.substr(1)) {
        this.isRead = element.childrens.isRead;
        this.isWrite = element.childrens.isWrite;
        if (!this.isWrite) {
          this.displayedColumns = ['staffName', 'staffType', 'dob', 'street', 'city', 'state', 'pincode', 'contact'];
        }
      }
    });
    this.LocationService.getAllStaffs().then(results => {
      if (results.status == 200) {
        this.temp = results.result;
        this.dataSource = new MatTableDataSource(results.result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  btnAddNewClick = () => {
    const dialogRef = this.dialog.open(LocationFormComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  getTable(row) {
    const dialogRef = this.dialog.open(LocationFormComponent, {
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
        this.LocationService.deleteStaff(item).subscribe(res => {
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
        "Location name": element.locationName,
        "Location short name": element.locationShortName
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
      return (d.locationName.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.locationShortName.toLowerCase().indexOf(val) !== -1 || !val)
    });
    this.dataSource = new MatTableDataSource(temp1);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}


