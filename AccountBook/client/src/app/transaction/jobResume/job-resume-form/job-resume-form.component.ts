import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { MatDialogRef, MatBottomSheet } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { WorkOrderService } from '../../../service/transaction/workOrderService/work-order.service'
import { ToastrService } from 'ngx-toastr';
import { AssociateServiceService } from '../../../service/master/associateService/associate-service.service';
import { InhouseService } from '../../../service/master/inhouseService/inhouse.service';
import { FreelancerService } from '../../../service/master/freelancerService/freelancer.service';

@Component({
  selector: 'app-job-resume-form',
  templateUrl: './job-resume-form.component.html',
  styleUrls: ['./job-resume-form.component.css']
})
export class JobResumeFormComponent implements OnInit {

  resumeForm: any;
  inputData: any;
  user: any;
  types: any;
  inspectors: any;
  type: any;
  isAssociate: boolean = false;

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialogRef: MatDialogRef<JobResumeFormComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private workOrderService: WorkOrderService,
    private toaster: ToastrService,
    private AssociateServiceService: AssociateServiceService,
    private InhouseService: InhouseService,
    private FreelancerService: FreelancerService
  ) {
    this.resumeForm = fb.group({
      'inspectorId': [null],
    });
  }

  ngOnInit() {
    this.user = this.authService.getFromLocalStorage('currentUser');
    this.types = [
      { id: 1, name: 'Associate' },
      { id: 2, name: 'Freelancer' },
      { id: 3, name: 'Inhouse' }
    ]
  }

  btnClose() {
    if (this.resumeForm.dirty) {
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

  getType(types) {
    this.type = types.id;
    if (this.type == 1) {
      this.isAssociate = true;
    }
    else {
      this.isAssociate = false;
    }
    if (this.type == 1) {
      this.AssociateServiceService.getAssociates().then(res => {
        this.inspectors = res;
        this.resumeForm.patchValue({
          inspector: null
        });
      })
    }
    else if (this.type == 3) {
      this.InhouseService.getRecord().then(res => {
        this.inspectors = res;
        this.resumeForm.patchValue({
          inspector: null
        });
      })
    }
    else if (this.type == 2) {
      this.FreelancerService.getRecord().then(res => {
        this.inspectors = res;
        this.resumeForm.patchValue({
          inspector: null
        });
      })
    }
  }

  save() {
    let id: number = this.route.snapshot.queryParams.id;
    this.inputData = {
      inspectorId: this.resumeForm.value.inspectorId,
      jobId: id,
      createdBy: this.user.name
    }
    this.workOrderService.addResume(this.inputData).subscribe(res => {
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

  get f() {
    return this.resumeForm.controls;
  }

}

