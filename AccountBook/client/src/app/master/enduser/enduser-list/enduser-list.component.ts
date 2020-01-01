import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatBottomSheet, MatDialog } from "@angular/material";
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ExcelService } from '../../../service/general/excelService/excel.service';
import { EnduserFormComponent } from '../enduser-form/enduser-form.component';
import { Globals } from '../../../globals';
import { EnduserServiceService } from '../../../service/master/enduserService/enduser-service.service';

@Component({
  selector: 'app-enduser-list',
  templateUrl: './enduser-list.component.html',
  styleUrls: ['./enduser-list.component.css']
})
export class EnduserListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource; user: any;
  isRead: Boolean;
  isWrite: Boolean;
  temp = [];
  displayedColumns = ["edit", "Vehicle", "createdDate"];
  doFilter: Boolean;
  filteredRecords: any;
  users: any; emailIds: any;

  constructor(private globals: Globals,
    private enduserService: EnduserServiceService,
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private toaster: ToastrService,
    private authService: AuthService,
    private excelService: ExcelService,
    private dialog: MatDialog) { 
    this.globals.viewName = 'Vehicles List';
  }

  ngOnInit() {
    var permission = this.authService.getFromLocalStorage('permissionList');
    this.user = this.authService.getFromLocalStorage('currentUser');
    permission.forEach(element => {
      if (element.childrens.route == this.router.url.substr(1)) {
        this.isRead = element.childrens.isRead;
        this.isWrite = element.childrens.isWrite;
      }
    })
    this.enduserService.getVehiclesList().then(res => {
      if(res.status == 200){
        console.log(res.result);
        this.temp = res.result;
        this.dataSource = new MatTableDataSource(this.temp);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  btnAddNewClick = () => {
    let dialogRef = this.dialog.open(EnduserFormComponent, {
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  getTable(row) {
    let dialogRef = this.dialog.open(EnduserFormComponent, {
        data: row,
      disableClose: true
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
        this.enduserService.deleteVehicle(item).subscribe(res => {
          console.log(res);
          // if (res.status == 200) {
            this.toaster.success("Successfully Deleted!");
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
        "Vehicle Name": element.vehicle,
        "Created ON": element.createdDate
      }
      data.push(val);
    });
    this.excelService.saveAsExcelFile(data, this.globals.viewName);
  }

  btnFilter = () => {
    this.doFilter = (this.doFilter) ? false : true;
  }

  updateFilter(event){  // Filter Function
    const val = event.target.value.toLowerCase();
    let temp1: any[] = this.temp.filter(function (d) {
        return (d.vehicle.toLowerCase().indexOf(val) !== -1 || !val) ||
              (d.createdDate.toLowerCase().indexOf(val) !== -1 || !val);
    });
    this.dataSource = new MatTableDataSource(temp1);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
