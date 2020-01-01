import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatBottomSheet, MatDialog } from "@angular/material";
import { ClientService } from '../../../service/master/clientService/client.service';
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ExcelService } from '../../../service/general/excelService/excel.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import { Globals } from '../../../globals';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource; user: any;
  isRead: Boolean;
  isWrite: Boolean;
  temp = [];
  displayedColumns = ["edit", "clientName", "clientShortName", "contactPerson", "email", "phoneNumber", "address"];
  doFilter: Boolean;
  filteredRecords: any;
  users: any; emailIds: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private ClientService: ClientService,
    private router: Router,
    private toaster: ToastrService,
    private authService: AuthService,
    private excelService: ExcelService,
    private dialog: MatDialog,
    private globals: Globals) {
    this.globals.viewName = 'Client';
  }

  ngOnInit() {
    var permission = this.authService.getFromLocalStorage('permissionList');
    this.user = this.authService.getFromLocalStorage('currentUser');
    permission.forEach(element => {
      if (element.childrens.route == this.router.url.substr(1)) {
        this.isRead = element.childrens.isRead;
        this.isWrite = element.childrens.isWrite;
        if (!this.isWrite) {
          this.displayedColumns = ["clientName", "clientShortName", "contactPerson", "email", "phoneNumber", "address"];
        }
      }
    })
    this.ClientService.getRecord().then(results => {
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
    let dialogRef = this.dialog.open(ClientFormComponent, {
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  getTable(row) {
    let dialogRef = this.dialog.open(ClientFormComponent, {
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
        this.ClientService.deleteRecord(item).subscribe(res => {
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
        "Client name": element.clientName,
        "Client short name": element.clientShortName,
        "Contact person": element.contactPerson,
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
      return (d.clientName.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.clientShortName.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.contactPerson.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.email.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.mobile.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.address.toLowerCase().indexOf(val) !== -1 || !val);
    });
    this.dataSource = new MatTableDataSource(temp1);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}

