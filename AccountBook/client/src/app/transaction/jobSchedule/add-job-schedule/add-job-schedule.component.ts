import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatBottomSheet } from '@angular/material';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { WorkOrderService } from '../../../service/transaction/workOrderService/work-order.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { DtpBindFormatService } from '../../../service/general/dtpBindFormatService/dtp-bind-format.service';

@Component({
  selector: 'app-add-job-schedule',
  templateUrl: './add-job-schedule.component.html',
  styleUrls: ['./add-job-schedule.component.css']
})
export class AddJobScheduleComponent implements OnInit {

  jobScheduleForm: any;
  inspectors: any;
  inputData: any;
  isAssociate: boolean = false;
  user: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddJobScheduleComponent>,
    private toaster: ToastrService,
    private WorkOrderService: WorkOrderService,
    private AuthService: AuthService,
    private bottomSheet: MatBottomSheet,
    private dtpBinder: DtpBindFormatService
  ) {
    this.jobScheduleForm = fb.group({
      'inspectionDate': [null, Validators.compose([Validators.required])],
      'inspector': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.user = this.AuthService.getFromLocalStorage('currentUser');
    let id: number = this.route.snapshot.queryParams.id;
    this.WorkOrderService.getResumeByJobId(id).then(res => {
      this.inspectors = res;
    })
  }

  get f() {
    return this.jobScheduleForm.controls;
  }

  save() {
    let id: number = this.route.snapshot.queryParams.id;
    this.inputData = {
      jobId: id,
      inspectionDate: (this.dtpBinder.convert(this.jobScheduleForm.value.inspectionDate)),
      inspectorId: this.jobScheduleForm.value.inspector,
      createdBy: this.user.name
    }
    this.WorkOrderService.addSchedule(this.inputData).subscribe(res => {
      if (res['statusBool'] == -1) {
        this.toaster.error(res['statusText']);
      }
      else {
        this.toaster.success(res['statusText']);
        this.dialogRef.close();
      }
    }, err => {
      throw err
    });
  }

  btnClose() {
    if (this.jobScheduleForm.dirty) {
      const bottomSheetRef = this.bottomSheet.open(ConfirmDeleteComponent, {
        data: { deleteItem: false },
        disableClose: false,
        hasBackdrop: true
      });
      bottomSheetRef.afterDismissed().subscribe(result => {
        if (result === true) {
          this.dialogRef.close();
        }
      });
    } else {
      this.dialogRef.close();
    }
  }

}
