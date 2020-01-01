import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../../service/master/templateService/template.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TemplateComponent } from '../../../master/template/template/template.component';
import { WorkOrderService } from '../../../service/transaction/workOrderService/work-order.service';
@Component({
  selector: 'app-job-report-template-list',
  templateUrl: './job-report-template-list.component.html',
  styleUrls: ['./job-report-template-list.component.css']
})
export class JobReportTemplateListComponent implements OnInit {

  reportTemplates: any;
  checkedData: any = [];

  constructor(
    private templateService: TemplateService,
    private dialogRef: MatDialogRef<JobReportTemplateListComponent>,
    private dialog: MatDialog,
    private WorkOrderService: WorkOrderService
  ) { }

  ngOnInit() {
    this.templateService.getRecord().then(res => {
      this.reportTemplates = res;
    })
  }

  btnAddNewClick = () => {
    let dialogRef = this.dialog.open(TemplateComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  btnClose() {
    this.dialogRef.close();
  }

  add() {
    this.WorkOrderService.getdata(this.checkedData);
    this.dialogRef.close();
  }

  onCheckboxChecked(event, element) {
    if (event.checked) {
      this.checkedData.push(element);
    } else {
      let index = this.checkedData.indexOf(element);
      if (index > -1) {
        this.checkedData.splice(index, 1);
      }
    }
  }

}
