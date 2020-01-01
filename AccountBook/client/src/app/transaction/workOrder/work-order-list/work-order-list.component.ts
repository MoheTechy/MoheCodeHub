import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { WorkOrderService } from '../../../service/transaction/workOrderService/work-order.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ExcelService } from '../../../service/general/excelService/excel.service';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-work-order-list',
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.css']
})
export class WorkOrderListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;
  user: any;
  isRead: Boolean;
  isWrite: Boolean;
  temp = [];
  displayedColumns = ["workOrder", "project", "enquiryDate", "client", "endUser", "clientCoordinator", "enquiryHandled", "location", "scope", "status", "workType", "noOfDays", "remarks", "view"];
  doFilter: Boolean;

  constructor(
    private WorkOrderService: WorkOrderService,
    private router: Router,
    private authService: AuthService,
    private excelService: ExcelService,
    private globals: Globals) {
    this.globals.viewName = 'Job';
  }

  ngOnInit() {
    var permission = this.authService.getFromLocalStorage('permissionList');
    this.user = this.authService.getFromLocalStorage('currentUser');
    permission.forEach(element => {
      if (element.childrens.route == this.router.url.substr(1)) {
        this.isRead = element.childrens.isRead;
        this.isWrite = element.childrens.isWrite;
        if (!this.isWrite) {
          this.displayedColumns = ["workOrder", "project", "enquiryDate", "client", "endUser", "clientCoordinator", "enquiryHandled", "location", "scope", "status", "workType", "noOfDays", "remarks", "view"];
        }
      }
    })
    this.WorkOrderService.getRecord().then(results => {
      if (!results) {
        return
      }
      this.temp = results;
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  exportXlsx() {
    var data: any[] = [];
    this.temp.forEach(element => {
      var val = {
        "Work order": element.workOrder,
        "Project": element.project,
        "Enquiry date": element.enquiryDate,
        "Client": element.client,
        "End user": element.endUser,
        "Client coordinator": element.clientCoordinator,
        "Enquiry handled by": element.enquiryHandled,
        "Location": element.location,
        "Scope": element.scope,
        "Status": element.status,
        "Work type": element.workType,
        "Number of Days": element.noOfDays,
        "Remarks": element.remarks
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
      return (d.workOrder.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.project.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.enquiryDate.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.client.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.endUser.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.clientCoordinator.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.enquiryHandled.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.location.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.scope.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.status.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.workType.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.noOfDays.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.remarks.toLowerCase().indexOf(val) !== -1 || !val)
    });
    this.dataSource = new MatTableDataSource(temp1);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  btnAddNewClick = () => {
    this.router.navigateByUrl('transaction/addWorkOrder');
  }

  btnViewClick = (row) => {
    this.router.navigate(['transaction/viewDetailedWorkOrder'], { queryParams: { id: row.id } });
  }

}


