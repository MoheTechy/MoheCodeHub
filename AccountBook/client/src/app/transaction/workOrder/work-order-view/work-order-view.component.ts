import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals'
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JobCommentFormComponent } from '../../jobComment/job-comment-form/job-comment-form.component';
import { MatBottomSheet, MatDialog } from "@angular/material";
import { WorkOrderService } from '../../../service/transaction/workOrderService/work-order.service';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';
import { AddJobScheduleComponent } from '../../jobSchedule/add-job-schedule/add-job-schedule.component';
import { JobResumeFormComponent } from '../../jobResume/job-resume-form/job-resume-form.component';
import { FileService } from '../../../service/general/fileService/file.service';
import { saveAs } from 'file-saver';
import { JobReportTemplateListComponent } from '../../jobReportTemplate/job-report-template-list/job-report-template-list.component';
import { AddJobInvoiceComponent } from '../../jobInvoice/add-job-invoice/add-job-invoice.component';
import { JobReportFormComponent } from '../../../transaction/jobReport/job-report-form/job-report-form.component';
import { JobPaymentFormComponent } from '../../../transaction/jobPayment/job-payment-form/job-payment-form.component';

@Component({
  selector: 'app-work-order-view',
  templateUrl: './work-order-view.component.html',
  styleUrls: ['./work-order-view.component.css']
})
export class WorkOrderViewComponent implements OnInit {


  user: any;
  isRead: Boolean;
  isWrite: Boolean;
  jobComments: any;
  jobByIdData: any;
  allJobDatas: any;
  invoiceDatas: any;
  paymentDatas: any;
  isComment: boolean = false;
  isSchedule: boolean = false;
  isPayment: boolean = false;
  isResume: boolean = false;
  isSubmitResume: boolean = true;
  isReport: boolean = true;
  isInvoice: boolean = true;
  jobNumber;
  scheduleDataByJobId: any;
  resumeDataByJobId: any;
  templateList: any = [];
  checkedTemplate: any;
  reportDataByJobId: any;

  constructor(
    private globals: Globals,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private workOrderService: WorkOrderService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private bottomSheet: MatBottomSheet,
    private _fileService: FileService
  ) {
    this.globals.viewName = 'Job';
  }

  ngOnInit() {

    let id: number = this.route.snapshot.queryParams.id;
    this.jobNumber = id;
    this.workOrderService.getRecord().then(res => {
      this.allJobDatas = res;
    })
    this.user = this.authService.getFromLocalStorage('currentUser');
    this.getData(id);

    this.checkedTemplate = this.workOrderService.setData();
  }

  download(data) {
    var filename = data.templateFileName;
    this._fileService.downloadFile(filename)
      .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
      );
  }

  downloadResume(data) {
    var filename = data.resumeFileName;
    this._fileService.downloadResumeFile(filename)
      .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
      );
  }

  downloadReport(data) {
    var filename = data.reportFileName;
    this._fileService.downloadReportFile(filename)
      .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
      );
  }

  downloadInvoice(data) {
    var filename = data.invoiceFileName;
    this._fileService.downloadInvoice(filename)
      .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
      );
  }

  downloadPayment(data) {
    var filename = data.paymentFileName;
    this._fileService.downloadPayment(filename)
      .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
      );
  }


  viewAllJob() {
    this.router.navigateByUrl('transaction/viewWorkOrder');
  }

  addComment = () => {
    let dialogRef = this.dialog.open(JobCommentFormComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  addPayment = () => {
    let dialogRef = this.dialog.open(JobPaymentFormComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  addCV = () => {
    let dialogRef = this.dialog.open(JobResumeFormComponent, {
      width: '500px',
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteComment(jobComment) {
    let bottomSheetRef = this.bottomSheet.open(ConfirmDeleteComponent, {
      data: { deleteItem: true },
      disableClose: false,
      hasBackdrop: true
    });
    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result === true) {
        jobComment.updatedBy = this.user.name;
        this.workOrderService.deleteComment(jobComment).subscribe(res => {
          if (res['statusBool'] == 1) {
            this.toaster.success(res['statusText']);
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

  deleteResume(jobResume) {
    let bottomSheetRef = this.bottomSheet.open(ConfirmDeleteComponent, {
      data: { deleteItem: true },
      disableClose: false,
      hasBackdrop: true
    });
    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result === true) {
        jobResume.updatedBy = this.user.name;
        this.workOrderService.deleteResume(jobResume).subscribe(res => {
          if (res['statusBool'] == 1) {
            this.toaster.success(res['statusText']);
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

  deleteReport(data) {
    let bottomSheetRef = this.bottomSheet.open(ConfirmDeleteComponent, {
      data: { deleteItem: true },
      disableClose: false,
      hasBackdrop: true
    });
    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result === true) {
        data.updatedBy = this.user.name;
        this.workOrderService.deleteReport(data).subscribe(res => {
          if (res['statusBool'] == 1) {
            this.toaster.success(res['statusText']);
            this.ngOnInit();
            var filename = data.reportFileName;
            this._fileService.deleteReportFile(filename)
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

  getTable = () => {
    let id: number = this.route.snapshot.queryParams.id;
    this.router.navigate(['transaction/addWorkOrder'], { queryParams: { id: id } });
  }

  previousData(number) {
    number = parseInt(number) - 1;
    for (var i = 0; i < this.allJobDatas.length; i++) {
      if (this.allJobDatas[i].id == number) {
        this.jobNumber = number.toString();
        this.getData(this.jobNumber);
      }
    }
  }

  nextData(number) {
    number = parseInt(number) + 1;
    for (var i = 0; i < this.allJobDatas.length; i++) {
      if (this.allJobDatas[i].id == number) {
        this.jobNumber = number.toString();
        this.getData(this.jobNumber);
      }
    }
  }

  getData(id) {
    const queryParams: Params = { id: id };
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: "merge"
      });
    this.jobNumber = id;
    this.workOrderService.getCommentByJobId(id).then(res => {
      this.jobComments = res;
      if (this.jobComments.length > 0) {
        this.isComment = true;
      }
      else {
        this.isComment = false;
      }
    })
    this.workOrderService.getScheduleByJobId(id).then(res => {
      this.scheduleDataByJobId = res;
      if (this.scheduleDataByJobId.length > 0) {
        this.isSchedule = true;
      }
      else {
        this.isSchedule = false;
      }
    })
    this.workOrderService.getResumeByJobId(id).then(res => {
      this.resumeDataByJobId = res;
      if (this.resumeDataByJobId.length > 0) {
        this.isResume = true;
      }
      else {
        this.isResume = false;
      }
    })
    this.workOrderService.getJobById(id).then(res => {
      this.jobByIdData = res;
    })

    this.workOrderService.getReportByJobId(id).then(res => {
      this.reportDataByJobId = res;
      if (this.reportDataByJobId.length > 0) {
        this.isReport = true;
      }
      else {
        this.isReport = false;
      }
    })

    this.workOrderService.getInvoiceByJobId(id).then(res => {
      this.invoiceDatas = res;
      if (this.invoiceDatas.length > 0) {
        this.isInvoice = true;
      }
      else {
        this.isInvoice = false;
      }
    })
    this.workOrderService.getPaymentByJobId(id).then(res => {
      this.paymentDatas = res;
      if (this.paymentDatas.length > 0) {
        this.isPayment = true;
      }
      else {
        this.isPayment = false;
      }
    })

  }

  addSchedule = () => {
    let dialogRef = this.dialog.open(AddJobScheduleComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  addReport = () => {
    let dialogRef = this.dialog.open(JobReportFormComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  showTemplates = () => {
    let dialogRef = this.dialog.open(JobReportTemplateListComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  addInvoice() {
    let dialogRef = this.dialog.open(AddJobInvoiceComponent, {
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
